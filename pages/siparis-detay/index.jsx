const orderDetailMain = () => {
  return (
    <div className="center-layout">
      <div className="custom-container">
        <div className="center-layout__wrp">
          <div className="center-layout__top d-flex align-items-center justify-content-center">
            <h2 className="center-layout__title ml-2">Sipariş Bilgileriniz</h2>
          </div>
          <p className="center-layout__desc mb-4 mt-2">Vermiş olduğunuz siparişin detaylarını <br /> <u>sipariş numaranızı</u> girerek görebilirsiniz.</p>
          <input type="text" placeholder="Sipariş Numaranızı Giriniz" className="center-layout__input text-center" />
          <div className="green-button secondary center-layout__button mx-0 w-100 mt-3">
            <div className="d-flex align-items-center justify-content-center">
              <p className="button-text">Bilgileri Getir</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default orderDetailMain;
