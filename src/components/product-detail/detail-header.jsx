import { useState, useEffect } from "react";
import Image from 'next/image'
import ship from '../../assets/images/shipped.svg'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const DetailHeader = () => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  return (
    <>
      <div className="detail-header d-flex align-items-center justify-content-between">
        <div className="custom-container">
          <div className="d-flex align-items-center justify-content-between">
            <div className="detail-header__logo d-flex">
              <div>
                <img src="https://webizade.com/bm/img/butik-3.jpg" alt="" />
              </div>
              <div className="d-block p-2">
                <div className="d-flex align-items-center">
                  <h5 className="detail-header__butic">Nişantaşı Shoes</h5>
                  <span className="detail-header__point">9.8</span>
                </div>
                <h3 className="detail-header__title">Starfish Dolgu taban terlik</h3>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <p className="detail-header__price">89.90 ₺</p>
              <div className="detail-header__action">
                <div className="green-button mx-0" onClick={onOpenModal}>
                  <div className="d-flex align-items-center justify-content-center">
                    <Image src={ship} alt="Ürün hakkında soru sor" />
                    <p className="button-text">Ürünü Kapıda Ödeme İle Sipariş Et</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal open={open} onClose={onCloseModal} center>
        <h2>Simple centered modal</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
          hendrerit risus, sed porttitor quam.
        </p>
      </Modal>
    </>
  );
};

export default DetailHeader;
