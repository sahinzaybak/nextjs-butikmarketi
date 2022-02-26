import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import { Form } from 'antd';
import whatsapp from '../../assets/images/whatsapp.svg'
import { pageIncreaseCount } from '../../helpers/pageIncreaseCounts'
import ship from '../../assets/images/shipped.svg'
import { RiHeart3Line, RiWhatsappFill } from "react-icons/ri";

//Component
import DetailFilter from './detail-filter'
import { fetchAddFavorite } from '../../store/actions/products'

const ProductInfoBottom = (props) => {
  const dispatch = useDispatch();
  const [isActiveFavorite, setActiveFavorite] = useState(false);

  //Favorilere Ekle
  let userInfo = useSelector(state => state.auth.authInfo)
  function addFavorite() {
    setActiveFavorite(!isActiveFavorite);
    dispatch(fetchAddFavorite(props.productId, userInfo.id))
  }

  //Ürün favoriye ekliyse favori iconunu seçili hale getir.
  let selectedFavoritiesProductIds = useSelector((state) => state.products.selectedFavoritesProductIds); //Dolan "seçili favori ıd'lerini" al.
  useEffect(() => {
    if (selectedFavoritiesProductIds != null) {
      const isSelectedFavoriteProduct = selectedFavoritiesProductIds.some(x => x == props.productId) //seçili favori ürünlerini bul.
      if (isSelectedFavoriteProduct) //seçili favori ürünleri var ise,
        setActiveFavorite(true) // onları favorilere ekli olarak işaretle => kırmızı kalp style
    }
  }, [selectedFavoritiesProductIds]);

  return (
    <>
      <Form autoComplete="off">
        <DetailFilter
          productSize={props.productSize}
          productColors={props.productColors}
        />
      </Form>
      <div className="product-info__item mt-3 d-none">
        <span className="product-info__title">Ürün Sahibi</span>
        <p className="product-info__desc mt-1">Bu ürün <u>{props.buticName}</u> tarafından gönderilecektir.</p>
      </div>
      <div className="product-info__action mt-4 d-none">
        <div className="green-button mx-0">
          <a className="d-flex align-items-center justify-content-center" target="_blank"
            href={"https://wa.me/+905395066951/?text=Merhaba. Ben butikmarketi.com'da gördüğüm bir ürününüz hakkında bilgi almak istiyorum. Ürünün linki şöyle:" + ' ' + props.productLink}
            onClick={() => pageIncreaseCount(props.productId, props.productWhatsappClicksValues, "products", "whatsappClicks")}>
            <div className="d-flex align-items-center justify-content-center">
              <Image src={whatsapp} alt="Ürün hakkında soru sor" />
              <span>Ürün için satıcıya soru sorun</span>
            </div>
          </a>
        </div>
      </div>

      <div className="position-relative max-content mt-4 d-flex align-items-center">
        <div className="green-button mx-0" onClick={() => props.onOpenModal()}>
          <div className="d-flex align-items-center justify-content-center">
            <Image src={ship} alt="Ürün hakkında soru sor" />
            <p className="button-text">Kapıda Ödeme İle Sipariş Oluştur</p>
          </div>
        </div>
        {props.isLoginIn &&
          <div className={`product-info__action favorite ml-3 ${isActiveFavorite ? "active" : ""}`} onClick={() => addFavorite()}>
            <RiHeart3Line />
          </div>
        }
        <div className="product-info__action whatsapp wp ml-2">
          <RiWhatsappFill />
        </div>
        {/* <span className="detail-header__info" onClick={onOpenModalInfo}>Detaylı bilgi almak için tıklayın</span> */}
      </div>
    </>
  );
};

export default ProductInfoBottom;
