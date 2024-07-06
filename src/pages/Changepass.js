import React, { useState, Fragment } from "react";
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import api from '../utils/api';
import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Appfooter from "../components/Appfooter";
import Popupchat from "../components/Popupchat";
import {
    notifysuccess,
    notifywarning,
    notifyerror,
} from "../components/notify";

const Forgot = () => {
    let history = useHistory();
    const [formData, setFormData] = useState({
        email: '',
        otpcode: '',
        password: '',
        confirmpassword: '',
        lastpassword: ''
    });

    const {
        user
    } = useSelector(state => state.auth);

    const { email, otpcode, lastpassword, password, confirmpassword } = formData;

    const onChange = async (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === "otpcode") {
            if (e.target.value == statecode) {
                notifysuccess("E-mail Verified!");
                setOtppass(true);
            }
        }
    }
    const [statecode, setstatecode] = useState('');
    const [otpisopen, setotpisopen] = useState(false);
    const [otppass, setOtppass] = useState(false);
    const [passworderr, setPassworderr] = useState(false);
    const toggleOpen = () => setotpisopen(!otpisopen);
    const back = () => {
        setotpisopen(false);
        setOtppass(false);
        history.push("/settings");
    }
    const next = async () => {
        if (email != user.email) {
            notifyerror("Incorrect E-mail!");
        } else {
            const code = getRandomString(8);
            setstatecode(code);
            console.log(code);
            var name = user.name;
            const res = await api.post("/otp", { name, email, code });
            notifysuccess("Email Sent");
            setotpisopen(true);
        }
    }
    const getRandomString = (length) => {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*-=_+()[]{}?:abcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for (var i = 0; i < length; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }
    const sendotp = async () => {
        var otp = Math.random();
        otp = otp * 10000;
        const code = getRandomString(8);
        await api.post('/otp', { name: "Client", email, code });
        setstatecode(code);
    }
    const onBlurpwd = () => {
        setPassworderr(false);
        const repass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*()~¥=_+}{":;'?/>.<,`\-\|\[\]]{8,50}$/;
        if (!repass.test(password) && password !== "") {
            setPassworderr(true);
            return;
        }
    }
    const reset = async () => {
        if (lastpassword == password) {
            notifyerror("Password not change");
        }
        else if (confirmpassword !== password) {
            notifyerror("ConfirmPassword is not correct")
            return;
        } else {
            var res = await api.post('/reset/chgpwd', { email, lastpassword, password });
            if (res.data === "success change") {
                notifysuccess("Success Changed")
                history.push("/settings");
            }
        }
    }
    return (
        <Fragment>
            <Header />
            <Leftnav />
            <div className="main-content theme-dark-bg right-chat-active">
                <div className="middle-sidebar-bottom d-flex justify-content-center">
                    <div className="middle-sidebar-left">
                        <div className="middle-wrap d-flex justify-content-center">
                            <div className="card border-white bg-white shadow-xs p-0 mb-4 changePassword">
                                {!otpisopen ?
                                    <div className="card-body rounded-0 text-left">
                                        <h2 className="fw-700 text-white text-center display1-size display2-md-size mb-4">Change<br />your password</h2>
                                        <form>
                                            <div className="form-group icon-input mb-3">
                                                <i className="font-sm ti-email text-grey-500 pe-0"></i>
                                                <input type="text" name="email" value={email} onChange={onChange} className="style2-input ps-5 form-control bg-transparent text-white font-xsss fw-600" placeholder="Your Email Address" />
                                            </div>
                                        </form>

                                        <div className="col-sm-12 d-flex p-0 justify-content-between">
                                            <div className="form-group"><button onClick={back} className="text-center style2-input text-white fw-900 font-xs bg-dark border-0 p-1 w100">Back</button></div>
                                            <div className="form-group"><button onClick={next} className="text-center style2-input text-white fw-900 font-xs bg-dark border-0 p-1 w100">Next</button></div>
                                        </div>
                                    </div> : (!otppass ?
                                        <div className="card-body rounded-0 text-left">
                                            <h3 className="fw-700 text-white text-center display1-size display2-md-size mt-3 mb-5">E-mail verification code</h3>
                                            <div className="form-group icon-input mb-1">
                                                <input type="text" name='otpcode' value={otpcode} onChange={onChange} className="style2-input ps-3 form-control bg-transparent text-white text-center font-lg fw-600" placeholder="" />
                                                <div className="form-group mt-2"><span className="text-warning"> please do not refresh until you get code</span></div>
                                            </div>
                                            <div className="col-sm-12 d-flex p-0 justify-content-between">
                                                <div className="form-group"><button onClick={toggleOpen} className="text-center style2-input text-white fw-900 font-md bg-dark border-0 p-1 ">Back</button></div>
                                                <div className="form-group"><button onClick={sendotp} className="text-center style2-input text-white fw-600 font-xss bg-dark border-0 p-1 ">Resend email</button></div>
                                            </div>
                                        </div> :
                                        <div className="card-body rounded-0 text-left">
                                            <h2 className="fw-700 text-white text-center display1-size display2-md-size mb-4">Change<br />your password</h2>
                                            <div className="form-group icon-input mt-3 mb-3">
                                                <input type="Password" name="password" onBlur={onBlurpwd} value={password} onChange={onChange} className="style2-input ps-5 form-control bg-transparent text-white font-xss ls-3" placeholder="New Password" />
                                                <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                                            </div>
                                            <label style={{ color: 'red' }} className={`ps-1 mb-2 bg-transparent font-xsss fw-600 ${passworderr == true ? "d-block" : "d-none"}`}> Min 8 letters, at least 1 number and symbol</label>
                                            <div className="form-group icon-input mb-4">
                                                <input type="Password" name="confirmpassword" value={confirmpassword} onChange={onChange} className="style2-input ps-5 form-control bg-transparent text-white font-xss ls-3" placeholder="Confirm Password" />
                                                <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                                            </div>
                                            <div className="col-sm-12 p-0 mt-3 text-left">
                                                <div className="form-group mb-1"><button onClick={reset} className="form-control badge-pill text-center style2-input text-white fw-600 bg-dark border-0 p-0 ">Reset</button></div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Popupchat />
            <Appfooter />
        </Fragment>
    );
}

export default Forgot;