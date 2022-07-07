import React from "react";
import ReactDOM from "react-dom";

import "./styles/ModalClient.css";

const ModalClient = ({ isOpen, onClose, children }) => {
    if (!isOpen) {
        return null;
    }

    return ReactDOM.createPortal(
        <div className="Modal">
            <div className="Modal__containerC">
                <button onClick={onClose} className="Modal__close-buttonC">
                    X
                </button>
                {children}
            </div>
        </div>,
        document.getElementById("modal")
    );
};

export default ModalClient;
