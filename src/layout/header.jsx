import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Link from "next/link";
import Image from 'next/image'
import logo from '../assets/images/logo-2.png'
import search from '../assets/images/search.svg'
import heart from '../assets/images/shopping-bag (2).svg'
import { BiUser } from "react-icons/bi";

import { Form, Input } from 'antd';
import 'antd/lib/form/style/index.css'

//Helpers
import { IsLoginIn } from '../../src/helpers/auth'

//Components
import Categories from '../components/categories'

//Actions
import { fetchCategoryList } from '../store/actions/category'
import { confirmForSendWhatsappMessage, userMemberConfirm, userInfoUpdate } from '../store/actions/users'

let isLoginIn;
const Header = () => {
  const [isOpenUserConfirm, setIsOpenUserConfirm] = useState(false);
  const [confirmInputValue, setConfirmInputValue] = useState("");
  const [formValues, setFormValues] = useState();
  const dispatch = useDispatch()
  const [form] = Form.useForm();

  let categoryList = useSelector(state => state.category.categoryList) //Dolan kategori listesini al.
  let userInfo = useSelector(state => state.auth.authInfo)

  if (userInfo != "")
    localStorage.setItem("userInfo", JSON.stringify(userInfo)) // state userInfo yenilendiğinde localStorage'de yenilenir.

  useEffect(() => {
    dispatch(fetchCategoryList()) //Kategori listesini doldurmak için action'a dispatch et.
    isLoginIn = IsLoginIn() //Üye girişi yapılmış mı?

    if (JSON.parse(localStorage.getItem("userInfo")) != null)  //localStorge kullanıcı bilgileri al ve authInfo state'ni doldur.
      dispatch({ type: "AUTH_INFO", payload: JSON.parse(localStorage.getItem("userInfo")) });
  }, [])

  //Inputların içi dolu gelsin.
  useEffect(() => {
    form.setFieldsValue({
      username: userInfo.username,
      phone: userInfo.phone,
      nameSurname: userInfo.nameSurname,
      address: userInfo.address
    });
  }, [userInfo]);

  function onFinish(values) { //Form okeyse
    setFormValues(values);
    // confirmForSendWhatsappMessage(values.nameSurname, values.phone, userInfo.id) //Whatsapp onay mesajı gönder.

    (userInfo.status) ? //eğer status=true ise onay modalı açma direk bilgileri kaydet
      dispatch(userInfoUpdate(userInfo.id, values.nameSurname, values.address)) //bilgileri güncelle.
      :
      setIsOpenUserConfirm(true) //status=false ise onay modalını aç.
  };

  //Onay modal
  function confirmUser() {
    if (!userInfo.status) //Status false ise 
      dispatch(userMemberConfirm(confirmInputValue, userInfo.id, formValues.nameSurname, formValues.phone, formValues.address)) //onay kodunu gir ve üyeliği onayla => status=true
  }

  return (
    <>
      <div className="header d-flex align-items-center">
        <div className="custom-container">
          <div className="d-flex align-items-center justify-content-between">
            <a href="/" className="header-logo">
              <Image src={logo} alt="" />
            </a>
            <div className="header-search">
              <div className="d-flex align-items-center w-100 h-100">
                <div className="d-flex">
                  <Image src={search} alt="" />
                  <input type="text" placeholder="Ürün Ara.." />
                </div>
              </div>
            </div>
            <div className="header-action">
              <div className="d-flex">
                {isLoginIn ?
                  <>
                    <div className="header-action__item dropdown">
                      <BiUser color="#323232" fontSize={20} />
                      <p className="header-action__name member">{userInfo.username}</p>
                    </div>
                    <div className="header-action__dropdown">
                      <div className="header-action__dropdown--item">
                        <Link href="/giris-yap">Kişisel Bilgilerim</Link>
                        <Link href="/kayit-ol">Siparişlerim</Link>
                        <Link href="/kayit-ol">Favorilerim</Link>
                        <Link href="/kayit-ol">Çıkış Yap</Link>
                      </div>
                    </div>
                  </>
                  :
                  <>
                    <Link href="/siparis-detay">
                      <a className="header-action__item">
                        <Image src={heart} alt="" />
                        <p className="header-action__name">Sipariş Bilgileriniz</p>
                      </a>
                    </Link>
                    <div className="header-action__item dropdown">
                      <img src="https://instagram.fist6-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/250796617_652129065964642_5488018670421531944_n.jpg?_nc_ht=instagram.fist6-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=ZMFs5IhBCZ8AX8IOt6Q&edm=APU89FABAAAA&ccb=7-4&oh=e0da536f2fa5f8d3d108dac4152dd55c&oe=618D60D0&_nc_sid=86f79a" alt="" />
                      <p className="header-action__name">Giriş Yap</p>
                    </div>
                    <div className="header-action__dropdown">
                      <div className="header-action__dropdown--item">
                        <Link href="/giris-yap">Giriş Yap </Link>
                        <Link href="/kayit-ol">Üye Ol</Link>
                      </div>
                    </div>
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="custom-toggle">
        <div className="custom-toggle__wrp user-info">
          <h3 className="user-info__title mb-2">Merhaba Gamze.</h3>
          {!isOpenUserConfirm ?
            <>
              <p className="user-info__text">Aşağıdaki bilgiler sipariş verirken otomatik olarak kullanılacak bilgiler.</p> <br />
              <p className="user-info__text"> Bu yüzden bilgilerinizin doğru girildiğinden emin olmalısınız.</p>
            </>
            :
            <>
              <p className="user-info__text confirm">Sahte üyeliklere karşı önlem almak amacıyla sizden onay kodu almamız gerekiyor.</p> <br />
              <p className="user-info__text confirm">Onay kodu doğrulandıktan sonra sitemizde güvenle ve kolayca siparişlerinizi oluşturabilirsiniz.</p>
            </>
          }
          <div className="user-info__form mt-5">
            <Form onFinish={onFinish} autoComplete="off" form={form}>
              <div className="modal-form">
                <div className="d-flex justify-content-between">
                  <div className="modal-item">
                    <label>Kullanıcı Adınız</label>
                    <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}
                      shouldUpdate={(prevValues, curValues) => {
                        return prevValues?.username !== curValues?.username;
                      }}>
                      <Input placeholder="Kullanıcı Adınız" disabled={true} />
                    </Form.Item>
                  </div>
                  <div className="modal-item">
                    <label>Adınız Soyadınız</label>
                    <Form.Item name="nameSurname" rules={[{ required: true, message: 'Please input your password!' }]}
                      shouldUpdate={(prevValues, curValues) => {
                        return prevValues?.nameSurnmaae !== curValues?.nameSurname;
                      }}>
                      <Input autoFocus={true} />
                    </Form.Item>
                  </div>
                </div>
                <div className="modal-item w-100 mt-3">
                  <label>Cep Telefonu Numaranız (Whatsapp)</label>
                  <Form.Item name="phone" rules={[{ required: true, message: 'Please input your password!' }]}
                    shouldUpdate={(prevValues, curValues) => {
                      return prevValues?.phone !== curValues?.phone;
                    }}>
                    <Input className="textarea" />
                  </Form.Item>
                </div>
                <div className="modal-item w-100 mt-3">
                  <label>Siparişleriniz için Teslimat Adresi</label>
                  <Form.Item name="address" rules={[{ required: true, message: 'Please input your password!' }]}
                    shouldUpdate={(prevValues, curValues) => {
                      return prevValues?.address !== curValues?.address;
                    }}>
                    <Input.TextArea className="textarea" />
                  </Form.Item>
                </div>
                <div className="green-button secondary center-layout__button mx-0 w-100 mt-3">
                  <div className="d-flex align-items-center justify-content-center">
                    <button type="submit" className="ant-btn ant-btn-primary button-text ml-0 text-white">
                      <span>Bilgileri Kaydet</span>
                    </button>
                  </div>
                </div>
              </div>
            </Form>
            {isOpenUserConfirm &&
              <div className={`user-info__confirm ${isOpenUserConfirm ? "active" : ""}`}>
                <p className="user-info__confirm-text">0539 506 69 51 numaralı telefonunuza whatsapp üzerinden onay kodu gönderidik.
                  <br /> <br /> Gönderilen 5 haneli onay kodunu giriniz.</p>
                <input className="mt-1" type="text" placeholder="Onay kodu" autoFocus onChange={e => setConfirmInputValue(e.target.value)} />
                <div class="green-button mx-0 w-100 mt-3">
                  <div class="d-flex align-items-center justify-content-center" onClick={confirmUser}>
                    <button type="submit" class="ant-btn ant-btn-primary button-text ml-0 text-white">
                      <span>Üyeliğimi Onayla</span>
                    </button>
                  </div>
                </div>
              </div>
            }

          </div>
        </div>
      </div>

      <Categories categoryList={categoryList} />
    </>
  )
}

export default Header;
