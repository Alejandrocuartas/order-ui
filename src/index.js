import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { Context } from "./stateManager";

window.API = process.env.API;

ReactDOM.render(
    <Context>
        <App />
    </Context>,
    document.getElementById("root")
);
