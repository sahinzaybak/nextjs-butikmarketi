//*** Butik Profil Sayfası

import {useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Image from 'next/image'
import whatsapp from '../../src/assets/images/whatsapp.svg'
import instagram from '../../src/assets/images/instagram.svg'

//Component
import ProductCard from "../../src/components/product-card";
//Action
import { fetchButikProfileInfo } from '../../src/store/actions/butik'

const ButicProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const buticSlug = router.query.buticSlug;

  let butikProfileInfo = useSelector((state) => state.butik.butikProfileInfo); //Dolan "butik profil bilgisini" al.
  useEffect(() => {
    if (buticSlug != null)
      dispatch(fetchButikProfileInfo(buticSlug)); //"Girilen butiğe ait butik profil bilgisini" doldurmak için action'a dispatch et.
  }, [buticSlug]);

  return (
    <div className="butic">
      <div className="custom-container">
        <div className="butic-header d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <div className="butic-header__image">
              <img src={butikProfileInfo.butik_image} alt="" />
            </div>
            <div className="d-flex flex-column ml-3">
              <div className="d-flex align-items-center">
                <p className="butic-header__title">{butikProfileInfo.butik}</p>
                <p className="butic-header__point">{butikProfileInfo.butik_points}</p>
              </div>
              <div className="butic-header__social d-flex align-items-center">
                <div className="mr-2"><Image src={whatsapp} alt="Ürün hakkında soru sor" /></div>
                <div> <Image src={instagram} alt="Ürün hakkında soru sor" /></div>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <div className="butic-info">
              <div className="butic-info__item d-flex mb-2">
                <span className="butic-info__title">Toplam sipariş sayısı: </span>
                <p className="butic-info__count">{butikProfileInfo.butik_order_count}</p>
              </div>
              <div className="butic-info__item  d-flex mb-2">
                <span className="butic-info__title">Sorunsuz sipariş sayısı: </span>
                <p className="butic-info__count">{butikProfileInfo.butik_success_order_count}</p>
              </div>
              <div className="butic-info__item  d-flex">
                <span className="butic-info__title">Toplam iade sayısı: </span>
                <p className="butic-info__count">{butikProfileInfo.butik_refund_count}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="butic-products">
          <h1 className="category-title">Tüm ürünler</h1>
          <div className="row">
            {butikProfileInfo.products && butikProfileInfo.products.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ButicProfile;