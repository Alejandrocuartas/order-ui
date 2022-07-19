import React from "react";
import Modal from "./Modal";
import Order from "./Order";

const OrderInfo = ({ isOpen, onClose, products, price, onPay, petition }) => {
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
                    {petition ? (
                        <li
                            className="list-group-item"
                            style={{ backgroundColor: "#FF8000" }}
                        >
                            {petition}
                        </li>
                    ) : null}
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
