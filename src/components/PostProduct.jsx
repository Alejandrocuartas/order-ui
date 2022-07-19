import React, { useContext, useState } from "react";

import { logContext } from "../stateManager";

import Modal from "./Modal";
const PostProduct = ({ isOpen, onClose }) => {
    const { setProducts } = useContext(logContext);
    const [loading, setLoading] = useState(false);
    const submitForm = (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);
        setLoading(true);
        fetch(`${process.env.API}/api/menu/product`, {
            credentials: "include",
            body: formdata,
            method: "POST",
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then((res) => {
                setLoading(false);
                setProducts(res.products);
                onClose();
            })
            .catch((err) => {
                console.log(err);
                alert(
                    "No se pudo guardar el nuevo producto. Intenta de nuevo."
                );
                location.reload();
            });
    };
    if (loading) {
        return (
            <div className="row d-flex justify-content-center">
                <div className="spinner-border text-dark" role="status"></div>
            </div>
        );
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={submitForm} className="form-group">
                <label className="form-label" htmlFor="name">
                    Nombre del producto
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    name="name"
                />
                <label className="form-label" htmlFor="description">
                    Descripción del producto
                </label>
                <input
                    placeholder="Opcional: ingredientes, información adicional del producto."
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                />
                <label className="form-label" htmlFor="price">
                    Precio del producto
                </label>
                <input
                    type="number"
                    name="price"
                    className="form-control"
                    id="price"
                />
                <label className="form-label" htmlFor="file">
                    Opcional: imagen del producto
                </label>
                <input
                    name="productImage"
                    type="file"
                    className="form-control mb-3"
                    id="file"
                    accept="image/x-png,image/gif,image/jpeg"
                />
                <input className="form-control btn btn-primary" type="submit" />
            </form>
        </Modal>
    );
};

export default PostProduct;
