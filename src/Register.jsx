import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';

let Register = () => {

    let [state, setState] = useState({
        email: "", password: "", fullName: "", dateOfBirth: "", gender: "", country: "", adress: "", receiveNewsLetters: ""
    });

    let [countries] = useState([
        { id: 1, countryName: "Turkey" },
        { id: 2, countryName: "USA" },
        { id: 3, countryName: "UK" },
        { id: 4, countryName: "Germany" },
        { id: 5, countryName: "Holland" },
        { id: 6, countryName: "France" },
        { id: 7, countryName: "Finland" },
        { id: 8, countryName: "Japan" }
    ]);

    let [errors, setErrors] = useState({
        email: [], password: [], fullName: [], dateOfBirth: [], gender: [], country: [], adress: [], receiveNewsLetters: []
    });

    let [dirty, setDirty] = useState({
        email: false, password: false, fullName: false, dateOfBirth: false, gender: false, country: false, adress: false, receiveNewsLetters: false
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

        //Fullname
        errorsData.fullName = [];

        if (!state.fullName) {
            errorsData.fullName.push("Fullname can't be blank");
        }

        //Date of Birth
        errorsData.dateOfBirth = [];

        if (!state.dateOfBirth) {
            errorsData.dateOfBirth.push("Date of Birth can't be blank");
        }

        //Gender
        errorsData.gender = [];

        if (!state.gender) {
            errorsData.gender.push("Please select a Gender: Male or Female");
        }

        //Country
        errorsData.country = [];

        if (!state.country) {
            errorsData.country.push("Please select a Country");
        }

        //Adress
        errorsData.adress = [];

        if (!state.adress) {
            errorsData.adress.push("Adress can't be blank");
        }

        //ReceiveNewsLetters
        errorsData.receiveNewsLetters = [];

        setErrors(errorsData);
    };

    useEffect(validate, [state]);

    let onRegisterClick = async () => {
        let dirtyData = dirty;

        Object.keys(dirty).forEach((control) => {
            dirtyData[control] = true;
        });
        setDirty(dirtyData);

        validate();

        if (isValid()) {

            let response = await fetch("http://localhost:5000/users", {
                method: "POST",
                body: JSON.stringify({
                    email: state.email,
                    password: state.password,
                    fullName: state.fullName,
                    dateOfBirth: state.dateOfBirth,
                    gender: state.gender,
                    country: state.country,
                    adress: state.adress,
                    receiveNewsLetters: state.receiveNewsLetters,
                    role: "user"
                }),
                headers: { "Content-type": "application/json" },
            });
            if (response.ok) {

                let responseBody = await response.json();

                userContext.setUser({
                    ...userContext.user,
                    isLoggedIn: true,
                    currentUserName: responseBody.fullName,
                    currentUserId: responseBody.id,
                    currentUserRole: responseBody.role
                });

                setMessage(<span className="text-success">Success</span>)

                navigate("/dashboard");
            } else {
                setMessage(<span className="text-danger">Errors in database connection</span>)
            }
        } else {
            setMessage(<span className="text-danger">Errors</span>);
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
    };



    useEffect(() => {
        document.title = "Register - Ferman Market";
    }, []);

    return (
        <div className="row">
            <div className="col-lg-6 mx-auto">
                <div className="card border shadow my-2">
                    <div className="card-header border-bottom">
                        <h4 style={{ fontSize: "40px" }} className="text-center">Register</h4>
                        <ul className="text-danger">
                            {Object.keys(errors).map((control) => {
                                if (dirty[control]) {
                                    return errors[control].map((err) => {
                                        return <li key={err}>{err}</li>;
                                    });
                                } else {
                                    return "";
                                }
                            })}
                        </ul>
                    </div>
                    <div className="card-body border-bottom">
                        <form className="row g-3">
                            <div className="col-12">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={state.email}
                                    onChange={(event) => { setState({ ...state, [event.target.name]: event.target.value }) }}
                                    onBlur={(event) => { setDirty({ ...dirty, [event.target.name]: true }); validate(); }} />
                                <div className="text-danger">
                                    {dirty["email"] && errors["email"][0] ? errors["email"] : ""}
                                </div>
                            </div>
                            <div className="col-12">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={state.password}
                                    onChange={(event) => { setState({ ...state, [event.target.name]: event.target.value }) }}
                                    onBlur={(event) => { setDirty({ ...dirty, [event.target.name]: true }); validate(); }} />
                                <div className="text-danger">
                                    {dirty["password"] && errors["password"][0] ? errors["password"] : ""}
                                </div>
                            </div>
                            <div className="col-12">
                                <label htmlFor="fullName" className="form-label">Full Name</label>
                                <input type="fullName"
                                    className="form-control"
                                    id="fullName"
                                    name="fullName"
                                    value={state.fullName}
                                    onChange={(event) => { setState({ ...state, [event.target.name]: event.target.value }) }}
                                    onBlur={(event) => { setDirty({ ...dirty, [event.target.name]: true }); validate(); }} />
                                <div className="text-danger">
                                    {dirty["fullName"] && errors["fullName"][0] ? errors["fullName"] : ""}
                                </div>
                            </div>
                            <div className="col-12">
                                <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                                <input type="date"
                                    className="form-control"
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    value={state.dateOfBirth}
                                    onChange={(event) => { setState({ ...state, [event.target.name]: event.target.value }) }}
                                    onBlur={(event) => { setDirty({ ...dirty, [event.target.name]: true }); validate(); }} />
                                <div className="text-danger">
                                    {dirty["dateOfBirth"] && errors["dateOfBirth"][0] ? errors["dateOfBirth"] : ""}
                                </div>
                            </div>
                            <div className="col-md-2">
                                <label className="form-label">Gender</label>
                            </div>
                            <div className="col-md-4">
                                <div className="form-check">
                                    <input type="radio"
                                        className="form-check-input"
                                        id="male"
                                        name="gender"
                                        value={"male"}
                                        checked={state.gender === "male" ? true : false}
                                        onChange={(event) => { setState({ ...state, [event.target.name]: event.target.value }) }}
                                        onBlur={(event) => { setDirty({ ...dirty, [event.target.name]: true }); validate(); }} />
                                    <label htmlFor="male" className="form-check-label" >Male</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio"
                                        className="form-check-input"
                                        id="female"
                                        name="gender"
                                        value={"female"}
                                        checked={state.gender === "female" ? true : false}
                                        onChange={(event) => { setState({ ...state, [event.target.name]: event.target.value }) }}
                                        onBlur={(event) => { setDirty({ ...dirty, [event.target.name]: true }); validate(); }} />
                                    <label htmlFor="female" className="form-check-label" >Female</label>
                                </div>
                                <div className="text-danger">
                                    {dirty["gender"] && errors["gender"][0] ? errors["gender"] : ""}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="country" className="form-label">Country</label>
                                <select id="country"
                                    className="form-select"
                                    name="country"
                                    value={state.country}
                                    onChange={(event) => { setState({ ...state, [event.target.name]: event.target.value }) }}
                                    onBlur={(event) => { setDirty({ ...dirty, [event.target.name]: true }); validate(); }} >
                                    <option value="">Please Select</option>
                                    {countries.map((country) => (
                                        <option key={country.id} value={country.id}>{country.countryName}</option>
                                    ))}
                                </select>
                                <div className="text-danger">
                                    {dirty["country"] && errors["country"][0] ? errors["country"] : ""}
                                </div>
                            </div>
                            <div className="col-12">
                                <label htmlFor="adress" className="form-label">Adress</label>
                                <input type="text"
                                    className="form-control"
                                    id="adress"
                                    name="adress"
                                    value={state.adress}
                                    onChange={(event) => { setState({ ...state, [event.target.name]: event.target.value }) }}
                                    onBlur={(event) => { setDirty({ ...dirty, [event.target.name]: true }); validate(); }} />
                                <div className="text-danger">
                                    {dirty["adress"] && errors["adress"][0] ? errors["adress"] : ""}
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-check">
                                    <input type="checkbox"
                                        className="form-check-input"
                                        id="receiveNewsLetters"
                                        name="receiveNewsLetters"
                                        value={"true"}
                                        checked={state.receiveNewsLetters === true ? true : false}
                                        onChange={(event) => { setState({ ...state, [event.target.name]: event.target.checked }) }}
                                        onBlur={(event) => { setDirty({ ...dirty, [event.target.name]: true }); validate(); }} />
                                    <label className="form-check-label" htmlFor="receiveNewsLetters">
                                        Receive News Letters
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="card-footer text-center">
                        <div className="m-1">{message}</div>
                        <button type="submit" className="btn btn-primary m-2" onClick={onRegisterClick}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register