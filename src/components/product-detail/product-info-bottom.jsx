import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import { Form } from 'antd';
import whatsapp from '../../assets/images/whatsapp.svg'
import { pageIncreaseCount } from '../../helpers/pageIncreaseCounts'
import ship from '../../assets/images/shipped.svg'
import { RiHeart3Line,RiWhatsappFill } from "react-icons/ri";

//Component
import DetailFilter from './detail-filter'

//Modal Components
import OrderCreateModal from '../modals/orderCreate'
import OrderSuccessModal from '../modals/orderSuccess'
import InfoModal from '../modals/info'
import { fetchAddFavorite } from '../../store/actions/products'

const ProductInfoBottom = ({ butikId, buticName, productColors, productSize, productLink, productPrice, productId, productWhatsappClicksValues }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [isActiveFavorite, setActiveFavorite] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const onCloseModalSuccess = () => setOpenSuccess(false);
  const onCloseModalInfo = () => setOpenInfo(false);

  function closeCreateModal(childPropsValue) { //Child'dan veriyi aldık. (false) => Confirm Modal'dan gelen props ile Create Modal'ı kapat. 
    setOpen(childPropsValue)
  }

  function openSuccesModal(childPropsValue) { //Child'dan veriyi aldık. (true) => Confirm Modal'dan gelen props ile Success Modal'ı aç.
    setOpenSuccess(childPropsValue)
  }

   //Favorilere Ekle
  let userInfo = useSelector(state => state.auth.authInfo)
  function addFavorite() { 
    setActiveFavorite(!isActiveFavorite);
    dispatch(fetchAddFavorite(productId, userInfo.id))
  }

  //Ürün favoriye ekliyse favori iconunu seçili hale getir.
  let selectedFavoritiesProductIds = useSelector((state) => state.products.selectedFavoritesProductIds); //Dolan "seçili favori ıd'lerini" al.
  useEffect(() => {
    if (selectedFavoritiesProductIds != null) {
      const isSelectedFavoriteProduct = selectedFavoritiesProductIds.some(x => x == productId) //seçili favori ürünlerini bul.
      if (isSelectedFavoriteProduct) //seçili favori ürünleri var ise,
        setActiveFavorite(true) // onları favorilere ekli olarak işaretle => kırmızı kalp style
    }
  }, [selectedFavoritiesProductIds]);

  return (
    <>
      <Form autoComplete="off">
        <DetailFilter
          productSize={productSize}
          productColors={productColors}
        />
      </Form>
      <div className="product-info__item mt-3 d-none">
        <span className="product-info__title">Ürün Sahibi</span>
        <p className="product-info__desc mt-1">Bu ürün <u>{buticName}</u> tarafından gönderilecektir.</p>
      </div>
      <div className="product-info__action mt-4 d-none">
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

      <div className="position-relative max-content mt-4 d-flex align-items-center">
        <div className="green-button mx-0" onClick={onOpenModal}>
          <div className="d-flex align-items-center justify-content-center">
            <Image src={ship} alt="Ürün hakkında soru sor" />
            <p className="button-text">Kapıda Ödeme İle Sipariş Oluştur</p>
          </div>
        </div>
        <div className={`product-info__action favorite ml-3 ${isActiveFavorite ? "active" : ""}`} onClick={() => addFavorite()}>
          <RiHeart3Line />
        </div>
        <div className="product-info__action whatsapp wp ml-2">
          <RiWhatsappFill />
        </div>
        {/* <span className="detail-header__info" onClick={onOpenModalInfo}>Detaylı bilgi almak için tıklayın</span> */}
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

export default ProductInfoBottom;
