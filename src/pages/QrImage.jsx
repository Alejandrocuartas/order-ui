import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import state from "../utils/state";
import { logContext } from "../stateManager";

const QrImage = () => {
    const { logState } = useContext(logContext);
    const {
        state: { image },
    } = useLocation();

    return (
        <div>
            <h1>Descarga el código QR con click derecho</h1>
            <img
                style={{ width: "200px", height: "200px" }}
                src={image}
                alt="qr del producto"
            />
            {logState === state.notLogged ? (
                <Navigate to="/login" replace={true} />
            ) : null}
        </div>
    );
};

export default QrImage;
