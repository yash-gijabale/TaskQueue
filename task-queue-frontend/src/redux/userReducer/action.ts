import type { Dispatch } from "@reduxjs/toolkit";
import type { User } from "./userReducer";
import type { ActionType } from "../type";
import { ADD_URER, ALL_USERS, EDIT_USER, REMOVE_USER } from "./type";

export const createUser = (data: User) => (dispatch: Dispatch<ActionType>) => {
    dispatch({
        type: ADD_URER,
        payload: data
    })
}

export const getAllUsers = () => (dispatch: Dispatch<ActionType>) => {
    dispatch({
        type: ALL_USERS,
        payload: null
    })
}

export const editUser = (data: User) => (dispatch: Dispatch<ActionType>) => {
    dispatch({
        type: EDIT_USER,
        payload: data
    })
}

export const removeUser = (id:string) => (dispatch: Dispatch<ActionType>) => {
    dispatch({
        type: REMOVE_USER,
        payload: id
    })
}