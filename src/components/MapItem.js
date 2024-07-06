import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Watermark } from "@hirohe/react-watermark";
import Slider from "react-slick";
import { Player } from "video-react";
import { format, formatDistance } from "date-fns";
import api from "../utils/api";
import ReactHashtag from "react-hashtag";
import { Dropdown } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import LocationView from "../components/LocationView";

const MapItem = ({ addFollow, buyVcoin, Download, blogItem, myProfile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [owneraddr, setowneraddr] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [username, setUsername] = useState("");
  const [creatorprofile, set_profile] = useState("");
  const [creatoraddress, set_address] = useState(null);
  const [blog, setMyblog] = useState(blogItem);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMyblog(blogItem);
    });
    return () => {
      clearTimeout(timer);
    };
  }, [blogItem]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMyblog(blog);
    });
    return () => {
      clearTimeout(timer);
    };
  }, [blog]);

  const viewLink = "http://localhost:4000/view" + blog._id;
  const toggleOpen = () => setIsOpen({ isOpen: !isOpen });
  const toggleActive = () => setIsActive({ isActive: !isActive });
  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const menuClass = `${isOpen ? " show" : ""}`;
  const emojiClass = `${isActive ? " active" : ""}`;
  const { user, isauthenticated } = useSelector((state) => state.auth); // here, indicate reducer
  useEffect(() => {
    const timer = setTimeout(() => {
      const showusername = async () => {
        const res = await api.post("/auth/name", { id: blog.creator });
        setUsername(res.data);
      };
      if (isauthenticated) showusername();

      const setcreatorprofle = async () => {
        const res = await api.post(`/profile/${blog.creator}`);
        set_profile(res.data);
      };
      if (isauthenticated) setcreatorprofle();
    });
    return () => {
      clearTimeout(timer);
    };
  }, [isauthenticated]);

  const membersettings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: false,
    variableWidth: true,
  };

  const addlike = async (id) => {
    try {
      const res = await api.put(`/blog/like/${id}`);
      setMyblog(res.data);
    } catch (error) {
      console.log("error", error.response.data);
    }
  };
  const addsaveuser = async (id) => {
    try {
      const res = await api.put(`/blog/saveuser/${id}`);
      setMyblog(res.data);
    } catch (error) {
      console.log("error", error.response.data);
    }
  };
  const addReport = async (id) => {
    try {
      const res = await api.put(`/blog/report/${id}`);
      setMyblog(res.data);
    } catch (error) {
      console.log("error", error.response.data);
    }
  };
  return (
    <div className="card w-100 shadow-xss border-0 p-1 mb-1">
      <div className="card-body p-0 d-flex">
        <figure className="avatar me-3">
          <img
            src={`${creatorprofile.avatar
              ? creatorprofile.avatar
              : `assets/images/user.png`
              }`}
            alt="avater"
            className="shadow-sm rounded-circle w45"
          />
        </figure>
        <h4 className="fw-700 text-grey-900 font-xssss mt-1">
          <label className="fw-900 font-xsss">{username}&nbsp;</label>
          <span className="mentiontag fw-600 font-xsss">@{username}</span>
          <br />
          <span className="ms-2 mentiontag">
            {formatDistance(new Date(blog.date), new Date(), {
              addSuffix: true,
            })}
          </span>
          <LocationView id={blog._id} address={blog.address} phonemodel={blog.phonemodel} createdate={blog.cdate} />
        </h4>
      </div>
      <div className="card-body p-0 me-lg-5">
        <p className="fw-500 mentiontag lh-20 font-xssss w-100 mb-2 description">
          <ReactHashtag
            renderHashtag={(hashtagValue) => (
              <a key={blog._id} href={`${hashtagValue}`}>{hashtagValue}</a>
            )}
          >
            {blog.description}
          </ReactHashtag>
        </p>
      </div>
      {blog.filetype === "video" ? (
        <Slider {...membersettings}>
          <div
            className="d-block mb-3 overflow-hidden"
            style={{ width: "100%" }}
          >
            <Player poster={blog.thumb} src={blog.markedmetaurl} />
          </div>
        </Slider>
      ) : null}
      {blog.filetype === "image" ? (
        <div className="card-body d-block p-0 mb-3">
          <div className="row ps-2 pe-2">
            <div className="col-sm-12 p-1">
              <img
                src={blog.markedmetaurl}
                className="rounded-3 w-100"
                alt="post"
              />
            </div>
          </div>
        </div>
      ) : null}
      <div className="card-body d-flex p-0 justify-content">
        <div
          className="card-body p-0 emoji-bttn pointer d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2"
          onClick={() => addlike(blog._id)}
        >
          <i className="feather-heart text-red me-2 btn-round-xs font-lg"></i>
          <span className="d-none-xss text-red">{blog.likes.length}</span>
        </div>
        <div
          className="card-body p-0 emoji-bttn pointer d-flex align-items-center fw-600 text-dark lh-26 font-xssss me-2"
          onClick={() => addsaveuser(blog._id)}
        >
          <Icon
            className="font-lg text-dark me-2"
            icon={
              blog.saveusers.some((saveuser) => saveuser.user == user._id)
                ? "bi:bookmark-dash-fill"
                : "bi:bookmark"
            }
          />
        </div>
        <div
          className={`card-body p-0 pointer ms-auto d-flex align-items-center fw-600 text-dark lh-26 font-xssss ${menuClass}`}
          id={`dropdownMenu${blog._id}`}
          data-bs-toggle="dropdown"
          aria-expanded="false"
          onClick={toggleOpen}
        >
          <i className="feather-share-2 text-dark btn-round-sm font-md"></i>
        </div>
        <div className="card-body p-0 d-flex">
          {blog.price !== 0 ? (
            <button
              className="border-0 bg-transparent d-flex align-items-center fw-600 text-grey-900 lh-26 font-xssss text-dark"
              onClick={() => buyVcoin(blog._id, blog.price)}
            >
              <i className="feather-download btn-round-sm font-xs text-dark"></i>
            </button>
          ) : (
            <button
              className="border-0 bg-transparent d-flex align-items-center fw-600 text-grey-900 lh-26 font-xssss text-dark"
              onClick={() => Download(blog._id)}
            >
              <i className="feather-download btn-round-sm font-xs text-dark"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapItem;
