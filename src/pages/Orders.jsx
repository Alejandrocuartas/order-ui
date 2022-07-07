import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

import { logContext } from "../stateManager";

import Order from "../components/Order";
import state from "../utils/state";
import error from "../utils/error";

const userToken = Cookies.get("userToken");

const Orders = () => {
    const [loading, setLoading] = useState(false);
    const { socket, data, setData, logState } = useContext(logContext);

    useEffect(() => {
        setLoading(true);
        socket.emit("get-orders", userToken, (response) => {
            if (response.error) {
                if (response.message === error.notAuthenticated) {
                    alert("Primero ingresa.");
                    Cookies.remove("userToken");
                    location.replace("login");
                }
            }
            setData(response.orders);
            setLoading(false);
        });
        socket.on("new-orders", (orders) => {
            setData(orders);
        });
    }, []);
    if (loading) {
        return (
            <div className="row d-flex justify-content-center">
                <div className="spinner-border text-dark" role="status"></div>
            </div>
        );
    }
    if (data.length === 0) return <h1>Sin órdenes</h1>;
    return (
        <div className="container container-fluid">
            <div className="row">
                {data.map((order) => {
                    return <Order key={order._id} order={order} />;
                })}
            </div>
            {logState === state.notLogged ? (
                <Navigate to="/login" replace={true} />
            ) : null}
        </div>
    );
};

export default Orders;
