import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { logContext } from "../stateManager";

import "./styles/Product.css";

import PostProduct from "./PostProduct";

const Product = () => {
    const { products } = useContext(logContext);
    const [isOpen, setOpen] = useState(false);
    const closeModal = () => {
        setOpen(false);
    };
    if (products.length === 0) {
        return (
            <div className="col">
                <div className="row d-flex justify-content-center align-content-center ">
                    <h1>Aún no tienes productos en tu menú.</h1>
                </div>
                <div className="row d-flex justify-content-center align-content-center ">
                    <button
                        onClick={() => setOpen(true)}
                        className="btn btn-primary col-3"
                    >
                        Agregar productos
                    </button>
                </div>
                <PostProduct isOpen={isOpen} onClose={closeModal} />
            </div>
        );
    }
    return (
        <div>
            {products.map((product) => {
                return (
                    <div key={product._id}>
                        <Link
                            className="link"
                            to={`/menu/${product._id}`}
                            state={product}
                        >
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                {product.name}
                                <span className="badge badge-dark badge-pill">
                                    {product.price
                                        ? "$" + product.price
                                        : "Precio no especificado"}
                                </span>
                            </li>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};

export default Product;
