import axios from "axios";

let isMember;
export const fetchLogin = (loginValues) => async (dispatch) => { //Giriş Yap
  await axios.post("http://localhost:1337/api/auth/local", {
      identifier: loginValues.username,
      password: loginValues.password,
    }).then((value) => {
      isMember = true
    const config = { headers: { Authorization: `Bearer ${value.data.jwt}` } };
    localStorage.setItem("userToken", value.data.jwt);
    axios.get("http://localhost:1337/api/users/me", config) //kullanıcı bilgilerini al.
      .then((response) => {
        dispatch({
          type: "AUTH_INFO",
          payload: response.data,
        });
      });
  }).catch(() => { //Üye olunurken hata ile karşılaşılırsa => aynı kullanıcı adı
    isMember = false
  });
  return isMember ? true : false
};

export const fetchRegister = (loginValues) => async (dispatch) => { //Üye Ol
  await axios.post("http://localhost:1337/api/auth/local/register", { //üye ol
    email: `${loginValues.username}@butikmarketi.com`,
    username: loginValues.username,
    password: loginValues.password,
  }).then(() => {
    isMember = false
    axios.post("http://localhost:1337/api/auth/local", { //olunan üyeyi sisteme giriş yaptır.
      identifier: loginValues.username,
      password: loginValues.password,
    }).then((value) => {
    const config = { headers: { Authorization: `Bearer ${value.data.jwt}` } };
    localStorage.setItem("userToken", value.data.jwt);
    axios.get("http://localhost:1337/api/users/me", config) //kullanıcı bilgilerini al.
      .then((response) => {
        dispatch({
          type: "AUTH_INFO",
          payload: response.data,
        });
      });
  });
  }).catch(() => {
    isMember = true
  });
  return isMember ? true : false
};
