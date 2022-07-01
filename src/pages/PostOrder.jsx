import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import { logContext } from "../stateManager";

const PostOrder = () => {
    const { socket } = useContext(logContext);
    const { companyId, table } = useParams();
    const postOrder = async () => {
        const order = {
            companyId,
            table,
            products: [
                {
                    name: "papa",
                    amount: 3,
                    price: 3000,
                },
                {
                    name: "empanadas",
                    amount: 2,
                    price: 1000,
                },
                {
                    name: "limonada",
                    amount: 2,
                    price: 1500,
                },
            ],
        };
        const options = {
            method: "POST",
            body: JSON.stringify(order),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const res = await fetch("http://localhost:3000/api/order", options);
        if (!res.ok) {
            alert("No se pudo crear la orden. Intenta de nuevo.");
            location.reload();
        }
        const response = await res.json();
        socket.emit("new-order", response.orders);
        alert("Orden enviada con éxito.");
    };
    return (
        <div>
            <button onClick={postOrder}>post order</button>
        </div>
    );
};

export default PostOrder;
