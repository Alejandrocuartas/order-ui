import React from "react";
import ModalClient from "./ModalClient";

const PreOrder = ({ isOpen, onClose, products, postOrder }) => {
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
            <div className="card">
                <ul className="list-group list-group-flush">
                    {products.map((product) => {
                        return (
                            <li key={product.name} className="list-group-item">
                                {product.name} {product.amount}
                            </li>
                        );
                    })}
                </ul>
                <button className="btn btn-primary" onClick={postOrder}>
                    Enviar pedido
                </button>
            </div>
        </ModalClient>
    );
};

export default PreOrder;
