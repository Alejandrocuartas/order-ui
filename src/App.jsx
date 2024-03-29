import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import QrImage from "./pages/QrImage";
import Deliveries from "./pages/Deliveries";
import PostDelivery from "./pages/PostDelivery";

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/login" element={<LoginPage />}></Route>
                    <Route path="/" element={<Landing />}></Route>
                    <Route
                        path="/orders/create/:companyId/:table"
                        element={<PostOrder />}
                    ></Route>
                    <Route
                        path="/orders/create/delivery/:companyId"
                        element={<PostDelivery />}
                    ></Route>
                    <Route path="/tables" element={<Tables />}></Route>
                    <Route path="/menu/:id" element={<ProductInfo />}></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                    <Route path="/menu" element={<Menu />}></Route>
                    <Route path="/orders" element={<Orders />}></Route>
                    <Route path="/deliveries" element={<Deliveries />}></Route>
                    <Route
                        path="/tables/qr/:number"
                        element={<QrImage />}
                    ></Route>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default App;
