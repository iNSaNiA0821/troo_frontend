import { USER_LOADED, SET_VCOIN, USER_AUTHENTICATED, SET_PROFILE } from "../types";

const initialState = {
  user: null,
  vcoin: 0,
  isauthenticated: null,
  profile: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
      };
    case SET_VCOIN:
      return {
        ...state,
        vcoin: action.payload,
      };
    case USER_AUTHENTICATED:
      return {
        ...state,
        isauthenticated: action.payload,
      };
    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
};
