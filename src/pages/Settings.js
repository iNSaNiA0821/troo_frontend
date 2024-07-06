import React, { Component, Fragment } from "react";
import { useHistory, Link } from "react-router-dom";
import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Appfooter from "../components/Appfooter";
import Popupchat from "../components/Popupchat";

const Settings = () => {
  let history = useHistory();
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    history.push("/login");
  };
  return (
    <Fragment>
      <Header />
      <Leftnav />
      <div className="main-content theme-dark-bg right-chat-active">
        <div className="middle-sidebar-bottom">
          <div className="middle-sidebar-left">
            <div className="middle-wrap">
              <div className="card w-100 border-white bg-white shadow-xs p-0 mb-4">
                <div className="flex-justify-content w-100 d-flex bg-black">
                  <div className="d-flex w-100 mt-2 p-4 settings">
                    <h4 className="font-md text-medium fw-600 ms-4 mb-0 mt-2 ">
                      Settings
                    </h4>
                  </div>
                </div>
                <div className="card-body p-lg-5 p-4 w-100 border-0">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="nav-caption fw-600 font-xssss text-white mb-2">
                        Genaral
                      </div>
                      <ul className="list-inline mb-4">
                        <li className="list-inline-item d-block border-bottom me-0">
                          <Link
                            to="/contactinformation"
                            className="pt-2 pb-2 d-flex align-items-center"
                          >
                            <i className="btn-round-md bg-black text-medium feather-map-pin font-md me-3"></i>{" "}
                            <h4 className="fw-600 font-xsss mb-0 mt-0">
                              Saved Address
                            </h4>
                            <i className="ti-angle-right font-xsss text-white ms-auto mt-3"></i>
                          </Link>
                        </li>
                      </ul>

                      <div className="nav-caption fw-600 font-xsss text-white mb-2">
                        Other
                      </div>
                      <ul className="list-inline">
                        <li className="list-inline-item d-block me-0">
                          <Link
                            to="/changepass"
                            className="pt-2 pb-2 d-flex align-items-center"
                          >
                            <i className="btn-round-md bg-black text-medium feather-lock font-md me-3"></i>{" "}
                            <h4 className="fw-600 font-xsss mb-0 mt-0">
                              Change Password
                            </h4>
                            <i className="ti-angle-right font-xsss text-white ms-auto mt-3"></i>
                          </Link>
                        </li>
                      </ul>
                      <ul className="list-inline">
                        <li className="list-inline-item d-block me-0">
                          <Link
                            to="/login"
                            onClick={logout}
                            className="pt-2 pb-2 d-flex align-items-center"
                          >
                            <i className="btn-round-md bg-black text-medium feather-log-out font-md me-3"></i>{" "}
                            <h4 className="fw-600 font-xsss mb-0 mt-0">
                              Logout
                            </h4>
                            <i className="ti-angle-right font-xsss text-white ms-auto mt-3"></i>
                          </Link>
                        </li>
                      </ul>
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

export default Settings;
