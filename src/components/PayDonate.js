import React, { useState, useRef } from "react";
import { MentionsInput, Mention } from "react-mentions";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import api from "../utils/api";
import "../pages/style.css";
import { set_vcoin } from "../redux/actions/auth";
import "react-alert-confirm/dist/index.css";
import confirm from "react-alert-confirm";

import {
    notifysuccess,
    notifywarning,
    notifyerror,
} from "../components/notify";

const Donate = (props) => {
    const dispatch = useDispatch();
    const { vcoin, user } = useSelector((state) => state.auth);
    //modal
    const [show, setShow] = useState(true);
    const handleClose = () => { setShow(false); props.changeflag(false); };

    //hastag
    const [donateCoin, setDonateCoin] = useState(0);
    const [numberValidate, setNumValidate] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const myInput = useRef();
    function addAmount(input) {
        setDonateCoin(input);
        if (isNaN(input)) {
            setDonateCoin(input.slice(0, -1));
        }
    }

    const Uploadsubmit = async () => {
        const processed = await api.put("/blog/donate", {
            tcoin: donateCoin.trim(),
            userid: props.userValue._id,
            creatorid: props.value.creator
        });
        if (processed) {
            dispatch(set_vcoin(processed.data.vcoin - donateCoin));
            notifysuccess("Successfully Donated");

            await api.put("/blog/donatehistory", {
                fromuser: user._id,
                touser: props.value.creator,
                blog_id: props.value._id,
                amount: donateCoin
            });
            handleClose();
        } else {
            notifyerror("Disconnected Server");
        }
    };

    // Confirm Modal
    function ConfirmModal() {
        if (donateCoin == 0) {
            setNumValidate("error")
            setErrorMsg("Empty Value!");
            notifyerror("Empty Value!");
        } else if (isNaN(donateCoin)) {
            setNumValidate("error")
            setErrorMsg("Must be Number!");
            notifyerror("Must be Number!");
        } else if (donateCoin > vcoin) {
            setNumValidate("error")
            setErrorMsg("Not enough TrooCoin!");
            notifyerror("Not enough TrooCoin!");
        } else {
            handleClose();
            confirm({
                title: "Are you sure?",
                language: "en",
                content: "Please Confirm Again!",
                okText: "Yes",
                cancelText: "No",
                onOk: () => Uploadsubmit()
            });
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} className="modalContent">
                <Modal.Header closeButton className="bg-black rounded-0">
                    <div className="d-flex w-100">
                        <h4 className="font-lg fw-600 ms-4 mb-0 mt-2 text-medium">
                            Donate
                        </h4>
                    </div>
                </Modal.Header>
                <Modal.Body className="card bg-black rounded-0">
                    <form action="#">
                        <div className="row">
                            <div className="col-lg-12 mb-1">
                                <div className="form-gorup">
                                    <label className="mont-font fw-600 font-md text-medium ms-2 mb-0 mt-2">
                                        How many Troo Coin?
                                    </label>
                                    <MentionsInput
                                        className={`mentioFns font-sm ${numberValidate}`}
                                        inputRef={myInput}
                                        spellCheck="false"
                                        value={donateCoin}
                                        onChange={(event) => addAmount(event.target.value)}
                                        required={true}
                                        maxLength="3"
                                    >
                                        <Mention
                                            trigger="#"
                                            appendSpaceAdd={true}
                                        >
                                        </Mention>
                                    </MentionsInput>
                                    <label className="mb-0 mt-2 errorMsg">
                                        {errorMsg}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="">
                        </div>
                        <div className="row"></div>
                    </form>
                </Modal.Body>
                <Modal.Footer className="bg-black rounded-0">
                    <button
                        // onClick={Uploadsubmit}
                        onClick={ConfirmModal}
                        className="bg-black text-center text-medium font-md fw-600 p-1 w175 badge-pill d-inline-block"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={handleClose}
                        className="bg-black text-center text-medium font-md fw-600 p-1 w175 badge-pill d-inline-block"
                    >
                        Cancel
                    </button>
                </Modal.Footer>
            </Modal>

        </>);
};

export default Donate;
