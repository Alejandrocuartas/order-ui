import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import { logContext } from "../stateManager";

import state from "../utils/state";
import Product from "../components/Product";
import PostProduct from "../components/PostProduct";

const Menu = () => {
    const { products, setProducts, logState } = useContext(logContext);
    const [loading, setLoading] = useState(false);
    const [menu, setMenu] = useState(null);
    const [isOpen, setOpen] = useState(false);
    const closeModal = () => {
        setOpen(false);
    };

    const createMenu = () => {
        setLoading(true);
        fetch("https://order-services-ale.herokuapp.com/api/menu", {
            credentials: "include",
            method: "POST",
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then((res) => {
                setMenu(res.menu);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                alert("Hubo un problema al crear el menú. Intenta de nuevo.");
                location.reload();
            });
    };

    const deleteMenu = () => {
        setLoading(true);
        fetch("https://order-services-ale.herokuapp.com/api/menu", {
            method: "DELETE",
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                setLoading(false);
                setProducts([]);
                setMenu(null);
            })
            .catch((err) => {
                console.log(err);
                alert("No se pudo borrar el menú.");
                location.reload();
            });
    };

    useEffect(() => {
        setLoading(true);
        fetch("https://order-services-ale.herokuapp.com/api/menu", {
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.status);
                }
                return res.json();
            })
            .then((res) => {
                setMenu(res.menu);
                setProducts(res.menu.products);
                setLoading(false);
            })
            .catch((err) => {
                if (err.message == 401) {
                    alert("Primero ingresa");
                    Cookies.remove("userToken");
                    location.replace("/login");
                } else {
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
    return (
        <div>
            {menu ? (
                <div>
                    <ul className="mb-1 list-group">
                        <Product></Product>
                    </ul>
                    {products.length !== 0 ? (
                        <div>
                            <button
                                onClick={() => setOpen(true)}
                                className="mb-1 col-12 btn btn-primary"
                            >
                                Agregar productos
                            </button>
                            <button
                                onClick={deleteMenu}
                                className="col-12 btn btn-danger"
                            >
                                Borrar Menú
                            </button>
                        </div>
                    ) : null}
                    <PostProduct isOpen={isOpen} onClose={closeModal} />
                </div>
            ) : (
                <div className="col">
                    <div className="row d-flex justify-content-center align-content-center ">
                        <h1>Aún no tienes un menú.</h1>
                    </div>
                    <div className="row d-flex justify-content-center align-content-center ">
                        <button
                            onClick={createMenu}
                            className="btn btn-primary col-3"
                        >
                            Crear menú
                        </button>
                    </div>
                </div>
            )}
            {logState === state.notLogged ? (
                <Navigate to="/login" replace={true} />
            ) : null}
        </div>
    );
};

export default Menu;
