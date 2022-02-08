import axios from "axios";
export const fetchLogin = (loginValues) => (dispatch) => { //Giriş Yap
  axios.post("http://localhost:1337/api/auth/local", {
      identifier: loginValues.username,
      password: loginValues.password,
    })
    .then((value) => {
      dispatch({
        type: "AUTH_INFO",
        payload: value,
      })
    });
};
