import React, { useState, createContext } from "react";
import io from "socket.io-client";
import Cookies from "js-cookie";

import state from "./utils/state";

let loggState = state.notLogged;
const logContext = createContext();
const userToken = Cookies.get("userToken");
if (userToken) {
    loggState = state.logged;
}
const Context = ({ children }) => {
    const [logState, setLogState] = useState(loggState);
    const [data, setData] = useState([]);
    const [products, setProducts] = useState([]);
    const [client, setClient] = useState([]);
    const defaultContext = {
        logState,
        setLogState: (newState) => {
            setLogState(newState);
        },
        socket: io("http://localhost:3000"),
        data,
        setData: (newData) => {
            setData(newData);
        },
        products,
        setProducts: (newProducts) => {
            setProducts(newProducts);
        },
        client,
        setClient: (clientState) => {
            setClient(clientState);
        },
    };

    return (
        <logContext.Provider value={defaultContext}>
            {children}
        </logContext.Provider>
    );
};

export { Context, logContext };
