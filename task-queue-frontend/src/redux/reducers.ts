import { combineReducers } from "@reduxjs/toolkit";
import { reducer as boardReducer } from "./boardReducer";

const reducers = combineReducers({
    boardReducer
})

export default reducers