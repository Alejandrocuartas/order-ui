import React, { useState } from "react";
import { useParams, Navigate, useLocation } from "react-router-dom";

const ProductInfo = () => {
    const { id } = useParams();
    const { state } = useLocation();
    const [product, setProduct] = useState(state);
    const [deleted, setDeleted] = useState(false);
    const [newPrice, setNewPrice] = useState();
    const [loading, setLoading] = useState(false);
    const [loadingPrice, setLoadingPrice] = useState(false);

    const handleInput = (e) => {
        setNewPrice(Number(e.target.value));
    };
    const changePrice = () => {
        const body = {
            newPrice,
        };
        setLoadingPrice(true);
        fetch("http://localhost:3000/api/menu/product/" + id, {
            method: "PATCH",
            credentials: "include",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (!res.ok) {
                    alert(
                        "No se pudo cambiar el precio del producto. Intenta de nuevo"
                    );
                }
                setProduct({ ...product, price: newPrice });
                setLoadingPrice(false);
            })

            .catch((err) => console.log(err));
    };
    const deleteProduct = (e) => {
        setLoading(true);
        fetch("http://localhost:3000/api/menu/product/" + id, {
            method: "DELETE",
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) {
                    alert("No se pudo borrar el producto. Intenta de nuevo");
                    location.reload();
                }
                return res.json();
            })
            .then((res) => {
                setLoading(false);
                setDeleted(true);
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
        <div className="card">
            <img
                src={product.image}
                className="card-img-top"
                alt={`Imagen de ${product.name}`}
            />
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <h5>Precio actual: ${product.price}</h5>
                    <div className="col-lg-3 col-md-4 col-sm-10">
                        {loadingPrice ? (
                            <div className="row d-flex justify-content-center">
                                <div
                                    className="spinner-border text-dark"
                                    role="status"
                                ></div>
                            </div>
                        ) : (
                            <div className="input-group mb-3">
                                <input
                                    onChange={handleInput}
                                    type="number"
                                    className="form-control"
                                    placeholder="Nuevo precio"
                                    aria-label="Recipient's username"
                                    aria-describedby="button-addon2"
                                />

                                <button
                                    onClick={changePrice}
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    id="button-addon2"
                                >
                                    Cambiar precio
                                </button>
                            </div>
                        )}
                    </div>
                </li>
            </ul>
            <div className="card-body">
                <button onClick={deleteProduct} className="btn btn-danger">
                    Borrar producto
                </button>
            </div>
            {deleted ? <Navigate to="/menu"></Navigate> : null}
        </div>
    );
};

export default ProductInfo;