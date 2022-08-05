import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import state from "../utils/state";
import { logContext } from "../stateManager";

const Profile = () => {
    const { logState } = useContext(logContext);
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState({});
    const [qr, setQr] = useState("");

    const deleteProfile = () => {
        setLoading(true);
        fetch(`${process.env.API}/api/auth/glogin`, {
            method: "DELETE",
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                Cookies.remove("userToken");
                location.replace("/");
            })
            .catch((err) => {
                console.log(err);
                alert("hubo un error.");
                location.reload();
            });
    };

    useEffect(() => {
        setLoading(true);
        fetch(`${process.env.API}/api/auth/profile`, {
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.status);
                }
                return res.json();
            })
            .then((res) => {
                fetch(
                    `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${process.env.API}/orders/create/delivery/${res.companyData._id}`
                )
                    .then((res) => {
                        if (!res.ok) {
                            throw new Error(res.status);
                        }
                        return res.blob();
                    })
                    .then((res) => {
                        setQr(window.URL.createObjectURL(res));
                    })
                    .catch((err) => console.log(err));
                setProfile(res.companyData);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                if (err.message == 401) {
                    alert("primero ingresa.");
                    Cookies.remove("userToken");
                    location.replace("/login");
                } else {
                    alert("hubo un error.");
                    location.reload();
                }
            });
    }, []);
    if (loading) {
        return (
            <div className="row d-flex justify-content-center">
                <div className="spinner-border text-dark" role="status"></div>
            </div>
        );
    }
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{profile.name}</h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <h5>{profile.email}</h5>
                </li>
                <li className="list-group-item">
                    <h5>QR del menú para domicilios y el link:</h5>
                    <hr />
                    <img
                        style={{ height: "200px", width: "200px" }}
                        src={qr}
                        alt="QR of the delivery menu"
                    />
                </li>
                <li className="list-group-item">
                    <a
                        href={`${process.env.API}/orders/create/delivery/${profile._id}`}
                    >
                        {`${process.env.API}/orders/create/delivery/${profile._id}`}
                    </a>
                </li>
            </ul>
            <div className="card-body">
                <button onClick={deleteProfile} className="btn btn-danger">
                    Borrar cuenta
                </button>
            </div>
            {logState === state.notLogged ? (
                <Navigate to="/login" replace={true} />
            ) : null}
        </div>
    );
};

export default Profile;
