import { combineReducers } from "redux";
import { userReducer } from "./users/user.reducers";

export const rootReducer = combineReducers({
  users:userReducer
})
