import React from "react";
import ModalClient from "./ModalClient";

import "./styles/PreOrder.css";

const PreOrder = ({
    isOpen,
    onClose,
    products,
    postOrder,
    setPetition,
    petition,
}) => {
    if (products.length === 0) {
        return (
            <ModalClient isOpen={isOpen} onClose={onClose}>
                <div className="card">
                    <ul className="list-group list-group-flush">
                        <li key="1" className="list-group-item">
                            Aún no agregas productos
                        </li>
                    </ul>
                </div>
            </ModalClient>
        );
    }
    return (
        <ModalClient isOpen={isOpen} onClose={onClose}>
            <div className="card products-card">
                <ul className="list-group list-group-flush list-products">
                    {products.map((product) => {
                        return (
                            <li key={product.name} className="list-group-item">
                                {product.name} {product.amount}
                            </li>
                        );
                    })}
                    <li className="list-group list-group-flush">
                        <input
                            onChange={(e) => setPetition(e.target.value)}
                            value={petition}
                            type="text"
                            placeholder="Alguna petición especial?"
                        />
                    </li>
                </ul>
                <button className="btn btn-primary" onClick={postOrder}>
                    Enviar pedido
                </button>
            </div>
        </ModalClient>
    );
};

export default PreOrder;
