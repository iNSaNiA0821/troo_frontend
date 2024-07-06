import { combineReducers } from "redux";

import util from "./util";
import auth from './auth'

export default combineReducers({
    util,
    auth
})