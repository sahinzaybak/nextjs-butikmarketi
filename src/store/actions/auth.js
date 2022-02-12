import axios from "axios";
export const fetchLogin = (loginValues) => (dispatch) => { //Giriş Yap
  axios.post("http://localhost:1337/api/auth/local", {
      identifier: loginValues.username,
      password: loginValues.password,
    })
    .then((value) => {
      const config = {headers: { Authorization: `Bearer ${value.data.jwt}`}};
      localStorage.setItem("userToken", value.data.jwt)
      axios.get("http://localhost:1337/api/users/me", config).then(response => {
      dispatch({
        type: "AUTH_INFO",
        payload: response.data
      })
		})
    });
};
