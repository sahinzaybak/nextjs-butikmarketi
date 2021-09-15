
import Image from 'next/image'
import heart from '../../src/assets/images/shopping-bag (2).svg'
import tick from '../../src/assets/images/tick.svg'

const orderDetailMain = () => {
  return (
    <div className="order-detail">
      <div className="custom-container">
        <div className="order-detail__wrp">
          <div className="order-detail__top d-flex align-items-center justify-content-center">
            <Image src={heart} alt="" />
            <h2 className="order-detail__title ml-2">Sipariş Bilgileriniz</h2>
          </div>
          <p className="order-detail__desc mb-4 mt-1">Vermiş olduğunuz siparişin detaylarını <br /> <u>sipariş numaranızı</u> girerek öğrenebilirsiniz.</p>
          <input type="text" placeholder="Sipariş Numaranızı Giriniz" className="order-detail__input" />
          <div className="green-button order-detail__button mx-0 w-100 mt-2">
            <div className="d-flex align-items-center justify-content-center">
              <Image src={tick} alt="Ürün hakkında soru sor" />
              <p className="button-text">SİPARİŞ BİLGİLERİMİ GETİR</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default orderDetailMain;
