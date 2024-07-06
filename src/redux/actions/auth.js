import { USER_LOADED, SET_VCOIN, USER_AUTHENTICATED, SET_PROFILE } from "../types";

export const set_user = (payload) => {
    return {
        type: USER_LOADED,
        payload
    }
}
export const set_vcoin = (payload) => {
    return {
        type: SET_VCOIN,
        payload
    }
}

export const set_authenticated = (payload) => {
    return {
        type: USER_AUTHENTICATED,
        payload
    }
}

export const set_profile = (payload) => {
    return {
        type: SET_PROFILE,
        payload
    }
}