import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Link from "next/link";
import logo from '../../src/assets/images/logo-trans.png'
import { Form, Input, Button } from 'antd';
import 'antd/lib/form/style/index.css'
import { ReactNotifications, Store } from 'react-notifications-component';
import Image from 'next/image'

//Helpers
import { IsLogin } from '../../src/helpers/auth'

//Actions
import { fetchLogin } from '../../src/store/actions/auth'

const Login = () => {
  const isInitialMount = useRef(true);
  const dispatch = useDispatch();
  const router = useRouter()

  let authInfo = useSelector((state) => state.auth.authInfo);
  let isLogin = IsLogin(); //helpers

  function onFinish(values) {
    dispatch(fetchLogin(values))
  };

  //Giriş yapıldı mı ?
  useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false; // ilk sayfa yüklendiğinde useEffect çalışmasın. Mount & Update ayrımı => useRef()
    else {
      if (isLogin) { //true ise
        Store.addNotification({
          message: isLogin ? "başarılı" : "as",
          type: isLogin ? "success" : "danger",
          insert: "top",
          width: isLogin ? 280 : 420,
          showIcon: true,
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: { duration: 2000, onScreen: false },
        })
        setTimeout(() => {
          localStorage.setItem("userToken", authInfo.data.jwt)
          localStorage.setItem("userInfo", JSON.stringify(authInfo.data.user))
          router.push("/")
        }, 2500);
      }
    }
  }, [authInfo]);


  return (
    <div className="center-layout header-none">
      <ReactNotifications />
      <Link href="/">
        <div className="center-layout__logo">
          <Image src={logo} alt="" />
        </div>
      </Link>
      <div className="custom-container">
        <div className="center-layout__wrp">
          <div className="center-layout__top d-flex align-items-center justify-content-center">
            <h2 className="center-layout__title ml-2">Üye Girişi</h2>
          </div>
          <p className="center-layout__desc mb-4 mt-2">Merhaba, aşağıdaki bilgileri doldurarak <br />sitemize giriş yapabilirsiniz.</p>
          <Form onFinish={onFinish} autoComplete="on">
            <div className="center-layout__form">
              <div className="center-layout__item">
                <Form.Item name="username" rules={[{ required: true, message: 'Lütfen kullanıcı adınızı giriniz.' }]}>
                  <Input placeholder="Kullanıcı Adınız" className="center-layout__input" />
                </Form.Item>

              </div>
              <div className="center-layout__item">
                <Form.Item name="password" rules={[{ required: true, message: 'Lütfen şifrenizi giriniz.' }]}>
                  <Input placeholder="Şifreniz" className="center-layout__input" />
                </Form.Item>
                <p className="center-layout__form--desc mt-1"><u>Şifremi unuttum</u></p>
              </div>
              <div className="green-button secondary center-layout__button mx-0 w-100 mt-3">
                <div className="d-flex align-items-center justify-content-center">
                  <Button className="button-text ml-0 text-white" type="primary" htmlType="submit">Giriş Yap</Button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
