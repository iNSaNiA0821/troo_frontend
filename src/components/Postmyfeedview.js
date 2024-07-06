import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { set_vcoin } from "../redux/actions/auth";
import { useLocation } from "react-router-dom";
import { Watermark } from "@hirohe/react-watermark";
import Slider from "react-slick";
import { Player } from "video-react";
import { format, formatDistance, differenceInDays, differenceInMinutes, differenceInSeconds } from "date-fns";
import { es, enCA, ro, it, ptBR } from "date-fns/locale";
import api from "../utils/api";
import ReactHashtag from "react-hashtag";
import { Dropdown } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import LocationView from "../components/LocationView";
import EditDescriptionFeed from "../components/EditDescriptionFeed";
import confirm from "react-alert-confirm";
import {
  notifysuccess,
  notifywarning,
  notifyerror,
} from "../components/notify";

const Postview = (props) => {
  const dispatch = useDispatch();

  //   addsaveuser,
  //   addlike,
  //   addFollow,
  //   addReport,
  //   buyVcoin,
  //   Download,
  //   blogItem,
  //   myProfile
  // }) => {
  const location = useLocation();
  const act_tab = location.hash;
  const type = act_tab ? act_tab.replace("#", "") : "all";
  const [skip, setSkip] = useState(0);
  const [searchword, setSearchword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [owneraddr, setowneraddr] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [username, setUsername] = useState("");
  const [creatorprofile, set_profile] = useState("");
  const [creatoraddress, set_address] = useState(null);
  const [blog, setBlog] = useState(props.blogItem);
  const [flag, setflag] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBlog(props.blogItem);
    });
    return () => {
      clearTimeout(timer);
    }
  }, [props.blogItem]);

  useEffect(() => {
    setBlog(blog);
  }, [blog]);

  const viewLink = "http://localhost:4000/view" + blog._id;
  // const toggleOpen = () => setIsOpen({ isOpen: !isOpen });
  // const toggleActive = () => setIsActive({ isActive: !isActive });
  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  // const menuClass = `${isOpen ? " show" : ""}`;
  // const emojiClass = `${isActive ? " active" : ""}`;
  const { user, vcoin, isauthenticated } = useSelector((state) => state.auth); // here, indicate reducer
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
    }
  }, [isauthenticated, blog]);

  const membersettings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: false,
    variableWidth: true,
  };

  const editflag = () => {
    setflag(true);
  }

  const handleCallback = (childData) => {
    props.parentCallbackT(childData);
  }
  const deleteflag = async () => {
    try {
      const res = await api.post(`/blog/${blog._id}`);
      if (res) {
        // const res1 = await api.get("/blog/rmAlldata");
        const res1 = await api.post(`/blog/myfeed/${type}?skip=${skip}&skey=${searchword}`);
        handleChange(res1.data);
        const res2 = await api.post('/profile/viewProfile', { select_name: user.name });
        dispatch(set_vcoin(res2.data.vcoin));
        notifysuccess("Successfully Deleted");
      }
    } catch (error) {
      console.log("error", error.response.data);
    }
  }
  const handleChange = (checked) => {
    props.parentCallbackT(checked);
  };
  const handlechangeflag = (state) => {
    setflag(state);
    setConfirmModal(state);
  }

  function ConfirmModal() {
    confirm({
      title: "Are you sure?",
      language: "en",
      content: "Please Confirm Again!",
      okText: "Yes",
      cancelText: "No",
      onOk: () => deleteflag()
    });
  }

  const startTime = format(new Date(blog.date), 'yyyy-MM-dd HH:mm:ss');
  const endTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  const totalSecond = differenceInSeconds(
    new Date(endTime),
    new Date(startTime),
    { locale: enCA, includeSeconds: true, addSuffix: true }
  )

  const allMoreDate = new Date(blog.date);
  const sameYearDate = allMoreDate.toString().slice(4, 10);
  const onlyYear = allMoreDate.toString().slice(11, 15);

  const differentDays = parseInt(totalSecond / 86400);
  const differentHours = parseInt(totalSecond / 3600);
  const differentMinutes = parseInt(totalSecond % 3600 / 60);
  const differentSeconds = parseInt(totalSecond % 3600 % 60);
  let datePosted = "";

  if (differentDays < 8) {
    if (differentSeconds >= 0 && differentMinutes == 0 && differentHours == 0 && differentDays == 0) {
      datePosted = differentSeconds + "s";
    } else if (differentMinutes > 0 && differentHours == 0 && differentDays == 0) {
      datePosted = differentMinutes + "m";
    } else if (differentHours > 0 && differentDays == 0) {
      datePosted = differentHours + "h";
    } else {
      datePosted = differentDays + "d";
    }
  } else {
    if (startTime.toString().slice(0, 4) == endTime.toString().slice(0, 4)) {
      datePosted = sameYearDate;
    } else {
      datePosted = sameYearDate + ", " + onlyYear;
    }
  }

  return (
    <div className="card w-100 shadow-xss border-white p-4">
      <div className="card-body p-0 d-flex">
        <figure className="avatar me-3">
          <img
            src={`${creatorprofile.avatar
              ? creatorprofile.avatar
              : `assets/images/anonymous.PNG`
              }`}
            alt="avater"
            className="shadow-sm rounded-circle w45"
          />
        </figure>
        <h4 className="fw-700 text-grey-900 font-xssss mt-1">
          <label className="fw-900 font-xss">{creatorprofile.name}&nbsp;</label>
          <span className="mentiontag fw-600 font-xsss">@{username}</span>
          <span className="ms-2 mentiontag">
            {/* {formatDistance(new Date(blog.date), new Date(), { addSuffix: true })} */}
            {datePosted}
          </span>
          <LocationView id={blog._id} address={blog.address} phonemodel={blog.phonemodel} createdate={blog.cdate} />
        </h4>
        <div className="ms-auto pointer text-white">
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              <i
                className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"
                style={{ marginLeft: "10px" }}
              ></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <i className="feather-link me-1"></i>
                <CopyToClipboard text={viewLink} onCopy={onCopyText}>
                  <span>{isCopied ? "Copied!" : "Copy link"}</span>
                </CopyToClipboard>
              </Dropdown.Item>
              {/* Edit */}
              <Dropdown.Item onClick={() => editflag()}>
                <i class="feather-edit me-1"></i>
                <span>Edit</span>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => ConfirmModal()}>
                <i class="feather-delete me-1"></i>
                <span>Delete</span>
              </Dropdown.Item>
              {flag == true ? <EditDescriptionFeed value={blog} reValue={blog.description} parentCallback={handleCallback} changeflag={handlechangeflag} /> : ""}
              {/*Follow*/}
              <Dropdown.Item
                onClick={() => props.addFollow(blog.creator)}
                className={
                  user._id == blog.creator || location.pathname == "/save"
                    ? "d-none"
                    : ""
                }
              >
                <Icon
                  icon={
                    props.myProfile.following.some((follow) => follow.user == blog.creator)
                      ? "simple-line-icons:user-unfollow"
                      : "simple-line-icons:user-follow"
                  }
                  className="me-1"
                />
                {props.myProfile.following.some((follow) => follow.user == blog.creator)
                  ? "Unfollow"
                  : "Follow"}
                @{username}
              </Dropdown.Item>
              {/*Report*/}
              {user._id != blog.creator && (
                <Dropdown.Item
                  onClick={() => props.addReport(blog._id)}
                  className={
                    blog.reporters.some((reporter) => reporter.user == user._id)
                      ? "reported"
                      : ""
                  }
                >
                  <Icon icon="bi:flag-fill" className="me-1" />
                  {blog.reporters.some((reporter) => reporter.user == user._id)
                    ? "Reported this"
                    : "Report"}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
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
            <div className="col-sm-12 p-1 text-center">
              <img src={blog.markedmetaurl} className="rounded-3 w-100" alt="post" />
            </div>
          </div>
        </div>
      ) : null}
      <div className="card-body d-flex p-0 justify-content">
        <div
          className="card-body p-0 emoji-bttn pointer d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2"
        >
          <i className="feather-heart text-red me-2 btn-round-xs font-lg"></i>
          <span className="d-none-xss text-red">{blog.likes.length}</span>
        </div>
        <div
          className="card-body p-0 emoji-bttn pointer d-flex align-items-center fw-600 text-dark lh-26 font-xssss me-2"
        >
          <Icon
            className="font-lg text-dark me-2"
            icon="bi:bookmark"
          />
          <span className="d-none-xss text-dark">
            {blog.saveusers.length}
          </span>
        </div>
        <div
          className={`card-body p-0 pointer ms-auto d-flex align-items-center fw-600 text-dark lh-26 font-xssss`}
        >
          <i className="feather-share-2 text-dark btn-round-sm font-md"></i>
          <span className="d-none-xs"></span>
        </div>
        <div className="card-body p-0 d-flex">
          {blog.price !== 0 ? (
            <button
              className="border-0 bg-transparent d-flex align-items-center fw-600 text-grey-900 lh-26 font-xssss text-dark"
            >
              <i className="feather-download btn-round-sm font-xs text-dark"></i>
              {blog.downloads.length}
            </button>
          ) : (
            <button
              className="border-0 bg-transparent d-flex align-items-center fw-600 text-grey-900 lh-26 font-xssss text-dark"
            >
              <i className="feather-download btn-round-sm font-xs text-dark"></i>
              {blog.downloads.length}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Postview;
