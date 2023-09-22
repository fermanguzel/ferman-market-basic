import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from './UserContext';

let NavBar = () => {

    let userContext = useContext(UserContext);

    let onLogoutClick = (event) => {
        event.preventDefault();

        userContext.setUser({
            isLoggedIn: false, currentUserId: null, currentUserName: null
        });
        window.location.hash = "/";
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/#">Ferman Market</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {userContext.user.isLoggedIn ? (
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/dashboard" activeclassname="active"><i className="fa fa-dashboard"></i> Dashboard</NavLink>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/" activeclassname="active" > Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/register" activeclassname="active"><i className="fa fa-user-plus"></i> Register</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                    {userContext.user.isLoggedIn && (
                        <div style={{ marginRight: 100 }}>
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fa fa-user"></i>{" "}
                                        {userContext.user.currentUserName}
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a className="dropdown-item" href="/#" onClick={onLogoutClick}>Logout</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default NavBar;
