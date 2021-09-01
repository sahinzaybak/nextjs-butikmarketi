import axios from "axios";
// const BASE_URL = process.env.REACT_APP_API_URL

export const fetchCategoryList = () => (dispatch) => {
  axios.get("https://webizade.com/bm/categories").then((response) => {
    dispatch({
      type: "CATEGORY_LIST",
      payload: response.data,
    });
  });
};
