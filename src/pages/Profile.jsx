import React, { useState, useEffect } from "react";

import Cookies from "js-cookie";

const Profile = () => {
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState({});
    const [deleted, setDeleted] = useState(false);

    const deleteProfile = () => {
        setLoading(true);
        fetch("http://localhost:3000/api/auth/glogin", {
            method: "DELETE",
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) {
                    alert("hubo un error.");
                    location.reload();
                }
                Cookies.remove("userToken");
                location.replace("/");
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:3000/api/auth/profile", {
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) {
                    alert("hubo un error.");
                    location.reload();
                }
                return res.json();
            })
            .then((res) => {
                setProfile(res.companyData);
                setLoading(false);
            })
            .catch((err) => console.log(err));
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
            </ul>
            <div className="card-body">
                <button onClick={deleteProfile} className="btn btn-danger">
                    Borrar cuenta
                </button>
            </div>
        </div>
    );
};

export default Profile;
