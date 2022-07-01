import React from "react";

const Login = () => {
    return (
        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div
                            className="card shadow-2-strong"
                            style={{ borderRadius: "1rem" }}
                        >
                            <div className="card-body p-5 text-center">
                                <h3>Entra o regístrate</h3>
                                <div
                                    id="g_id_onload"
                                    data-client_id="833948062282-i27n7ugbijppggel9lp48khr1o5l1c7u.apps.googleusercontent.com"
                                    data-auto_prompt="false"
                                    data-callback="handleCredentialResponse"
                                ></div>
                                <div
                                    className="g_id_signin"
                                    data-type="standard"
                                    data-size="large"
                                    data-theme="outline"
                                    data-text="sign_in_with"
                                    data-shape="rectangular"
                                    data-logo_alignment="center"
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
