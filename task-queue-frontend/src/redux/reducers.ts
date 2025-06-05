import { combineReducers } from "@reduxjs/toolkit";
import { reducer as boardReducer } from "./boardReducer";
import { reducer as boardListReducer } from "./boardListReducer";

const reducers = combineReducers({
    boardReducer,
    boardListReducer
})

export default reducers