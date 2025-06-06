import { combineReducers } from "@reduxjs/toolkit";
import { reducer as boardReducer } from "./boardReducer";
import { reducer as boardListReducer } from "./boardListReducer";
import { reducer as userReducer } from "./userReducer";
import { reducer as authReducer } from "./authReducer";

const reducers = combineReducers({
    boardReducer,
    boardListReducer,
    userReducer,
    authReducer
})

export default reducers