import axios from "axios";
// const BASE_URL = process.env.REACT_APP_API_URL

export const fetchButikLogo = () => (dispatch) => {
  axios.get("https://webizade.com/bm/stores").then((response) => {
    dispatch({
      type: "BUTIK_LOGOS",
      payload: response.data,
    });
  });
};
