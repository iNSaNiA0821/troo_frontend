import {
  SET_Isexpand,
} from "../types";

const initialState = {
  isexpand: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_Isexpand:
      return {
        ...state,
        isexpand: action.payload,
      };
    default:
      return state;
  }
};

  // case ADD_Tweet:
  //     return {
  //       ...state,
  //       Tweets: [...state.Tweets, action.payload],
  //     };