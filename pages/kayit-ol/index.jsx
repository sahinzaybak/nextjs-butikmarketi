import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Link from "next/link";
import logo from '../../src/assets/images/logo-trans.png'
import { Form, Input } from 'antd';
import { ReactNotifications, Store } from 'react-notifications-component';
import Image from 'next/image'

//Actions
import { fetchRegister } from '../../src/store/actions/auth';

const signIn = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter()

  async function onFinish(values) {
    const isMember = await dispatch(fetchRegister(values))
    if (!isMember) {
      setLoading(true)
      setTimeout(() => {
        Store.addNotification({
          message: "Tebrikler, Üyelik İşleminiz Tamamlandı, yönlendiriliyorsunuz...",
          type: "success",
          insert: "top",
          width: 1000,
          showIcon: true,
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: { duration: 2500, onScreen: false },
        })
      }, 1000);
      setTimeout(() => {
        router.push("/")
      }, 2500);
    }
    else {
      Store.addNotification({
        message: "Bu kullanıcı adı ile bir üyemiz zaten mevcut. Lütfen başka bir kullanıcı adı belirleyin.",
        type: "danger",
        insert: "top",
        width: 400,
        showIcon: true,
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: { duration: 2500, onScreen: false },
      })
    }
  };

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
            <h2 className="center-layout__title ml-2">Üye Ol</h2>
          </div>
          <p className="center-layout__desc mb-4 mt-2">Merhaba, aşağıdaki bilgileri doldurarak <br />sitemize üye olabilirsiniz.</p>

          <Form onFinish={onFinish} autoComplete="on">
            <div className="center-layout__form">
              <div className="center-layout__item">
                <Form.Item name="username" rules={[{ required: true, message: 'Lütfen Kullanıcı Adınızı Belirleyin.' }]}>
                  <Input placeholder="Kullanıcı Adınızı Belirleyin." className="center-layout__input" />
                </Form.Item>
              </div>
              <div className="center-layout__item">
                <Form.Item name="password" rules={[{ required: true, message: 'Şifrenizi Belirleyin.' }]}>
                  <Input placeholder="Şifrenizi Belirleyin." className="center-layout__input" />
                </Form.Item>
              </div>

              <div className={`green-button secondary center-layout__button mx-0 w-100 mt-3 ${loading ? "disabled" : ""}`}>
                <div className="d-flex align-items-center justify-content-center h-100">
                  <button htmlType="submit" className="ant-btn ant-btn-primary button-text ml-0 text-white d-flex align-items-center justify-content-center w-100 h-100">
                    <div className={`spinner-border position-absolute ${!loading ? "d-none" : ""}`} role="status"></div>
                    <span>{!loading && "Üye Ol"}</span>
                  </button>
                </div>
              </div>
              <Link href="/giris-yap">
                <p className="center-layout__form--desc mt-1"><u>Zaten üyeyim</u></p>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default signIn;
