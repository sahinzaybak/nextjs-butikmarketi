import Link from "next/link";
import logo from '../../src/assets/images/logo-trans.png'
import Image from 'next/image'
const signIn = () => {
  return (
    <div className="center-layout header-none">
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
          <div className="center-layout__form">
            <div className="center-layout__item">
              <input type="text" placeholder="Adınız Soyadınız" className="center-layout__input" />
            </div>
            <div className="center-layout__item">
              <input type="text" placeholder="E-mail adresiniz" className="center-layout__input" />
            </div>
            <div className="center-layout__item">
              <input type="text" placeholder="Şifreniz" className="center-layout__input" />
            </div>
            <div className="center-layout__item">
              <input type="text" placeholder="Cep telefonu numaranız" className="center-layout__input" />
            </div>

            <div className="green-button secondary center-layout__button mx-0 w-100">
              <div className="d-flex align-items-center justify-content-center">
                <p className="button-text ml-0">Üye Ol</p>
              </div>
            </div>
            <Link href="/giris-yap">
              <p className="center-layout__form--desc mt-1"><u>Zaten üyeyim</u></p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default signIn;
