import { combineReducers } from "redux";
import category from "./category";
import banner from "./banner";
import butik from "./butik";
import products from "./products";
import orders from "./orders";
import auth from "./auth";

export default combineReducers({
  category,
  banner,
  butik,
  products,
  orders,
  auth
});
