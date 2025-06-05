import type { Dispatch } from "@reduxjs/toolkit";
import type { ActionType } from "../type";
import { ADD_BOARD, EDIT_BOARD, REMOVE_BOARD } from "./type";

export const addNewBoard = (data: any) => (dispatch: Dispatch<ActionType>) => {
    dispatch({
        type: ADD_BOARD,
        payload: data
    })
}

export const editBoard = (data: { id: string, data: any }) => (dispatch: Dispatch<ActionType>) => {
    dispatch({
        type: EDIT_BOARD,
        payload: data
    })
}

export const deleteBoard = (id:string) => (dispatch: Dispatch<ActionType>) => {
    dispatch({
        type: REMOVE_BOARD,
        payload: id
    })
}