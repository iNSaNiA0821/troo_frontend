import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import './demo.css';
import Guidemodal from '../components/Guidemodal';
const Demo = () => {
    let history = useHistory();
    const [modalisopen, setmodal] = useState(false);
    const enablelogin = async () => {
        setmodal(true);
    }
    const checklogin = () => {
        history.push("/login");
    }
    const close = (data) => {
        setmodal(data);
    }
    return (
        <div>
            <div className="header-wrapper" >
                <div className="container max-container pt-3">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-3 col-xs-6"><Link to="/" className="d-flex"><img height="60" alt="favicon" className=" text-success display1-size me-2 ms-0" style={{ margin: "auto" }} src="/logo.png"></img><span className="d-inline-block fredoka-font ls-3 fw-600 text-white font-xxl logo-text mb-0"></span> </Link></div>
                        <div className="col-lg-6 col-md-6 col-sm-6 d-none d-lg-block">
                            <ul className="list-inline text-center mb-0 mt-2 pt-1">
                                <li className="list-inline-item pe-4 ps-4"><Link className="scroll-tiger text-white fw-400 font-sm" to="">NFT Market</Link></li>
                                <li className="list-inline-item pe-4 ps-4"><Link className="scroll-tiger text-white fw-400 font-sm" to="">Trading</Link></li>
                                <li className="list-inline-item pe-4 ps-4"><Link onClick={enablelogin} className="scroll-tiger text-white fw-400 font-sm" to="">How to register</Link></li>
                            </ul>

                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-3 col-xs-6 text-right">
                            <button className="btn rounded-xl btn-lg btn-secondary text-uppercase" onClick={checklogin}>Join US</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="banner-wrapper vh-100 bscover demo-style"
                style={{ backgroundImage: `url("assets/images/demo/grayback.png")`, position: { top: 0 } }}>
                <div className="banner-content">
                    <div className="container max-container">
                        <div className="row">
                            <div className="col-lg-5 col-md-6 col-sm-8">
                                <h2 className="title-text mb-5"><b className=" text-white"><span className="text-primary font-xl">Welcome to</span> Decentralized Social<span className="" style={{ color: "#e8bf02" }}> Troo </span> website</b></h2>
                                <h4 className="d-inline-block"><b className=" text-white font-xxl">32400 <span>Visiting Users<br /></span></b></h4>
                                <h4 className="d-inline-block"><b className=" text-white font-xxl">1,072,09 <span>Circulating Supply<br /></span></b></h4>
                                <h4 className="d-inline-block"><b className=" text-white font-xxl">8540 <span>NFT assets<br /></span></b></h4>
                                <div className="clearfix"></div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="section pb100 pt50 demo-style" id="feature">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <img src="assets/images/demo/nft.jpg" alt="com" className="img-fluid" />
                        </div>
                        <div className="col-lg-5 offset-lg-1">
                            <h2 className="title-text2 mb-4 mt-5"><b>Live NFT Marketplace</b></h2>				<p style={{ fontSize: 20 }}>Troo supports token trading and sharing with many websites around the world. Be a part of professional social website.</p>
                            <Link to="" className="btn btn-lg btn-primary rounded-xl mr-4 text-uppercase mt-4">Buy Now</Link>
                        </div>
                    </div>
                </div>
            </div>


            <div className="section pb100 pt50" id="feature" style={{ backgroundColor: "#111" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mt-5">
                            <img src="assets/images/demo/dex.jpg" alt="com" className="img-fluid" />
                        </div>
                        <div className="col-lg-5 offset-lg-1">
                            <h2 className="title-text2 mb-4 mt-5"><b>The Troo Exchange</b></h2>				<p style={{ color: "white", fontSize: 20 }}>Troo supports token trading and sharing with many websites around the world.The exchange is a revolutionary one that will bring tokenomics to all of crypto on its platform. We say 100% friendly trading.</p>
                            <Link to="" style={{ borderColor: "white" }} className="btn btn-lg btn-primary bg-transparent mr-4 text-uppercase mt-4">Coming soon</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section demo-style"
                style={{ backgroundImage: `url("assets/images/demo/mobile-app2.jpg")`, backgroundAttachment: "fixed", backgroundRepeat: "no-repeat", backgroundPosition: "right", backgroundSize: "cover" }}>
                <div className="container max-container">
                    <div className="col-lg-12 p-5 rounded-3 bscover">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-5 mt-5 mb-5">
                                    <h2 className="title-text2 mb-4 "><b style={{ color: "white" }}>Mobile App for iPhone and Android Phone</b></h2>
                                    <p style={{ color: "white", fontSize: 20 }}>With Beautiful Caligraphy , Optimized algorithm and Strong Secure Techniques, users easily access and enjoy under 100% trustness. </p>
                                    <Link to="/" className="btn btn-lg btn-primary rounded-xl mr-4 text-uppercase mt-4">Download</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p100 bg-black demo-style" id="contact">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 text-center">
                            <h2 className="title-text2 text-white mt-4"><b>Verified User Functions coming soon</b></h2>
                            <p className="text-white ml-5 mr-5">Only verified Pro, Media and Business account users can upload materials from computers. Create a really awesome website, choose new version that will suit your requirements in a best way.</p>
                        </div>
                    </div>
                </div>
            </div>
            {modalisopen ?
                <div style={{ position: "fixed", background: "black", opacity: 0.8, top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
                </div> : ""}
            {modalisopen ?
                <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 2 }}>
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left">
                            <div className="row feed-body">
                                <Guidemodal close={close} open={modalisopen} />
                            </div>
                        </div>
                    </div>
                </div> : ""}
        </div>
    );
}

export default Demo;