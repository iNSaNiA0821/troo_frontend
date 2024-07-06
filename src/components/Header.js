import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import api from '../utils/api';

import Darkbutton from "../components/Darkbutton";
import { setIsexpand } from "../redux/actions/util";

const Header = () => {
  const dispatch = useDispatch();

  const {
    user, vcoin, isauthenticated
  } = useSelector(state => state.auth); // here, indicate reducer

  useEffect(() => {
    const timer = setTimeout(() => {
      const setblogs = async () => {
        // const res = await api.get('/profile/notification');
        const res = await api.get(`/profile/notification?userid=${user._id}`);
        if (res.data.length != 0) {
          console.log(res.data);
          setexitdonate(true);
          setminedonatehistory(res.data);
        }
      }
      if (isauthenticated && user) setblogs();
    });
    return () => {
      clearTimeout(timer);
    }
  }, [isauthenticated]);

  const [isOpen, setIsopen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isNoti, setIsNoti] = useState(false);
  const [isafterexpand, setIsafterexpand] = useState(false);
  const [isexpandover, setIsexpandover] = useState(true);
  const [Tooltip, setTooltip] = useState("");
  const [TooltipOffset, setTooltipOffset] = useState("0px");
  const [exitdonate, setexitdonate] = useState(false);
  const [minedonatehistory, setminedonatehistory] = useState([]);

  const toggleOpen = () => setIsopen(!isOpen);
  const toggleActive = () => setIsActive(!isActive);
  const toggleisNoti = () => setIsNoti(!isNoti);
  const { isexpand } = useSelector((state) => state.util); // here, indicate reducer
  const toggleexpand = () => {
    setTimeout(() => {
      setIsafterexpand(!isafterexpand);
    }, 250);
    dispatch(setIsexpand(!isexpand));
  };
  const expandover = (e) => {
    const span = e.target.nextElementSibling;
    const offset = e.currentTarget.parentElement.offsetTop + 100 + "px";
    setIsexpandover(!isexpandover);
    // setTooltip(span.innerHTML);
    // setTooltipOffset(offset);
  };

  const navClass = `${isOpen ? " nav-active" : ""}`;
  const buttonClass = `${isOpen ? " active" : ""}`;
  const searchClass = `${isActive ? " show" : ""}`;
  const notiClass = `${isNoti ? " show" : ""}`;
  const navwidth = `${isexpand ? " 280px" : "84px"}`;

  return (
    <div className="nav-header shadow-xs headerborder">
      <div className="nav-top d-flex justify-content-between border-black">
        <Link to="/home">
          <img
            height="60"
            alt="favicon"
            className="text-success display2-size me-1 ms-4"
            src="/logo.png"
          ></img>
          <span className="d-inline-block fredoka-font ls-3 fw-600 text-dark font-xxl logo-text mb-0"></span>{" "}
        </Link>

        <button
          onClick={toggleOpen}
          className={`nav-menu me-0 ms-2 ${buttonClass}`}
        ></button>
      </div>

      <form action="#" className="float-left header-search ms-3">
        <div className="form-group mb-0 icon-input">
          <i className="feather-search font-sm text-grey-400"></i>
          <input
            type="text"
            placeholder="Type search words.."
            className="bg-grey text-grey-900 border-0 lh-32 pt-2 pb-2 ps-5 pe-3 font-xssss fw-500 rounded-xl w350 theme-dark-bg"
          />
        </div>
      </form>
      <div className={`p-2 pointer text-center ms-auto menu-icon ${notiClass}`}>
        {exitdonate ? <span className="dot-count bg-warning"></span> : ""}
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic">
            <span
              id="dropdownMenu3"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="feather-bell font-xl text-dark"></i>
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Header><b>Notification</b></Dropdown.Header>
            {minedonatehistory.length == 0 ?
              <Dropdown.Item>
                <span>
                  No exit Donatehistory
                </span>
              </Dropdown.Item> : isauthenticated && user ?
                minedonatehistory.map((array, i) => {
                  return (
                    <Dropdown.Item>
                      <span>
                        {array.name + " - " + array.amount + " Troo Coin"}
                      </span>
                    </Dropdown.Item>
                  )
                }
                ) : ""}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Darkbutton />

      <div className="p-0 ms-5 menu-icon">
        <Link to="./wallet">
          <h1 className="border-bottom-1 border-dark d-flex">{Math.round(vcoin * 100) / 100} <img src="../../assets/images/TrooCoin-logo.png" width={25} height={25} className="ms-3" /></h1>
        </Link>
      </div>
      <nav
        className={`navigation scroll-bar ${navClass}`}
        style={{ width: navwidth }}
      >
        <div className="container ps-0 pe-0">
          <div className="nav-content">
            <div className="nav-wrap bg-transparent-card pt-3 pb-1 mb-2 mt-2">
              <div className="nav-caption fw-600 font-xssss text-grey-500"></div>
              <ul className="mb-1 top-content">
                <li className="logo d-none d-xl-block d-lg-block"></li>
                <li>
                  <Link to="/home" className="nav-content-bttn open-font">
                    <i
                      onMouseOver={(e) => expandover(e)}
                      onMouseOut={(e) => expandover(e)}
                      className="font-xl text-grey-500 feather-home me-4"
                    ></i>
                    <span>HOME</span>
                  </Link>
                </li>
                <li>
                  <Link to="/myfeed" className="nav-content-bttn open-font">
                    <i
                      onMouseOver={(e) => expandover(e)}
                      onMouseOut={(e) => expandover(e)}
                      className="feather-package font-xl text-grey-500 me-4"
                    ></i>
                    <span>My Feed</span>
                  </Link>
                </li>
                <li>
                  <Link to="/upload" className="nav-content-bttn open-font">
                    <i
                      onMouseOver={(e) => expandover(e)}
                      onMouseOut={(e) => expandover(e)}
                      className="feather-upload font-xl text-grey-500 me-4"
                    ></i>
                    <span>Upload </span>
                  </Link>
                </li>
                <li>
                  <Link to="/mapping" className="nav-content-bttn open-font">
                    <i
                      onMouseOver={(e) => expandover(e)}
                      onMouseOut={(e) => expandover(e)}
                      className="font-xl text-grey-500 feather-map-pin me-4"
                    ></i>
                    <span>Mapping</span>
                  </Link>
                </li>
                <li>
                  <Link to="/save" className="nav-content-bttn open-font">
                    <i
                      onMouseOver={(e) => expandover(e)}
                      onMouseOut={(e) => expandover(e)}
                      className="font-xl text-grey-500 feather-bookmark me-4"
                    ></i>
                    <span>Save</span>
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="nav-content-bttn open-font">
                    <i
                      onMouseOver={(e) => expandover(e)}
                      onMouseOut={(e) => expandover(e)}
                      className="feather-user font-xl text-grey-500 me-4"
                    ></i>
                    <span>Profile </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/settings"
                    className="nav-content-bttn open-font h-auto pt-2 pb-2"
                  >
                    <i
                      onMouseOver={(e) => expandover(e)}
                      onMouseOut={(e) => expandover(e)}
                      className="font-xl feather-settings me-4 text-grey-500"
                    ></i>
                    <span>Settings</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="nav-wrap bg-transparent-card shadow-xss pt-3 pb-1">
              <div className="nav-wrap fw-600 font-xssss text-grey-500"></div>
              <ul className="mb-1">
                <li
                  onClick={toggleexpand}
                  className="pointer d-xl-block d-lg-block text-primary"
                >
                  <i
                    onMouseOver={(e) => expandover(e)}
                    onMouseOut={(e) => expandover(e)}
                    className={`ms-3 font-xl text-yellow ${isafterexpand
                      ? "feather-chevrons-right"
                      : "feather-chevrons-left"
                      } me-4`}
                  ></i>
                  <span className="font-md">
                    {isafterexpand ? "" : ""}
                  </span>
                </li>
                <li>
                  <Link to="/wallet" className="nav-content-bttn open-font">
                    <i
                      onMouseOver={(e) => expandover(e)}
                      onMouseOut={(e) => expandover(e)}
                      className="font-xl feather-credit-card me-4 text-grey-500"
                    ></i>
                    <span>Wallet</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {
        !isexpand ? (
          <div
            className={`fw-600 font-xss ${isexpandover ? "d-none" : "d-block"}`}
            style={{
              position: "absolute",
              top: TooltipOffset,
              left: "80px",
              padding: "10px",
              backgroundColor: "#000000",
              zIndex: "10",
            }}
          >
            {Tooltip}
          </div>
        ) : (
          ""
        )
      }
      <div className={`app-header-search ${searchClass}`}>
        <form className="search-form">
          <div className="form-group searchbox mb-0 border-0 p-1">
            <input
              type="text"
              className="form-control border-0"
              placeholder="Search..."
            />
            <i className="input-icon">
              <ion-icon
                name="search-outline"
                role="img"
                className="md hydrated"
                aria-label="search outline"
              ></ion-icon>
            </i>
            <span className="ms-1 mt-1 d-inline-block close searchbox-close">
              <i className="ti-close font-xs" onClick={toggleActive}></i>
            </span>
          </div>
        </form>
      </div>
    </div >
  );
};

export default Header;
