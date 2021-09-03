import { combineReducers } from "redux";
import category from "./category";
import banner from "./banner";
import butik from "./butik";

export default combineReducers({
  category,
  banner,
  butik
});
