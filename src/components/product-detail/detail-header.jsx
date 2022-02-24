import { useState } from "react";
import Image from 'next/image'
import ship from '../../assets/images/shipped.svg'
import Link from "next/link";
import 'react-responsive-modal/styles.css';

//Modal Components
import OrderCreateModal from '../modals/orderCreate'
import OrderSuccessModal from '../modals/orderSuccess'
import InfoModal from '../modals/info'

const DetailHeader = ({ butikId, buticLogo, buticName, butikSlug, productId, productTitle, price, productColors, productPrice, productSize }) => {
  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const onOpenModalInfo = () => setOpenInfo(true);
  const onCloseModalSuccess = () => setOpenSuccess(false);
  const onCloseModalInfo = () => setOpenInfo(false);

  function closeCreateModal(childPropsValue) { //Child'dan veriyi aldık. (false) => Confirm Modal'dan gelen props ile Create Modal'ı kapat. 
    setOpen(childPropsValue)
  }

  function openSuccesModal(childPropsValue) { //Child'dan veriyi aldık. (true) => Confirm Modal'dan gelen props ile Success Modal'ı aç.
    setOpenSuccess(childPropsValue)
  }

  return (
    <>
      <div className="detail-header d-flex align-items-center justify-content-between">
        <div className="custom-container">
          <div className="d-flex align-items-center justify-content-between">
            <div className="detail-header__logo d-flex">
              <Link href={`/${butikSlug}`}>
                <img src={buticLogo} alt="" />
              </Link>
              <div className="d-block p-2">
                <div className="d-flex align-items-center">
                  <Link href={`/${butikSlug}`}>
                    <h5 className="detail-header__butic">{buticName}</h5>
                  </Link>
                  <span className="detail-header__point">9.8</span>
                </div>
                <h3 className="detail-header__title">{productTitle}</h3>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <p className="detail-header__price">{price} ₺</p>
              <div className="detail-header__action">
                <div className="position-relative">
                  <div className="green-button mx-0" onClick={onOpenModal}>
                    <div className="d-flex align-items-center justify-content-center">
                      <Image src={ship} alt="Ürün hakkında soru sor" />
                      <p className="button-text">Kapıda Ödeme İle Sipariş Oluştur</p>
                    </div>
                  </div>
                  <span className="detail-header__info" onClick={onOpenModalInfo}>Detaylı bilgi almak için tıklayın</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sipariş Ver, Sipariş Tamamlandı, ve Info Modal */}
      <OrderCreateModal
        open={open}
        onClose={onCloseModal}
        productColors={productColors}
        productPrice={productPrice}
        productId={productId}
        butikId={butikId}
        productSize={productSize}
        closeCreateModal={closeCreateModal} //Child Props => Yukarıda props değerini aldık. (false)
        openSuccesModal={openSuccesModal} //Child Props => Yukarıda props değerini aldık. (true)
      />

      <InfoModal
        open={openInfo}
        onClose={onCloseModalInfo} />

      <OrderSuccessModal
        open={openSuccess}
        onClose={onCloseModalSuccess}
        classNames={{ modal: 'modal-steps' }} />
    </>
  );
};

export default DetailHeader;
