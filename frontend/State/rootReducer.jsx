import { combineReducers } from "redux";

import user from "./User/reducer";

const rootReducer = combineReducers({
  user: user,
});

export default rootReducer;
