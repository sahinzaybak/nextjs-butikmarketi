import Image from 'next/image'
import whatsapp from '../../assets/images/whatsapp.svg'
const ProductInfoBottom = (() => {
  return (
    <>
      <div className="product-info__item color mt-3">
        <span className="product-info__title">Renk Seçenekleri</span>
        <div className="d-flex mt-1">
          <p className="product-info__desc color"></p>
          <p className="product-info__desc color"></p>
          <p className="product-info__desc color"></p>
          <p className="product-info__desc color"></p>
        </div>
      </div>
      <div className="product-info__item mt-3">
        <span className="product-info__title">Ürün Sahibi</span>
        <p className="product-info__desc mt-1">Bu ürün <u>Nişantaşı Shoes</u> tarafından gönderilecektir.</p>
      </div>
      <div className="product-info__action mt-4">
        <div className="green-button mx-0">
          <a href="#" className="d-flex align-items-center justify-content-center" target="_blank">
            <Image src={whatsapp} alt="Ürün hakkında soru sor" />
            <p className="button-text"> Ürün hakkında satıcıya soru sorun.</p>
          </a>
        </div>
      </div>
    </>
  );
});

export default ProductInfoBottom;
