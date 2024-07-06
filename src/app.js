// React Required
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Routes from "./routes";
import { set_user, set_vcoin, set_authenticated } from "./redux/actions/auth";
import { setIsexpand } from "./redux/actions/util";
// Create Import File
import "./main.scss";
import api from "./utils/api";
import setAuthToken from "./utils/setAuthToken";
const App = () => {
  let dispatch = useDispatch();
  localStorage.setItem("isexpand", true);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localStorage.token) {
        let auth = setAuthToken(localStorage.token);
      }
      const set = async () => {
        try {
          const res = await api.get("/auth");
          dispatch(set_user(res.data));
          dispatch(set_vcoin(res.data.vcoin));
          dispatch(set_authenticated(true));
        } catch (error) {
          if (error.response)
            if (
              error.response === undefined ||
              error.response.data === "InvalidToken" ||
              error.response.data === "NoUser"
            ) {
              localStorage.removeItem("token");
            }
            else return;
        }
      };
      set();
    });
    return () => {
      clearTimeout(timer);
    }
  }, []);
  return (
    <>
      <Routes />
    </>
  );
};
export default App;
