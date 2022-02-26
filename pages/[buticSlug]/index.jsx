//*** Butik Profil Sayfası

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Image from 'next/image'
import whatsapp from '../../src/assets/images/whatsapp.svg'
import instagram from '../../src/assets/images/instagram.svg'
import { pageIncreaseCount } from '../../src/helpers/pageIncreaseCounts'

//Component
import ProductCard from "../../src/components/product-card";

//Action
import { fetchButikProfileInfo } from '../../src/store/actions/butik'
import { fetchSelectedFavoritesProductIds } from "../../src/store/actions/products";

//Helpers
import { IsLoginIn } from '../../src/helpers/auth'

const ButicProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const buticSlug = router.query.buticSlug;
  const [load, setLoad] = useState(false);

  let butikProfileInfo = useSelector((state) => state.butik.butikProfileInfo); //Dolan "butik profil bilgisini" al.
  useEffect(() => {
    if (buticSlug != null) {
      dispatch(fetchButikProfileInfo(buticSlug)); //"Girilen butiğe ait butik profil bilgisini" doldurmak için action'a dispatch et.
      if (IsLoginIn())
        dispatch(fetchSelectedFavoritesProductIds());
    }
  }, [buticSlug]);

  useEffect(() => {
    if (load) pageIncreaseCount(butikProfileInfo.id, butikProfileInfo.attributes.clicks, "butiks", "clicks"); // Görüntülenme sayısı arttırma (Helpers)
  }, [butikProfileInfo]);

  useEffect(() => { //butikProfileInfo 2 kere servise gitmesi problem çözümü.
    setLoad(true)
  }, []);

  return (
    <div className="butic">
      {butikProfileInfo.attributes &&
        <div className="custom-container">
          <div className="butic-header d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <div className="butic-header__image">
                <img src={butikProfileInfo.attributes.butik_image} alt="" />
              </div>
              <div className="d-flex flex-column ml-3">
                <div className="d-flex align-items-center">
                  <p className="butic-header__title">{butikProfileInfo.attributes.butik_name}</p>
                  <p className="butic-header__point">{butikProfileInfo.attributes.butik_points}</p>
                </div>
                <div className="butic-header__info d-flex align-items-center">
                  <span className="mr-1">Butik Sahibi: </span>
                  {butikProfileInfo.attributes.owner != null ?
                    <p className="butic-header__owner">{butikProfileInfo.attributes.owner}</p> :
                    <p className="butic-header__owner">Belirtilmemiş</p>
                  }
                </div>
                <div className="butic-header__social d-flex align-items-center mt-1">
                  <div className="mr-2"><Image src={whatsapp} alt="Ürün hakkında soru sor" /></div>
                  <div> <Image src={instagram} alt="Ürün hakkında soru sor" /></div>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="butic-info">
                <div className="butic-info__item d-flex mb-2">
                  <span className="butic-info__title">Toplam sipariş sayısı: </span>
                  <p className="butic-info__count">{butikProfileInfo.attributes.butik_order_count}</p>
                </div>
                <div className="butic-info__item  d-flex mb-2">
                  <span className="butic-info__title">Sorunsuz sipariş sayısı: </span>
                  <p className="butic-info__count">{butikProfileInfo.attributes.butik_success_order_count}</p>
                </div>
                <div className="butic-info__item  d-flex">
                  <span className="butic-info__title">Toplam iade sayısı: </span>
                  <p className="butic-info__count">{butikProfileInfo.attributes.butik_refund_count}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="butic-products">
            <h1 className="category-title">Tüm ürünler</h1>
            <div className="row">
              {butikProfileInfo?.attributes.products?.data && butikProfileInfo?.attributes.products?.data.map((product, index) => (
                <ProductCard product={product.attributes} productId={product.id} key={index} />
              ))}
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default ButicProfile;