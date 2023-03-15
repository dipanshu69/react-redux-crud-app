import { USER_ACTION_TYPES } from "./user.types";

const initialState = {
  users: [],
  user: {},
  loading: false,
  error: "",
};

export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_ACTION_TYPES.FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: payload,
      };
    case USER_ACTION_TYPES.FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case USER_ACTION_TYPES.DELETE_USER:
    case USER_ACTION_TYPES.ADD_USER:
    case USER_ACTION_TYPES.UPDATE_USER:
      return {
        ...state,
        loading: false,
      };
    case USER_ACTION_TYPES.GET_SINGLE_USER:
      return {
        ...state,
        user: payload,
        loading: false,
      };
    default:
      return state;
  }
};
