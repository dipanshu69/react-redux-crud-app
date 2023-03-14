import { USER_ACTION_TYPES } from "./user.types";

const initialState = {
  users: [],
  user: {},
  loading: false,
  error: "",
};

export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  console.log(payload);

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
    default:
      return state;
  }
};
