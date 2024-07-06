import React from "react";
import Slider from "react-slick";

const Guidemodal =({open,close})=>{
  
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1};
    
    return (
      <div className="vh-100" >
            {open?
            <div className="d-block mt-5 pt-5">
                <div className="d-flex justify-content-end">
                    <button className="btn rounded-md btn-md fw-900 font-xxl text-white" style={{background:"transparent"}} onClick={()=>close(false)}>&times;</button>
                </div>
                <Slider {...settings}>
                <div>
                    <img alt="favicon" width="100%" className=" text-success display1-size me-2 ms-0" style={{margin:"auto"}} src="/assets/images/demo/guide1.png"></img>
                    <p style={{textAlign:"center",color:"white",fontWeight:900, fontSize:20}}>Install Metamask Extension for browser</p>
                </div>
                <div>
                    <img alt="favicon" width="100%" className=" text-success display1-size me-2 ms-0" style={{margin:"auto"}} src="/assets/images/demo/guide2.png"></img>
                    <p style={{textAlign:"center",color:"white",fontWeight:900, fontSize:20}}>Click connect wallet and then Metamask connection will pop up</p>
                </div>
                <div>
                    <img alt="favicon" width="100%" className=" text-success display1-size me-2 ms-0" style={{margin:"auto"}} src="/assets/images/demo/guide3.png"></img>
                    <p style={{textAlign:"center",color:"white",fontWeight:900, fontSize:20}}>Make sure Wallet connected. Fill form in with your information</p>
                </div>
                <div>
                    <img alt="favicon" width="100%" className=" text-success display1-size me-2 ms-0" style={{margin:"auto"}} src="/assets/images/demo/guide4.png"></img>
                    <p style={{textAlign:"center",color:"white",fontWeight:900, fontSize:20}}>Type the code sent to your email <br/> Confirm transaction with Metamask to register</p>
                </div>
                <div>
                    <img alt="favicon" width="100%" className=" text-success display1-size me-2 ms-0" style={{margin:"auto"}} src="/assets/images/demo/guide5.png"></img>
                    <p style={{textAlign:"center",color:"white",fontWeight:900, fontSize:20}}>Log in with your registerd information</p>
                </div>
                </Slider>
            </div>:""}
      </div>
    );
};
export default Guidemodal;