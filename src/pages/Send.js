import React, { Fragment, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Appfooter from "../components/Appfooter";
import Popupchat from "../components/Popupchat";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
    notifysuccess,
} from "../components/notify";

const Send = () => {
    const dispatch = useDispatch();
    const [notexit, setNotexit] = useState("Cool");
    const [user_name, setUsername] = useState("");
    const [donateCoin, setDonateCoin] = useState("");
    const [rate, setRate] = useState("");
    const { vcoin } = useSelector(state => state.auth);

    function addAmount(input) {
        setDonateCoin(input);
        if (input > vcoin) {
            setRate("more");
        } else if (input <= vcoin) {
            setRate("less");
        } else {
            setRate("");
        }
        if (input == "" || input == 0) {
            setRate("");
        }
        if (isNaN(input)) {
            setDonateCoin(input.slice(0, -1));
            setRate("more");
        }
    }

    function init() {
        setNotexit("Cool");
        setUsername("");
    }

    function setMaxCoin() {
        setDonateCoin(vcoin);
        setRate("less");
    }

    const checkUsername = (username) => {
        setUsername(username);
        if (username == "") {
            setNotexit("Cool");
        } else {
            let formData = new FormData();
            formData.append("username", username);
            axios
                .post("http://localhost:4000/api/profile/checkusername", formData, {
                    headers: {
                        "x-auth-token": localStorage.getItem("token"),
                        "Content-Type": "multipart/form-data",
                    },
                    timeout: 20000,
                })
                .then(function (res) {
                    if (res.data == null) {
                        setNotexit("errorsign");
                        setDonateCoin("");
                    } else {
                        setRate("");
                        setNotexit("");
                        notifysuccess("Successfully Verified");
                    }
                });
        }
    }
    return (
        <Fragment>
            <Header />
            <Leftnav />
            <div className="main-content theme-dark-bg right-chat-active">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left">
                        <div className="middle-wrap">
                            <div className="card w-100 border-white bg-white shadow-xs p-0 mb-3">
                                <div className="card-body p-lg-5 p-4 w-100 border-0">
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-lg-12 col-md-12 d-flex justify-content-center align-items-center mb-3">
                                            <div className="col-8 col-sm-8 col-lg-8 col-md-8">
                                                <h1 className="font-xl fw-700">
                                                    Send to
                                                </h1>
                                            </div>
                                            <div className="col-4 col-sm-4 col-lg-4 col-md-4 text-right">
                                                {notexit != "" ? <Link to="/wallet"><h5 className="cursor-pointer">Cancel</h5></Link> : ""}
                                            </div>
                                        </div>
                                        <div className="input-group mb-3 d-flex">
                                            <span className="input-group-text text-1 col-lg-1 col-md-1 col-sm-1 col-2 d-flex justify-content-center">{notexit != "" ? <img className="cursor-pointer" src="../../assets/images/search-white.png" width={30} height={30} /> : <img className="cursor-pointer" src="../../assets/images/verified.png" width={30} height={30} />}</span>
                                            <div className="col-lg-10 col-md-10 col-sm-10 col-8"><input type="text" className="main-input" placeholder="Search, public address (username)" onChange={(e) => checkUsername(e.target.value)} value={user_name} /></div>
                                            <span className="input-group-text text-2 col-lg-1 col-md-1 col-sm-1 col-2 d-flex justify-content-center">
                                                {notexit != "" ? <img className="cursor-pointer" src="../../assets/images/qr-blue.svg" width={20} height={20} /> : <img className="cursor-pointer" src="../../assets/images/send_close.png" width={20} height={20} onClick={init} />}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={`error_username ${notexit}`} >Recipient username is invalid</div>
                                </div>
                            </div>
                            {notexit == "" ? <div className="card w-100 border-white bg-white shadow-xs p-0">
                                <div className="card-body p-lg-5 p-4 w-100 border-0">
                                    <div className="row">
                                        <div className="d-flex mb-4">
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-2"></div>
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-4 text-white d-flex align-items-center"><h3>Assets:</h3></div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-4"><input type="text" className="amount" value={Math.round(vcoin * 100) / 100} /></div>
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-2"></div>
                                        </div>
                                        <div className="d-flex">
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-2"></div>
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-4 text-white d-flex align-items-center">
                                                <div>
                                                    <h3>Amount:</h3>
                                                    <div className="max_btn"><button onClick={setMaxCoin}>max</button></div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-4"><input type="text" className={`amount ${rate}`} value={Math.round(donateCoin * 100) / 100} onChange={(event) => addAmount(event.target.value)} maxLength="3" /></div>
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-2"></div>
                                        </div>
                                        {rate == "more" ? <div className="d-flex mt-2">
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-2"></div>
                                            <div className="col-lg-8 col-md-8 col-sm-8 col-10 moreRate">Insufficient funds.</div>
                                        </div> : ""}
                                        <div className="d-flex mt-5">
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-2"></div>
                                            <div className="col-lg-3 col-md-3 col-sm-3 col-4"><Link to="/wallet"><button type="button" className="cancel_btn">Cancel</button></Link></div>
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-1"></div>
                                            {rate == "less" ? <div className="col-lg-3 col-md-3 col-sm-3 col-3"><button type="button" className="next_btn">Next</button></div> : <div className="col-lg-3 col-md-3 col-sm-3 col-3"><button type="button" className="next_btn lessthan" disabled>Next</button></div>}
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-2"></div>
                                        </div>
                                    </div>
                                </div>
                            </div> : ""}

                        </div>
                    </div>
                </div>
            </div>

            <Popupchat />
            <Appfooter />
        </Fragment >
    );
};

export default Send;
