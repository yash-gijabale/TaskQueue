import { getAuthState } from "../../utils/User";
import type { ActionType } from "../type";
import type { User } from "../userReducer/userReducer";
import { LOGIN_SIGNUP, LOGOUT } from "./type";

export interface Auth {
    isLogged: boolean,
    user: User | null
}
let preAurh = getAuthState()
const INITAL_AUTH: Auth = preAurh ? preAurh : { isLogged: false, user: null }
console.log(INITAL_AUTH)
const authReducer = (state: Auth = INITAL_AUTH, action: ActionType) => {
    switch (action.type) {

        case LOGIN_SIGNUP: {
            let newAuth: Auth = { user: action.payload, isLogged: true }
            return newAuth
        }

        case LOGOUT: {
            return { isLogged: false, user: null }
        }
        default: return state
    }

}

export default authReducer