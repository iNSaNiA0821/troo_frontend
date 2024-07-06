import React, { useState, useEffect, Fragment, } from "react";
const Pagetitle = ({ title, keyPress, sendDataToParent, searchword, searchFunction }) => {

    const [word, setWord] = useState('');
    return (
        <div className="card shadow-xss w-100 d-block d-flex p-4 mb-3 border-white">
            <h2 className="fw-700 mb-0 mt-0 font-md text-grey-900 d-flex align-items-center">{title}
                <form action="#" className="pt-0 pb-0 ms-auto">
                    <div className="search-form-2 ms-2">
                        <i className="ti-search font-xss"></i>
                        <input type="text" value={searchword} onKeyDown={(e) => keyPress(e.keyCode, e)} onChange={(e) => sendDataToParent(e.target.value)} className="form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0" placeholder={`Search ${title}`} />
                    </div>
                </form>
                <a onClick={() => searchFunction(searchword)} className="btn-round-md ms-2 bg-greylight theme-dark-bg rounded-3"><i className="feather-filter font-xss text-grey-500"></i></a>
            </h2>
        </div>
    );
}

export default Pagetitle;


