import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { logContext } from "../stateManager";

import "./styles/PostOrder.css";

const PostOrder = () => {
    const { socket } = useContext(logContext);
    const { companyId, table } = useParams();
    const [menu, setMenu] = useState({ products: [] });

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
    useEffect(() => {
        fetch(`http://localhost:3000/api/menu/${companyId}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.status);
                }
                return res.json();
            })
            .then((res) => {
                setMenu(res.menu);
                console.log(res.menu);
            })
            .catch((err) => {
                alert("Error al conseguir el menú. Intenta de nuevo.");
                location.reload();
            });
    }, []);
    if (menu.products.length === 0) {
        return (
            <div>
                <h1>Cargando menú...</h1>
                <strong>
                    Si no carga es porque probablemente no hay menú aún.
                </strong>
            </div>
        );
    }
    return (
        <div className="accordion" id="accordionExample">
            {menu.products.map((product) => {
                return (
                    <div key={product._id} className="accordion-item">
                        <h2 className="accordion-header" id={product._id}>
                            <button
                                className="accordion-button collapsed btn-primary col-12"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse${product._id}`}
                                aria-expanded="false"
                                aria-controls={`collapse${product._id}`}
                            >
                                {product.name}
                            </button>
                        </h2>
                        <div
                            id={`collapse${product._id}`}
                            className="accordion-collapse collapse"
                            aria-labelledby={product._id}
                            data-bs-parent="#accordionExample"
                        >
                            <div className="accordion-body">
                                <img
                                    src={product.image}
                                    alt={`Image of ${product.name}`}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default PostOrder;
