import React, { useState } from "react";

import Modal from "./Modal";
const PostTable = ({ isOpen, onClose, setTables, company }) => {
    const [loading, setLoading] = useState(false);
    const submitForm = async (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);
        setLoading(true);
        await fetch(
            `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://ordena.netlify.app/orders/create/${company}/${formdata.get(
                "number"
            )}`
        )
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.blob();
            })
            .then((res) => {
                formdata.append("qr", res, "image.png");
            })
            .catch((err) => {
                console.log(err);
                alert(
                    "Ha ocurrido un error al generar el QR. Intenta de nuevo."
                );
                location.reload();
            });

        fetch("https://order-services-ale.herokuapp.com/api/table", {
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
                setTables(res.tables);
                onClose();
            })
            .catch((err) => {
                console.log(err);
                alert(
                    "Ha ocurrido un error al guardar la información de la mesa. Intenta de nuevo."
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
                <label className="form-label" htmlFor="number">
                    Número de la mesa
                </label>
                <input
                    type="number"
                    className="form-control"
                    id="number"
                    required
                    name="number"
                />
                <input className="form-control btn btn-primary" type="submit" />
            </form>
        </Modal>
    );
};

export default PostTable;
