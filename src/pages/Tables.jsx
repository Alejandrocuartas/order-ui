import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { logContext } from "../stateManager";
import state from "../utils/state";

const Tables = () => {
    const { logState } = useContext(logContext);
    return (
        <div>
            <h1>tables</h1>
            {logState === state.notLogged ? (
                <Navigate to="/login" replace={true} />
            ) : null}
        </div>
    );
};

export default Tables;
