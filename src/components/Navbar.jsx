import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import { logContext } from "../stateManager";
import state from "../utils/state";

import "./styles/Navbar.css";

const Navbar = () => {
    const { logState, setLogState } = useContext(logContext);
    const [onSignin, setSignin] = useState(false);

    return (
        <div>
            {logState === state.logged ? (
                <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">
                            <h4>Inicio</h4>
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className="collapse navbar-collapse me-auto"
                            id="navbarNav"
                        >
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link
                                        className="nav-link active"
                                        aria-current="page"
                                        to="/profile"
                                    >
                                        Perfil
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link active"
                                        aria-current="page"
                                        to="/menu"
                                    >
                                        Menu
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link active"
                                        aria-current="page"
                                        to="/tables"
                                    >
                                        Mesas
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link active"
                                        aria-current="page"
                                        to="/orders"
                                    >
                                        Órdenes
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <Link
                            onClick={() => {
                                Cookies.remove("userToken");
                                setLogState(state.notLogged);
                            }}
                            className="logout"
                            to="/"
                        >
                            Salir
                        </Link>
                    </div>
                </nav>
            ) : (
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <Link
                            onClick={() => setSignin(false)}
                            className="navbar-brand"
                            to="/"
                        >
                            <h4>Inicio</h4>
                        </Link>
                        <div className="me-auto">
                            <a
                                href="/login"
                                onClick={() => setSignin(true)}
                                className="navbar-brand"
                            >
                                {onSignin === true ? null : "Entrar"}
                            </a>
                        </div>
                    </div>
                </nav>
            )}
        </div>
    );
};

export default Navbar;
