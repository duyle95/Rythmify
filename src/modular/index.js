import { combineReducers } from "redux";
import auth from "./auth";
import genre from "./genre";
import playlist from "./playlist";

export default combineReducers({
  auth,
  genre,
  playlist
});
