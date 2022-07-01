import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { logContext } from "./stateManager";
import state from "./utils/state";

import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import Landing from "./pages/Landing";
import NotFound from "./pages/404";
import Tables from "./pages/Tables";
import Menu from "./pages/Menu";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import PostOrder from "./pages/PostOrder";
import ProductInfo from "./pages/ProductInfo";

const UserLogged = ({ children }) => {
    const { logState } = useContext(logContext);
    return children({ logState });
};

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/login" element={<LoginPage />}></Route>
                    <Route
                        path="/orders/create/:companyId/:table"
                        element={<PostOrder />}
                    ></Route>
                    <Route path="/" element={<Landing />}></Route>
                </Routes>
                <UserLogged>
                    {({ logState }) =>
                        logState === state.logged ? (
                            <Routes>
                                <Route
                                    path="/tables"
                                    element={<Tables />}
                                ></Route>
                                <Route
                                    path="/menu/:id"
                                    element={<ProductInfo />}
                                ></Route>
                                <Route
                                    path="/profile"
                                    element={<Profile />}
                                ></Route>
                                <Route path="/menu" element={<Menu />}></Route>
                                <Route
                                    path="/orders"
                                    element={<Orders />}
                                ></Route>
                            </Routes>
                        ) : (
                            <Routes>
                                <Route
                                    path="/tables"
                                    element={<LoginPage />}
                                ></Route>
                                <Route
                                    path="/menu/:id"
                                    element={<LoginPage />}
                                ></Route>
                                <Route
                                    path="/profile"
                                    element={<LoginPage />}
                                ></Route>
                                <Route
                                    path="/menu"
                                    element={<LoginPage />}
                                ></Route>
                                <Route
                                    path="/orders"
                                    element={<LoginPage />}
                                ></Route>
                            </Routes>
                        )
                    }
                </UserLogged>
            </Layout>
        </BrowserRouter>
    );
};

export default App;
