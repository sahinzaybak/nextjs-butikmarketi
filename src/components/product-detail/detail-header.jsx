import { useState } from "react";
import Image from 'next/image'
import ship from '../../assets/images/shipped.svg'
import Link from "next/link";
import 'react-responsive-modal/styles.css';


const DetailHeader = (props) => {
  return (
    <>
      <div className="detail-header d-flex align-items-center justify-content-between">
        <div className="custom-container">
          <div className="d-flex align-items-center justify-content-between">
            <div className="detail-header__logo d-flex">
              <Link href={`/${props.butikSlug}`}>
                <img src={props.buticLogo} alt="" />
              </Link>
              <div className="d-block p-2">
                <div className="d-flex align-items-center">
                  <Link href={`/${props.butikSlug}`}>
                    <h5 className="detail-header__butic">{props.buticName}</h5>
                  </Link>
                  <span className="detail-header__point">9.8</span>
                </div>
                <h3 className="detail-header__title">{props.productTitle}</h3>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <p className="detail-header__price">{props.price} ₺</p>
              <div className="detail-header__action">
                <div className="position-relative">
                  <div className="green-button mx-0" onClick={() => props.onOpenModal()}>
                    <div className="d-flex align-items-center justify-content-center">
                      <Image src={ship} alt="Ürün hakkında soru sor" />
                      <p className="button-text">Kapıda Ödeme İle Sipariş Oluştur</p>
                    </div>
                  </div>
                  <span className="detail-header__info" onClick={() => props.onOpenModalInfo()}>Detaylı bilgi almak için tıklayın</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailHeader;
