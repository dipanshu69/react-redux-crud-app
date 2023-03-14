import { applyMiddleware, legacy_createStore as createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { rootReducer } from "./root-reducer";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
);
