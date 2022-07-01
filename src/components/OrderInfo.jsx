import React from "react";
import Modal from "./Modal";

const OrderInfo = ({ isOpen, onClose, products, price, onPay }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="card" style={{ width: "22rem" }}>
                <ul className="list-group list-group-flush">
                    {products.map((product) => {
                        return (
                            <li key={product._id} className="list-group-item">
                                {product.name} {product.amount}
                            </li>
                        );
                    })}
                    <li className="list-group-item">${price}</li>
                </ul>
                <button className="btn btn-primary" onClick={onPay}>
                    Pagado
                </button>
            </div>
        </Modal>
    );
};

export default OrderInfo;
