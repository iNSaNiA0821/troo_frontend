import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../utils/api";

const Profilelikesname = ({ creator }) => {
  const [username, setUsername] = useState([]);
  const { user, isauthenticated } = useSelector((state) => state.auth); // here, indicate reducer
  useEffect(() => {
    const showusername = async () => {
      const res = await api.post("/auth/name", { id: creator });
      setUsername(res.data);
    };
    if (isauthenticated) showusername();
  }, [isauthenticated]);

  return (
      <>
        {username}
      </>
  )
};

export default Profilelikesname;
