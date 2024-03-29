import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { logContext } from "../stateManager";

import "./styles/PostOrder.css";

import PreOrder from "../components/PreOrder";

const PostOrder = () => {
    const { socket } = useContext(logContext);
    const { companyId, table } = useParams();
    const [menu, setMenu] = useState({ products: [] });
    const [products, setProducts] = useState([]);
    const [isOpen, setOpen] = useState(false);
    const [counter, setCounter] = useState({});
    const [petition, setPetition] = useState("");
    const [loading, setLoading] = useState(false);
    const onClose = () => {
        setOpen(false);
    };

    const addProduct = (product) => (e) => {
        if (!product.available) {
            return alert("Este producto está agotado hoy.");
        }
        if (products.length === 0) {
            setProducts([
                {
                    name: product.name,
                    amount: 1,
                    price: product.price,
                },
            ]);
            setCounter({
                [product.name]: 1,
            });
        } else {
            let currentProducts = products;
            const names = currentProducts.map((p) => p.name);
            const index = names.indexOf(product.name);
            if (index === -1) {
                currentProducts.push({
                    name: product.name,
                    amount: 1,
                    price: product.price,
                });
                setCounter({ ...counter, [product.name]: 1 });
            } else {
                currentProducts[index].amount += 1;
                setCounter({
                    ...counter,
                    [product.name]: ++counter[product.name],
                });
            }
            setProducts([...currentProducts]);
        }
    };

    const removeProduct = (product) => (e) => {
        if (products.length > 0) {
            let currentProducts = products;
            const names = currentProducts.map((p) => p.name);
            const index = names.indexOf(product.name);
            if (index !== -1) {
                currentProducts[index].amount -= 1;
                const remainingProducts = currentProducts.filter((p) => {
                    return p.amount > 0;
                });
                setProducts([...remainingProducts]);
                setCounter({
                    ...counter,
                    [product.name]: --counter[product.name],
                });
            }
        }
    };

    const postOrder = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        if (products.length <= 0) {
            return alert("Todavía no has agregado productos.");
        }
        const order = {
            companyId,
            table,
            products,
            petition,
        };
        const options = {
            method: "POST",
            body: JSON.stringify(order),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const res = await fetch(`${process.env.API}/api/order`, options);
        if (!res.ok) {
            alert("No se pudo crear la orden. Intenta de nuevo.");
            return location.reload();
        }
        const response = await res.json();
        setLoading(false);
        socket.emit("new-order", response.orders);
        alert(
            "Orden enviada con éxito. En un momento llegará su pedido. \nA continuación le pedimos llenar una corta encuesta para valorar la experiencia."
        );
        location.href =
            "https://docs.google.com/forms/d/e/1FAIpQLSeBP562eJl14MO7jiQ4dEYJG01a82FBNsgjWxKlTVKCVkinAQ/viewform?vc=0&c=0&w=1&flr=0&usp=mail_form_link";
    };
    useEffect(() => {
        fetch(`${process.env.API}/api/menu/${companyId}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.status);
                }
                return res.json();
            })
            .then((res) => {
                setMenu(res.menu);
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
            <hr className="mb-0 mt-0" />
            {menu.products.map((product) => {
                let color;
                if (product.available) {
                    color = "white";
                } else {
                    color = "#E0E0E0";
                }
                return (
                    <div
                        style={{ backgroundColor: color }}
                        key={product._id}
                        className="accordion-item"
                    >
                        <h2 className="accordion-header mb-0" id={product._id}>
                            <button
                                className="accordion-button collapsed btn col-12"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse${product._id}`}
                                aria-expanded="false"
                                aria-controls={`collapse${product._id}`}
                            >
                                {product.name}
                            </button>
                        </h2>
                        <hr className="mb-0 mt-0" />
                        <div
                            id={`collapse${product._id}`}
                            className="accordion-collapse collapse"
                            aria-labelledby={product._id}
                            data-bs-parent="#accordionExample"
                        >
                            <div className="accordion-body">
                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={`Image of ${product.name}`}
                                    />
                                ) : null}
                                <div className="card">
                                    <ul className="list-group list-group-flush">
                                        {product.description ? (
                                            <li className="list-group-item order-li">
                                                <p className="price-description">
                                                    {product.description}
                                                </p>
                                            </li>
                                        ) : null}
                                        {product.price ? (
                                            <li className="list-group-item order-li">
                                                <h6 className="price-description">
                                                    ${product.price}
                                                </h6>
                                            </li>
                                        ) : null}
                                        <li className="list-group-item order-li">
                                            <span
                                                onClick={removeProduct(product)}
                                                className="badge badge-pill badge-warning"
                                            >
                                                -
                                            </span>
                                            <span className="badge badge-pill badge-light">
                                                {counter[product.name]
                                                    ? counter[product.name]
                                                    : 0}
                                            </span>
                                            <span
                                                onClick={addProduct(product)}
                                                className="badge badge-pill badge-warning"
                                            >
                                                +
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
            <h2 className="accordion-header mb-0">
                <button
                    className="accordion-button collapsed btn col-12"
                    type="button"
                >
                    {" "}
                </button>
            </h2>
            {!isOpen ? (
                <button
                    onClick={() => setOpen(true)}
                    className="col-12 fixed-bottom btn btn-primary"
                >
                    Revisar pedido
                </button>
            ) : null}
            <PreOrder
                setPetition={setPetition}
                petition={petition}
                postOrder={postOrder}
                onClose={onClose}
                isOpen={isOpen}
                products={products}
            />
        </div>
    );
};

export default PostOrder;
