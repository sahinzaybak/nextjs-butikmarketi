import { useState } from "react";
import Image from 'next/image'
import ship from '../../assets/images/shipped.svg'
import received from '../../assets/images/order.svg'
import info from '../../assets/images/information.svg'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const DetailHeader = ({ buticLogo, buticName, productTitle, price }) => {
  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const onOpenModalInfo = () => setOpenInfo(true);
  const onCloseModalInfo = () => setOpenInfo(false);
  return (
    <>
      <div className="detail-header d-flex align-items-center justify-content-between">
        <div className="custom-container">
          <div className="d-flex align-items-center justify-content-between">
            <div className="detail-header__logo d-flex">
              <div>
                <img src={buticLogo} alt="" />
              </div>
              <div className="d-block p-2">
                <div className="d-flex align-items-center">
                  <h5 className="detail-header__butic">{buticName}</h5>
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
      <Modal open={open} onClose={onCloseModal} center>
        <div className="d-flex modal-wrp pb-1">
          <Image src={ship} alt="Ürün hakkında soru sor" />
          <h3 className="modal-title ml-3">Sipariş Oluştur</h3>
        </div>
        <div className="modal-form mt-4">
          <div className="d-flex justify-content-between">
            <div className="modal-item">
              <input type="text" placeholder="Adınız Soyadınız" />
            </div>
            <div className="modal-item">
              <input type="text" placeholder="Cep Tel Numaranız (Whatsapp)" />
            </div>
          </div>
          <div className="modal-item w-100 mt-3">
            <textarea placeholder="Ürünün gönderileceği adres" />
          </div>
          <div className="modal-item w-100 mt-3">
            <textarea placeholder="Açıklama (İstediğiniz beden, renk..vs)" />
          </div>
          <div className="green-button d-flex align-items-center mt-3 ml-auto">
            <Image src={received} alt="Ürün hakkında soru sor" />
            <p>Ürünü sipariş et</p>
          </div>
        </div>
      </Modal>

      <Modal open={openInfo} onClose={onCloseModalInfo} center>
        <div className="d-flex modal-wrp pb-1">
          <Image src={info} alt="Ürün hakkında soru sor" />
          <h3 className="modal-title ml-3">ButikMarketi genel sipariş detayları</h3>
        </div>
        <div className="modal-form modal-info mt-4">
          <p>Siparişleriniz <u>ürün sahibi butik</u> tarafından adresinize gönderilir.</p>
          <p>Siparişlerinizi <u>kapıda ödeme kolaylığı</u> ile satın alabilirsiniz. </p>
          <p>Ürün teslimi sonrası gelen ürünü <u>geri iade</u> veya <u>ürün değişimi</u> yapabilirsiniz. </p>
          <p>Siparişinizi oluşturduktan sonra, ürününüzün takibi<u>(kargo süreci, ürünün size teslimi, sipariş sonrası doğru ürün kontrolü)</u> <u>tamamen bizim kontrolümüzde</u> olup, whatsapp üzerinden bilgilendirileceksiniz. </p>
          <p>Size teslim edilen ürün ile resimde beğenip, sipariş verdiğiniz ürün birbirinden <u>tamamen</u> farklı ise, ücretiniz <u>bizim tarafımızdan</u> eft ile hemen <u>iade edilip</u>, o butiğin üyeliği <u>anında iptal edilir.</u> </p>
          <p>Sitemize kayıtlı herhangi bir butiğin, bizim sitemiz dışındaki ürünlerini satın alırsanız, oluşabilecek olumsuzluklardan <u>biz sorumlu değiliz.</u></p>
        </div>
      </Modal>
    </>
  );
};

export default DetailHeader;
