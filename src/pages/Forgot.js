import React, { useState, Fragment } from "react";
import { useHistory, Link } from 'react-router-dom';
import api from '../utils/api';

const Forgot = () => {
    let history = useHistory();
    const [formData, setFormData] = useState({
        email: '',
        otpcode: '',
        password: '',
        confirmpassword: ''
    });

    const { email, otpcode, password, confirmpassword } = formData;

    const onChange = async (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === "otpcode") {
            if (e.target.value == statecode)
                setOtppass(true);

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
        history.push("/login");
    }
    const next = async () => {
        try {
            var res = await api.post('/checkusers/email', { email });
            window.alert("No matched E-mail");
        } catch (error) {
            if (error.response.data == "Email is already registered") {
                setotpisopen(true);
                sendotp()
                return;
            } else {
                window.alert(error.response.data);
            }
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
        if (confirmpassword !== password) {
            window.alert("ConfirmPassword is not correct");
            return;
        }
        var res = await api.post('/reset', { email, password });
        if (res.data === "success change") {
            history.push("/login");
        }
    }
    return (
        <Fragment>
            <div className="main-wrap">
                <div className="nav-header bg-transparent shadow-none border-0">
                    <div className="nav-top w-100 ms-4">
                        <Link to="/"><img height="60" alt="favicon" className="text-success display1-size me-2 ms-0" src="/logo.png"></img><span className="d-inline-block fredoka-font ls-3 fw-600 text-white font-xxl logo-text mb-0"></span> </Link>
                        <button className="nav-menu me-0 ms-auto"></button>
                        <Link to="/login" className="header-btn d-none d-lg-block bg-dark fw-500 text-white font-xsss p-3 ms-auto w100 text-center lh-20 rounded-xl">Login</Link>
                        <Link to="/register" className="header-btn d-none d-lg-block bg-current fw-500 text-white font-xsss p-3 ms-2 w100 text-center lh-20 rounded-xl">Register</Link>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
                        style={{ backgroundImage: `url("/assets/images/login.jpg")` }}></div>
                    <div className="col-xl-7 vh-100 align-items-center d-flex bg-black rounded-3 overflow-hidden">
                        <div className="card bg-black shadow-none border-0 ms-auto me-auto login-card">
                            {!otpisopen ?
                                <div className="card-body rounded-0 text-left">
                                    <h2 className="fw-700 text-white text-center display1-size display2-md-size mb-4">Reset <br />your password</h2>
                                    <form>
                                        <div className="form-group icon-input mb-3">
                                            <i className="font-sm ti-email text-grey-500 pe-0"></i>
                                            <input type="text" name="email" value={email} onChange={onChange} className="style2-input ps-5 form-control bg-transparent text-white font-xsss fw-600" placeholder="Your Email Address" />
                                        </div>
                                    </form>

                                    <div className="col-sm-12 d-flex p-0 justify-content-between">
                                        <div className="form-group"><button onClick={back} className="text-center style2-input text-white fw-900 font-xs bg-dark border-0 p-1 ">Back</button></div>
                                        <div className="form-group"><button onClick={next} className="text-center style2-input text-white fw-900 font-xs bg-dark border-0 p-1 ">Next</button></div>
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
                                        <h2 className="fw-700 text-white text-center display1-size display2-md-size mb-4">Reset <br />your password</h2>
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
        </Fragment>
    );
}

export default Forgot;