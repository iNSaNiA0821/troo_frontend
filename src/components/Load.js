import React from 'react';
import Loader from "react-loader-spinner";

const Load = () => {
    return (
        <div className="card w-100 text-center shadow-xss rounded-xxl border-0 p-4 mb-3 mt-3">
            {/* <div className="snippet mt-2 ms-auto me-auto" data-title=".dot-typing">
                <div className="stage">
                    <div className="dot-typing"></div>
                </div>
            </div> */}
            <Loader
                type="ThreeDots"
                color="#EDC402"
                height={50}
                width={50}
            />
        </div>

        // <img src={loadingGIF} alt="Loading.." className="d-block m-auto" />
    );

}

export default Load;