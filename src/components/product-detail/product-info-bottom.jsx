import React from "react";
import Image from 'next/image'
import { Form } from 'antd';
import whatsapp from '../../assets/images/whatsapp.svg'
import { pageIncreaseCount } from '../../helpers/pageIncreaseCounts'

//Component
import DetailFilter from './detail-filter'

const ProductInfoBottom = ({ buticName, productColors, productSize, productLink, productId, productWhatsappClicksValues }) => {
  return (
    <>
      <Form autoComplete="off">
        <DetailFilter
          productSize={productSize}
          productColors={productColors}
        />
      </Form>
      <div className="product-info__item mt-3">
        <span className="product-info__title">Ürün Sahibi</span>
        <p className="product-info__desc mt-1">Bu ürün <u>{buticName}</u> tarafından gönderilecektir.</p>
      </div>
      <div className="product-info__action mt-4">
        <div className="green-button mx-0">
          <a className="d-flex align-items-center justify-content-center" target="_blank"
            href={"https://wa.me/+905395066951/?text=Merhaba. Ben butikmarketi.com'da gördüğüm bir ürününüz hakkında bilgi almak istiyorum. Ürünün linki şöyle:" + ' ' + productLink}
            onClick={() => pageIncreaseCount(productId, productWhatsappClicksValues, "products", "whatsappClicks")}>
            <div className="d-flex align-items-center justify-content-center">
              <Image src={whatsapp} alt="Ürün hakkında soru sor" />
              <span>Ürün için satıcıya soru sorun</span>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default ProductInfoBottom;
