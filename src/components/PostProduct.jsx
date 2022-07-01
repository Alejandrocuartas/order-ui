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
        fetch("http://localhost:3000/api/menu/product", {
            credentials: "include",
            body: formdata,
            method: "POST",
        })
            .then((res) => res.json())
            .then((res) => {
                setLoading(false);
                setProducts(res.products);
                onClose();
            })
            .catch((err) => console.log(err));
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
                    Default file input example
                </label>
                <input
                    name="productImage"
                    type="file"
                    className="form-control mb-3"
                    id="file"
                    accept="image/x-png,image/gif,image/jpeg"
                    required
                />
                <input className="form-control btn btn-primary" type="submit" />
            </form>
        </Modal>
    );
};

export default PostProduct;