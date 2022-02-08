import { useSelector } from "react-redux";

//Giriş yapıldı mı?
export const IsLogin = () => {
  let authInfo = useSelector((state) => state.auth.authInfo);
  if (authInfo != "") return authInfo.status == 200 ? true : false;
};

//Sitede üye girişli kullanıcı var mı?
export const IsLoginIn = () => {
 if(JSON.parse(localStorage.getItem("userInfo")) != null) return true
 else return false
};

