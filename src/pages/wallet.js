import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Appfooter from "../components/Appfooter";
import Popupchat from "../components/Popupchat";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link, NavLink } from "react-router-dom";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import "./wallet.css";
import "./react-tabs.css";
import "./react-modal.css";

const Wallet = () => {
    const dispatch = useDispatch();
    const { user, vcoin, isauthenticated } = useSelector(state => state.auth);
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    return (
        <Fragment>
            <Header />
            <Leftnav />
            <div className="main-content theme-dark-bg right-chat-active">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left">
                        <div className="col-lg-12">
                            <div className="card w-100 border-white bg-white shadow-xs p-0 mb-4">
                                <div className="card-body p-lg-5 p-4 w-100 border-0">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="eth_image"><img src="../../assets/images/TrooCoin-logo.png" width={50} height={50} /></div>
                                            <div className="balance text-center fw-500 revertcolor"><span>{Math.round(vcoin * 100) / 100} Troo Coin</span></div>
                                            <div className="col-lg-12 d-flex mb-3">
                                                <div className="col-lg-4 col-md-3 col-sm-3 col-1"></div>
                                                <div className="col-lg-4 col-md-6 col-sm-6 col-10 d-flex justify-content-around">
                                                    <Link to="/payment">
                                                        <div className="d-flex flex-column justify-content-center align-items-center">
                                                            <div className="bg-light rounded-circle tool_icon mb-2 d-flex justify-content-center align-items-center cursor-pointer"><i className="feather-award" /></div>
                                                            <h4 className="cursor-pointer" >Buy</h4>
                                                        </div>
                                                    </Link>
                                                    <Link to="/send">
                                                        <div className="d-flex flex-column justify-content-center align-items-center">
                                                            <div className="bg-light rounded-circle tool_icon mb-2 d-flex justify-content-center align-items-center cursor-pointer"><i className="feather-arrow-up-right" /></div>
                                                            <h4 className="cursor-pointer">Send</h4>
                                                        </div>
                                                    </Link>
                                                    <Link to="/swap">
                                                        <div className="d-flex flex-column justify-content-center align-items-center">
                                                            <div className="bg-light rounded-circle tool_icon mb-2 d-flex justify-content-center align-items-center cursor-pointer"><i className="feather-git-pull-request" /></div>
                                                            <h4 className="cursor-pointer">Withdraw</h4>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className="col-lg-4 col-md-3 col-sm-3 col-1"></div>
                                            </div>
                                            <Tabs>
                                                <TabList>
                                                    <Tab>Assets</Tab>
                                                    <Tab>Activity</Tab>
                                                </TabList>
                                                <TabPanel>
                                                    <h3>You have no assets</h3>
                                                </TabPanel>
                                                <TabPanel>
                                                    <h3>You have no transactions</h3>
                                                </TabPanel>
                                            </Tabs>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Modal open={open} onClose={onCloseModal} center>
                    <h1 className="headerTitle">Deposit TrooCoin</h1>
                    <h4>To interact with decentralized applications using MetaMask, you'll need Ether in your wallet.</h4>
                    <hr />
                </Modal>
            </div>
            <Popupchat />
            <Appfooter />
        </Fragment>
    );
};

export default Wallet;
