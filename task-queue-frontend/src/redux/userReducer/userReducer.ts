import { getAllusersFromLocalStorage } from "../../utils/User";
import type { ActionType } from "../type";
import { ADD_URER, ALL_USERS, EDIT_USER, REMOVE_USER } from "./type";

export interface User {
    id: string,
    userName: string,
    password: string,
    firstName: string
    lastName: string,
    type: 'admin' | 'member'
}

const preUsers: User[] = getAllusersFromLocalStorage()
const userReducer = (state: User[] = preUsers, action: ActionType) => {
    switch (action.type) {
        case ADD_URER:
            let users = [...state]
            users.push(action.payload)
            return users;

        case ALL_USERS: return state

        case EDIT_USER: {
            let preUser = [...state]
            let { id } = action.payload
            preUser = preUser.map((user: User) => {
                if (user.id === id) {
                    return action.payload
                }
                return user
            })
            return preUser
        }

        case REMOVE_USER: {
            let preUser = [...state]
            let id = action.payload
            preUser = preUser.filter((user: User) => user.id !== id)
            return preUser
        }
        default: return state;
    }
}

export default userReducer