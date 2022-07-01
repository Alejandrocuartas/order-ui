import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { Context } from './stateManager'

ReactDOM.render(
    <Context>
        <App/>
    </Context>,
    document.getElementById('root')
)
