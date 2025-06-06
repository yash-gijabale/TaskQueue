import type { Auth } from "../redux/authReducer/authReducer";
import type { User } from "../redux/userReducer/userReducer";

export const updateUserLocalStorage = (data: User[]) => {
    localStorage.setItem("users", JSON.stringify(data));
};

export const getAllusersFromLocalStorage = (): User[] => {
    let usersString: string = localStorage.getItem('users') as string
    let users: User[] = []
    if (usersString) {
        users = JSON.parse(usersString);
    }
    return users
}

export const addAuthToLocalStorage = (data: Auth) => {
    localStorage.setItem("auth", JSON.stringify(data));
}

export const getAuthState = (): (Auth | null) => {
    let usersString: string = localStorage.getItem('auth') as string
    let auth;
    if (usersString) {
        auth = JSON.parse(usersString);
    }
    return auth || null
}

export const removeAuthStateFormLocalStorage = ()=>{
    localStorage.removeItem('auth')
}