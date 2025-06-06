import type { Dispatch } from "@reduxjs/toolkit";
import type { ActionType } from "../type";
import { LOGIN_SIGNUP, LOGOUT } from "./type";
import type { User } from "../userReducer/userReducer";

export const loginSingupHandler = (data: User) => (dispatch: Dispatch<ActionType>) => {
    dispatch({
        type: LOGIN_SIGNUP,
        payload: data
    })
}

export const logout = () => (dispatch: Dispatch<ActionType>) => {
    dispatch({
        type: LOGOUT,
        payload: null
    })
}