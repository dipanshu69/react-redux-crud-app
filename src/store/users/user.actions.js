import { USER_ACTION_TYPES } from "./user.types";
import axios from "axios";

const fetchUserRequest = () => {
  return {
    type: USER_ACTION_TYPES.FETCH_USER_REQUEST,
  };
};

const fetchUserSuccess = (users) => {
  return {
    type: USER_ACTION_TYPES.FETCH_USER_SUCCESS,
    payload: users,
  };
};

const fetchUserFailure = (error) => {
  return {
    type: USER_ACTION_TYPES.FETCH_USER_FAILURE,
    payload: error,
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchUserRequest());
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      const users = await res.data;
      console.log(users);
      dispatch(fetchUserSuccess(users));
    } catch (error) {
      dispatch(fetchUserFailure(error));
    }
  };
};
