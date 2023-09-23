import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from 'react-router-dom';


let Login = (props) => {

    let [state, setState] = useState({
        email: "ferman@ferman.com", password: "Fer123"
    });

    let [errors, setErrors] = useState({
        email: [], password: []
    });

    let [dirty, setDirty] = useState({
        email: false, password: false
    });

    let [message, setMessage] = useState("");

    let userContext = useContext(UserContext);

    let navigate = useNavigate();

    let validate = () => {
        let errorsData = {};

        //Email
        errorsData.email = [];

        if (!state.email) {
            errorsData.email.push("Email can't be blank");
        }

        const validEmailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

        if (state.email) {
            if (!validEmailRegex.test(state.email)) {
                errorsData.email.push("Proper email adress is expected");
            }
        }

        //Password
        errorsData.password = [];

        if (!state.password) {
            errorsData.password.push("Password can't be blank");
        }

        const validPasswordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15})/;

        if (state.password) {
            if (!validPasswordRegex.test(state.password)) {
                errorsData.password.push("Password should be 6 to 15 characters long with at least one uppercase letter, one lowercase letter and one digit");
            }
        }

        setErrors(errorsData);
    }

    useEffect(validate, [state]);

    let onLoginClick = async () => {

        let dirtyData = dirty;

        Object.keys(dirty).forEach((control) => {
            dirtyData[control] = true;
        });
        setDirty(dirty);

        validate();

        if (isValid) {
            let response = await fetch(`http://localhost:5000/users?email=${state.email}&password=${state.password}`, { method: "GET" });
            if (response.ok) {
                let responseBody = await response.json();

                if (responseBody.length > 0) {

                    userContext.dispatch({
                        type: "login",
                        payload: {
                            currentUserName: responseBody[0].fullName,
                            currentUserId: responseBody[0].id,
                            currentUserRole: responseBody[0].role
                        }
                    });

                    if (responseBody[0].role === "user") {
                        navigate("/dashboard");
                    } else {
                        navigate("/products");
                    }
                } else {
                    setMessage(<span className="text-danger">Invalid Login, please try again!</span>);
                }
            } else {
                setMessage(<span className="text-danger">Errors in database connection</span>);
            }
        }
    };

    let isValid = () => {
        let valid = true;

        for (let control in errors) {
            if (errors[control].length > 0) {
                valid = false;
            }
        }
        return valid;
    }

    useEffect(() => {
        document.title = "Login - Ferman Market";
    }, []);

    return (
        <div className="row">
            <div className="col-lg-5 mx-auto">
                <div className="card border shadow my-2">
                    <div className="card-header border-bottom">
                        <h4 style={{ fontSize: "40px" }} className="text-center">Login</h4>
                    </div>
                    <div className="card-body border-bottom">
                        <form>
                            <div className="mb-3 row">
                                <label htmlFor="email" className="col-md-3 col-form-label">Email</label>
                                <div className="col-md-9">
                                    <input type="text"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={state.email}
                                        onChange={(event) => { setState({ ...state, [event.target.name]: event.target.value }) }}
                                        onBlur={(event) => { setDirty({ ...dirty, [event.target.name]: true }); validate() }} />
                                    <div className="text-danger">
                                        {dirty["email"] && errors["email"][0] ? errors["email"] : ""}
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="password" className="col-md-3 col-form-label">Password</label>
                                <div className="col-md-9">
                                    <input type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={state.password}
                                        onChange={(event) => { setState({ ...state, [event.target.name]: event.target.value }) }}
                                        onBlur={(event) => { setDirty({ ...dirty, [event.target.name]: true }); validate() }} />
                                    <div className="text-danger">
                                        {dirty["password"] && errors["password"][0] ? errors["password"] : ""}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="card-footer text-center">
                        <div className="m-1">{message}</div>
                        <button className="btn btn-success m-2" onClick={onLoginClick} >Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;