import React, { useContext, useState } from "react";

import { logContext } from "../stateManager";
import error from "../utils/error";

import OrderInfo from "./OrderInfo";

import "./styles/Order.css";

const Order = ({ order, isDelivery }) => {
    const { setData, setDataDel } = useContext(logContext);
    const [isOpen, setOpen] = useState(false);
    const onClose = () => {
        setOpen(false);
    };
    const onRead = () => {
        setOpen(true);
        fetch(`${process.env.API}/api/order`, {
            method: "PATCH",
            credentials: "include",
            body: JSON.stringify({ orderId: order._id }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                order.received = true;
            })

            .catch((err) => {
                console.log(err);
            });
    };
    const onPay = () => {
        const bodyPetition = new FormData();
        bodyPetition.append("orderId", order._id);
        const options = {
            method: "DELETE",
            body: bodyPetition,
            credentials: "include",
        };
        fetch(`${process.env.API}/api/order`, options)
            .then((res) => res.json())
            .then((res) => {
                if (res.msg === error.notLogged) {
                    alert("No tiene sesión iniciada.");
                    location.reload();
                } else {
                    if (isDelivery) {
                        setDataDel(res.orders);
                    }
                    if (!isDelivery) {
                        setData(res.orders);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                alert("No se pudo borrar la orden. Intenta de nuevo.");
                location.reload();
            });
        onClose();
    };
    return (
        <div className="col mb-2">
            <div className="card">
                {order.received ? (
                    <div
                        onClick={() => setOpen(true)}
                        className="card-body"
                        style={{ height: "110px" }}
                    >
                        <h5 className="card-title">
                            {isDelivery
                                ? `Teléfono: ${order.phone}`
                                : `Mesa: ${order.table}`}
                        </h5>
                    </div>
                ) : (
                    <div
                        onClick={onRead}
                        className="card-body"
                        style={{ height: "110px", backgroundColor: "red" }}
                    >
                        <h5 className="card-title">
                            {isDelivery
                                ? `Teléfono: ${order.phone}`
                                : `Mesa: ${order.table}`}
                        </h5>
                    </div>
                )}

                <OrderInfo
                    products={order.products}
                    price={order.price}
                    phone={order.phone}
                    adress={order.adress}
                    petition={order.petition}
                    isOpen={isOpen}
                    onClose={onClose}
                    onPay={onPay}
                ></OrderInfo>
            </div>
        </div>
    );
};

export default Order;
