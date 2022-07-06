import React, { useContext, useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

import { logContext } from "../stateManager";
import state from "../utils/state";

import PostTable from "../components/PostTable";

const Tables = () => {
    const { logState } = useContext(logContext);
    const [loading, setLoading] = useState(false);
    const [tables, setTables] = useState([]);
    const [isOpen, setOpen] = useState(false);
    const [company, setCompany] = useState("");
    const onClose = () => {
        setOpen(false);
    };
    const deleteTable = (number) => (e) => {
        setLoading(true);
        const body = {
            number,
        };
        fetch("http://localhost:3000/api/table", {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then((res) => {
                setTables(res.remainingTables);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                alert("No se pudo borrar la mesa.");
                location.reload();
            });
    };
    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:3000/api/table", {
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.status);
                }
                return res.json();
            })
            .then((res) => {
                setTables(res.tables);
                setCompany(res.company);
                setLoading(false);
            })
            .catch((err) => {
                if (err.message == 401) {
                    alert("Primero ingresa");
                    Cookies.remove("userToken");
                    location.replace("/login");
                } else {
                    alert("No se pudo conseguir las mesas. Intenta de nuevo");
                    setLoading(false);
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
    if (tables.length === 0) {
        return (
            <div className="col">
                <div className="row d-flex justify-content-center align-content-center ">
                    <h1>Aún no tienes mesas registradas.</h1>
                </div>
                <div className="row d-flex justify-content-center align-content-center ">
                    <button
                        onClick={() => setOpen(true)}
                        className="btn btn-primary col-3"
                    >
                        Registrar mesa
                    </button>
                </div>
                <PostTable
                    company={company}
                    setTables={setTables}
                    isOpen={isOpen}
                    onClose={onClose}
                ></PostTable>
            </div>
        );
    }
    return (
        <div>
            {tables.map((table) => {
                return (
                    <div key={table._id}>
                        <div>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <h5>Mesa:</h5>
                                <span className="badge badge-dark badge-pill">
                                    {table.number}
                                </span>
                                <Link
                                    state={{ image: table.qr }}
                                    to={`/tables/qr/${table.number}`}
                                    className="btn btn-dark"
                                >
                                    Ver QR
                                </Link>
                                <button
                                    onClick={deleteTable(table.number)}
                                    className="btn btn-danger"
                                >
                                    Borrar mesa
                                </button>
                            </li>
                        </div>
                    </div>
                );
            })}
            <button
                onClick={() => setOpen(true)}
                className="mb-1 col-12 btn btn-primary"
            >
                Registrar mesa
            </button>
            {logState === state.notLogged ? (
                <Navigate to="/login" replace={true} />
            ) : null}
            <PostTable
                company={company}
                setTables={setTables}
                isOpen={isOpen}
                onClose={onClose}
            ></PostTable>
        </div>
    );
};

export default Tables;
