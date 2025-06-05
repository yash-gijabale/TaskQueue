import type { Dispatch } from "react";
import type { ActionType } from "../type";
import { ADD_COLUMN, ADD_TASK, EDIT_TASK, ON_DRAG_END, REARANGE_TASK, REMOVE_TASK, RENAME_COLUMN } from "./type";
import type { Task } from "../../pages/BoardSectionList";

export const addNewColumn = (name: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch({
        type: ADD_COLUMN,
        payload: name
    })
}

export const reArangeTask = (activeContainer: any) => (dispatch: Dispatch<ActionType>) => {
    dispatch({
        type: REARANGE_TASK,
        payload: activeContainer
    })
}

export const onDragEnd = (activeContainer: any) => (dispatch: Dispatch<ActionType>) => {
    dispatch({
        type: ON_DRAG_END,
        payload: activeContainer
    })
}

export const addTask = (payload: Task) => (dispatch: Dispatch<ActionType>) => {
    dispatch({
        type: ADD_TASK,
        payload: payload
    })
}

export const editTask = (payload:Task) => (dispatch:Dispatch<ActionType>) =>{
     dispatch({
        type: EDIT_TASK,
        payload: payload
    })
}

export const removeTask = (payload:Task) => (dispatch:Dispatch<ActionType>) =>{
     dispatch({
        type: REMOVE_TASK,
        payload: payload
    })
}

export const renameBoardColumn = (data:{oldName:string, newName:string}) => (dispatch:Dispatch<ActionType>) =>{
    dispatch({
        type: RENAME_COLUMN,
        payload: data
    })
}