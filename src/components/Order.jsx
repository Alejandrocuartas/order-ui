import React, { useContext, useState } from "react";

import { logContext } from "../stateManager";
import error from "../utils/error";

import OrderInfo from "./OrderInfo";

import "./styles/Order.css";

const Order = ({ order }) => {
    const { setData } = useContext(logContext);
    const [isOpen, setOpen] = useState(false);
    const onClose = () => {
        setOpen(false);
    };
    const onPay = () => {
        const bodyPetition = new FormData();
        bodyPetition.append("orderId", order._id);
        const options = {
            method: "DELETE",
            body: bodyPetition,
            credentials: "include",
        };
        fetch("http://localhost:3000/api/order", options)
            .then((res) => res.json())
            .then((res) => {
                if (res.msg === error.notLogged) {
                    alert("No tiene sesión iniciada.");
                    location.reload();
                } else {
                    setData(res.orders);
                }
            })
            .catch((err) => console.log(err));
        onClose();
    };
    return (
        <div className="col mb-2">
            <div className="card">
                <div
                    onClick={() => setOpen(true)}
                    className="card-body"
                    style={{ height: "110px" }}
                >
                    <h5 className="card-title">Mesa: {order.table}</h5>
                </div>
                <OrderInfo
                    products={order.products}
                    price={order.price}
                    isOpen={isOpen}
                    onClose={onClose}
                    onPay={onPay}
                ></OrderInfo>
            </div>
        </div>
    );
};

export default Order;
