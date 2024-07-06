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
import "./table.css"

const PostviewProfile = ({
    addsaveuser,
    addlike,
    addFollow,
    addReport,
    buyVcoin,
    Download,
    blogItem,
    myProfile
}) => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [loading, setLoading] = useState(true);
    const [owneraddr, setowneraddr] = useState(true);
    const [isCopied, setIsCopied] = useState(false);
    const [username, setUsername] = useState("");
    const [creatorprofile, set_profile] = useState("");
    const [creatoraddress, set_address] = useState(null);
    const [blog, setBlog] = useState(blogItem);

    useEffect(() => {
        setBlog(blogItem);
    }, [blogItem]);

    useEffect(() => {
        setBlog(blog);
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

    return (
        <tr>
            <td style={{ textAlign: "center" }}>
                {blog.filetype === "video" ? (
                    <Slider {...membersettings}>
                        <div
                            className="col-sm-12 p-1 text-center"
                            style={{ width: "150px" }}
                        >
                            <Player poster={blog.thumb} src={blog.markedmetaurl} />
                        </div>
                    </Slider>
                ) : null}
                {blog.filetype === "image" ? (
                    <div className="card-body d-block p-0 mb-3">
                        <div className="row ps-2 pe-2">
                            <div className="col-sm-12 p-1 text-center">
                                <img src={blog.markedmetaurl} className="rounded-3" alt="post" width={150} />
                            </div>
                        </div>
                    </div>
                ) : null}
            </td>
            <td>
                <div className="card-body p-0 me-lg-5 w-100">
                    <p className="fw-500 mentiontag lh-20 w-100 font-xssss mb-2 description">
                        <ReactHashtag
                            renderHashtag={(hashtagValue) => (
                                <a key={blog._id} href={`${hashtagValue}`}>{hashtagValue}</a>
                            )}
                        >
                            {blog.description}
                        </ReactHashtag>
                    </p>
                </div>
            </td>
            <td>
                <LocationView id={blog._id} address={blog.address} phonemodel={blog.phonemodel} createdate={blog.cdate} />
            </td>
        </tr>
    );
};

export default PostviewProfile;
