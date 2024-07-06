import React, { Fragment } from "react";
import { useHistory, Link } from "react-router-dom";
import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Appfooter from "../components/Appfooter";
import Popupchat from "../components/Popupchat";

const Send = () => {
    return (
        <Fragment>
            <Header />
            <Leftnav />
            <div className="main-content theme-dark-bg right-chat-active">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left">
                        <div className="middle-wrap">
                            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-3">
                                <div className="card-body p-lg-5 p-4 w-100 border-0">
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-lg-12 col-md-12 d-flex justify-content-center align-items-center mb-3">
                                            <div className="col-8 col-sm-8 col-lg-8 col-md-8">
                                                <h1 className="font-xl fw-700">
                                                    Withdraw
                                                </h1>
                                            </div>
                                            <div className="col-4 col-sm-4 col-lg-4 col-md-4 text-right">
                                                <Link to="/wallet"><h5 className="cursor-pointer">Cancel</h5></Link>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Popupchat />
            <Appfooter />
        </Fragment>
    );
};

export default Send;
