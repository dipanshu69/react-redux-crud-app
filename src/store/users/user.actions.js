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

const deleteSelectedUser = () => {
  return {
    type: USER_ACTION_TYPES.DELETE_USER,
  };
};

const addSelectedUser = () => {
  return {
    type: USER_ACTION_TYPES.ADD_USER,
  };
};

const getUser = (user) => {
  return {
    type: USER_ACTION_TYPES.GET_SINGLE_USER,
    payload: user,
  };
};

const updateSelectedUser = () => {
  return {
    type: USER_ACTION_TYPES.UPDATE_USER,
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchUserRequest());
      const res = await axios.get(`${process.env.REACT_APP_API}`);
      const users = await res.data;
      dispatch(fetchUserSuccess(users));
    } catch (error) {
      dispatch(fetchUserFailure(error));
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API}/${id}`);
      dispatch(deleteSelectedUser());
      dispatch(fetchUsers());
    } catch (error) {
      dispatch(fetchUserFailure(error));
    }
  };
};

export const addUser = (user) => {
  return async (dispatch) => {
    try {
      await axios.post(`${process.env.REACT_APP_API}`, user);
      dispatch(addSelectedUser());
      dispatch(fetchUsers());
    } catch (error) {
      dispatch(fetchUserFailure(error));
    }
  };
};

export const getSingleUser = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/${id}`);
      dispatch(getUser(res.data));
    } catch (error) {
      dispatch(fetchUserFailure(error));
    }
  };
};

export const updateUser = (user, id) => {
  return async (dispatch) => {
    try {
      await axios.put(`${process.env.REACT_APP_API}/${id}`, user);
      dispatch(updateSelectedUser());
    } catch (error) {
      dispatch(fetchUserFailure(error));
    }
  };
};
