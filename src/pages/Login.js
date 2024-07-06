import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { set_user, set_vcoin, set_authenticated } from "../redux/actions/auth";
import api from "../utils/api";
import { notifysuccess, notifywarning, notifyerror } from '../components/notify';
const Login = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "checkbox")
      setCheck(e.target.checked);
  };
  const [checkbox, setCheck] = useState(false);
  const login = async () => {
    if (email === "" || password === "") { notifywarning("Please fill form correctly."); return; }
    try {
      var res = await api.post("/auth", { email, password });
      if (res) {
        localStorage.setItem("token", res.data.token);
        api.defaults.headers.common['x-auth-token'] = res.data.token;
        dispatch(set_user(res.data.user));
        dispatch(set_vcoin(res.data.user.vcoin));
        dispatch(set_authenticated(true));
        history.push("/home");
      }
    } catch (error) {
      notifyerror(error.response.data);
    }
  };
  return (
    <div className="main-wrap">
      <div className="nav-header bg-transparent shadow-none border-0">
        <div className="nav-top w-100">
          <Link to="/">
            <img
              height="60"
              className=" text-success display1-size me-2 ms-4"
              src="/logo.png"
              alt="favicon"
            />
            <span className="d-inline-block fredoka-font ls-3 fw-600 text-white font-xxl logo-text mb-0">

            </span>
          </Link>
          <button className="nav-menu me-0 ms-auto"></button>
          <Link
            to="/login"
            className="header-btn d-none d-lg-block bg-current fw-500 text-white font-xsss p-3 ms-auto w100 text-center lh-20 rounded-xl"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="header-btn d-none d-lg-block bg-dark fw-500 text-white font-xsss p-3 ms-2 w100 text-center lh-20 rounded-xl"
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
            <div className="card-body rounded-0 text-left">
              <h2 className="fw-700 text-white text-center display1-size display2-md-size mt-3 mb-5">
                Account Login
              </h2>
              <form>
                <div className="form-group icon-input mt-3 mb-2">
                  <i className="font-sm ti-email text-grey-500 pe-0"></i>
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={onChange}
                    className="style2-input ps-5 form-control bg-transparent text-white font-xsss fw-600"
                    placeholder="Your Email"
                  />
                </div>
                <div className="form-group icon-input mt-2 mb-2">
                  <input
                    type="Password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    className="style2-input ps-5 form-control bg-transparent text-white font-xss ls-3"
                    placeholder="Password"
                  />
                  <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                </div>
                <div className="form-check text-left mt-2 mb-3">
                  <input
                    type="checkbox"
                    name="checkbox"
                    onChange={onChange}
                    className="form-check-input mt-2"
                    id="exampleCheck5"
                  />
                  <label className="form-check-label font-xsss text-grey-500">
                    Remember me
                  </label>
                  <Link
                    to="/forgot"
                    className="fw-600 font-xsss text-white-700 mt-1 float-right"
                  >
                    Forgot your Password?
                  </Link>
                </div>
              </form>

              <div className="col-sm-12 p-0 text-left">
                <div className="form-group mb-1">
                  <button
                    onClick={login}
                    className="form-control badge-pill text-center text-white fw-600 bg-dark border-0 p-0 "
                  >
                    Login
                  </button>
                </div>
                <h6 className="text-grey-500 font-xsss fw-500 mt-4 mb-0 lh-32">
                  Don't have account
                  <Link
                    to="/register"
                    className="fw-700 pl-1 text-primary font-md ms-1"
                  >
                    Register
                  </Link>
                </h6>
              </div>
              <div className="col-sm-12 p-0 text-center mt-2">
                <div className="form-group mb-1">
                  <Link
                    to="/register"
                    className="form-control badge-pill text-left style2-input text-white fw-600 bg-facebook border-0 p-0 mb-2"
                  >
                    <img
                      src="assets/images/icon-1.png"
                      alt="icon"
                      className="ms-5 w40 mb-1 me-4"
                    />
                    Sign in with Google
                  </Link>
                </div>
                <div className="form-group mb-1">
                  <Link
                    to="/register"
                    className="form-control badge-pill text-left style2-input text-white fw-600 bg-twiiter border-0 p-0 "
                  >
                    <img
                      src="assets/images/icon-3.png"
                      alt="icon"
                      className="ms-5 w40 mb-1 me-4"
                    />
                    Sign in with Facebook
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
