import { useSelector } from "react-redux";

//Giriş yapıldı mı?
export const IsLogin = () => {
  let authInfo = useSelector((state) => state.auth.authInfo);
  if (authInfo != "") return authInfo != "" ? true : false;
};

//Sitede üye girişli kullanıcı var mı?
export const IsLoginIn = () => {
  if (typeof window !== "undefined") {
    if (JSON.parse(localStorage.getItem("userInfo")) != null) return true;
    else return false;
  }
};

//Giriş yapılmış üyenin bilgileri
export const loginUserInfo = () => {
  if (typeof window !== "undefined") {
    if (JSON.parse(localStorage.getItem("userInfo")) != null)
      return JSON.parse(localStorage.getItem("userInfo"));
    else return false;
  }
};
