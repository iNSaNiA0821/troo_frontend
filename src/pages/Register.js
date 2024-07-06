import React, { useState, Fragment } from "react";
import { useHistory, Link } from "react-router-dom";
import api from "../utils/api";
import {
  notifysuccess,
  notifywarning,
  notifyerror,
} from "../components/notify";
const Register = () => {
  let history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    pname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const { name, pname, email, password, confirmpassword } = formData;

  const onChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value, [e.target.pname]: e.target.value });
    if (e.target.name === "checkbox") setCheck(e.target.checked);
  };
  const onBlur = async () => {
    setnameerr(false);
    if (name != "") {
      try {
        var res = await api.post("/checkusers/name", { name });
      } catch (error) {
        if (error.response.data === "Username is already taken") {
          setnameerr(true);
          return;
        }
      }
    }
  };
  const onBlurpwd = () => {
    setPassworderr(false);
    const repass =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*()~¥=_+}{":;'?/>.<,`\-\|\[\]]{8,50}$/;
    if (!repass.test(password) && password !== "") {
      setPassworderr(true);
      return;
    }
  };

  const [nameerr, setnameerr] = useState(false);
  const [passworderr, setPassworderr] = useState(false);
  const [checkbox, setCheck] = useState(false);
  const [otpisopen, setotpisopen] = useState(false);
  const [otpcode, setotpcode] = useState("");
  const [statecode, setstatecode] = useState("");
  const toggleOpen = () => setotpisopen(!otpisopen);
  const nextotp = async () => {
    // console.log(name)
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email === "" || nameerr || name === "" || password === "" || pname == "") {
      notifywarning(" Please fill form correctly.");
      return;
    }
    if (!re.test(email)) {
      notifyerror("Invalid Email. Please type again");
      return;
    } else if (confirmpassword !== password) {
      notifyerror("ConfirmPassword is not correct");
      return;
    }
    if (name.indexOf(' ') >= 0) {
      notifyerror("No space allowed for username");
      return;
    }
    if (!checkbox) {
      notifywarning("Tick Accept Term and Conditions");
      return;
    }
    try {
      await api.post("/checkusers", { name, email });
      toggleOpen();
      sendotp();
    } catch (error) {
      notifyerror(error.response.data);
      return;
    }
  };

  const getRandomString = (length) => {
    var randomChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*-=_+abcdefghijklmnopqrstuvwxyz0123456789";
    var result = "";
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
  };
  const sendotp = async () => {
    let otp = Math.random();
    otp = otp * 10000;
    const code = getRandomString(8);
    console.log(code);
    const res = await api.post("/otp", { name, email, code });
    notifysuccess("Email Sent");
    setstatecode(code);
  };
  const checkcode = async (data) => {
    setotpcode(data);
    try {
      if (data === statecode) {
        var res = await api.post("/users", { name, pname, email, password });
        localStorage.setItem("token", res.data.token);
        notifysuccess("Successfully Registered!");
        history.push("/login");
      }
    } catch (error) {
      window.alert(error.response.data);
    }
  };
  return (
    <Fragment>
      <div className="main-wrap">
        <div className="nav-header bg-transparent shadow-none border-0">
          <div className="nav-top w-100">
            <Link to="/">
              <img
                height="60"
                className=" text-success display1-size me-2 ms-4"
                alt="favicon"
                src="/logo.png"
              ></img>
              <span className="d-inline-block fredoka-font ls-3 fw-600 text-white font-xxl logo-text mb-0"></span>{" "}
            </Link>
            <button className="nav-menu me-0 ms-auto"></button>
            <Link
              to="/login"
              className="header-btn d-none d-lg-block bg-dark fw-500 text-white font-xsss p-3 ms-auto w100 text-center lh-20 rounded-xl"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="header-btn d-none d-lg-block bg-current fw-500 text-white font-xsss p-3 ms-2 w100 text-center lh-20 rounded-xl"
            >
              Register
            </Link>
          </div>
        </div>
        <div className="row">
          <div
            className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
            style={{ backgroundImage: `url("/assets/images/login.jpg")` }}
          ></div>
          <div className="col-xl-7 vh-100 align-items-center d-flex rounded-3 overflow-hidden">
            <div className="card bg-black shadow-none ms-auto me-auto login-card border-real-white rounded-xxl">
              {!otpisopen ? (
                <div className="card-body rounded-0 text-left">
                  <h2 className="fw-700 text-white text-center display1-size display2-md-size mt-3 mb-5">
                    Create Account
                  </h2>
                  <form>
                    <div className="form-group icon-input">
                      <i className="font-sm ti-user text-grey-500 pe-0"></i>
                      <input
                        type="text"
                        name="pname"
                        onBlur={onBlur}
                        value={pname}
                        onChange={onChange}
                        className="style2-input ps-5 form-control bg-transparent text-white font-xsss fw-600"
                        placeholder="Full Name"
                      />
                    </div>

                    <div className="form-group icon-input mt-3">
                      <i className="font-sm ti-eye text-grey-500 pe-0"></i>
                      <input
                        type="text"
                        name="name"
                        onBlur={onBlur}
                        value={name}
                        onChange={onChange}
                        className="style2-input ps-5 form-control bg-transparent text-white font-xsss fw-600"
                        placeholder="Username"
                      />
                    </div>
                    <label
                      style={{ color: "red" }}
                      className={`ps-5 mt-2 bg-transparent font-xsss fw-600 ${nameerr == true ? "d-block" : "d-none"
                        }`}
                    >
                      {" "}
                      Username is already taken
                    </label>

                    <div className="form-group icon-input mt-3">
                      <i className="font-sm ti-email text-grey-500 pe-0"></i>
                      <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={onChange}
                        className="style2-input ps-5 form-control bg-transparent text-white font-xsss fw-600"
                        placeholder="Your Email Address"
                      />
                    </div>
                    <label
                      style={
                        passworderr == true
                          ? { color: "red" }
                          : { color: "#EDC402" }
                      }
                      className={`ps-1 mt-2 mb-2 bg-transparent font-xsss fw-600 d-block`}
                    >
                      {" "}
                      Min 8 letters, at least 1 number and symbol
                    </label>
                    <div className="form-group icon-input mt-3 mb-3">
                      <input
                        type="Password"
                        name="password"
                        onBlur={onBlurpwd}
                        value={password}
                        onChange={onChange}
                        className="style2-input ps-5 form-control bg-transparent text-white font-xss ls-3"
                        placeholder="Password"
                      />
                      <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                    </div>
                    <div className="form-group icon-input mb-1">
                      <input
                        type="Password"
                        name="confirmpassword"
                        value={confirmpassword}
                        onChange={onChange}
                        className="style2-input ps-5 form-control bg-transparent text-white font-xss ls-3"
                        placeholder="Confirm Password"
                      />
                      <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                    </div>
                    <div className="form-check text-left mb-3">
                      <input
                        type="checkbox"
                        name="checkbox"
                        onChange={onChange}
                        className="form-check-input mt-2"
                        id="exampleCheck2"
                      />
                      <label className="form-check-label font-xsss text-grey-500">
                        Accept Term and Conditions
                      </label>
                    </div>
                  </form>

                  <div className="col-sm-12 p-0 text-left">
                    <div className="form-group mb-1">
                      <button
                        onClick={nextotp}
                        className="form-control badge-pill text-center style2-input text-white fw-600 bg-dark border-0 p-0 "
                      >
                        Register
                      </button>
                    </div>
                    <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">
                      Already have account{" "}
                      <Link
                        to="/login"
                        className="fw-700 pl-1 text-primary font-md ms-1"
                      >
                        Login
                      </Link>
                    </h6>
                  </div>
                </div>
              ) : (
                <div className="card-body rounded-xxl text-left border-real-white">
                  <h3 className="fw-700 text-white text-center display1-size display2-md-size mt-3 mb-5">
                    Confirm your email verification
                  </h3>
                  <div className="form-group icon-input mb-1">
                    <input
                      type="text"
                      value={otpcode}
                      onChange={(e) => checkcode(e.target.value)}
                      className="style2-input ps-3 form-control bg-transparent text-white text-center font-lg fw-600"
                      placeholder="Please type code sent to your mail."
                    />
                    <div className="form-group mt-2">
                      <span className="text-warning">
                        {" "}
                        please do not refresh until you get code
                      </span>
                    </div>
                  </div>
                  <div className="col-sm-12 d-flex p-0 justify-content-between">
                    <div className="form-group">
                      <button
                        onClick={toggleOpen}
                        className="text-center style2-input text-white fw-900 font-md bg-dark border-0 p-1"
                      >
                        Back
                      </button>
                    </div>
                    <div className="form-group">
                      <button
                        onClick={sendotp}
                        className="text-center style2-input text-white fw-900 font-md bg-dark border-0 p-1"
                      >
                        Resend email
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
