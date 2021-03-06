import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import React from 'react'
import whatsapp from '../assets/images/whatsapp.svg'
import Link from "next/link";
import { pageIncreaseCount } from '../helpers/pageIncreaseCounts'
import { RiHeart3Line } from "react-icons/ri";

//Actions
import { fetchAddFavorite } from '../store/actions/products'

//helpers
import { loginUserInfo, IsLoginIn } from '../helpers/auth'

let userInfo;
const ProductCard = ({ product, productId, slide }) => {
  const [isActive, setActive] = useState(false);
  const dispatch = useDispatch();

  let selectedFavoritiesProductIds = useSelector((state) => state.products.selectedFavoritesProductIds); //Dolan "seçili favori ıd'lerini" al.

  useEffect(() => {
    if (selectedFavoritiesProductIds != null) {
      const isSelectedFavoriteProduct = selectedFavoritiesProductIds.some(x => x == productId) //seçili favori ürünlerini bul.
      if (isSelectedFavoriteProduct) //seçili favori ürünleri var ise
        setActive(true) // onların favorilere ekli olarak işaretle => kırmızı kalp style
    }
  }, [selectedFavoritiesProductIds]);

   useEffect(() => {
    setActive(false) //sayfaya gelindiğinde önce bi tüm active'leri temizle.
  }, []);

  function addFavorite() {
    setActive(!isActive);
    userInfo = loginUserInfo()
    dispatch(fetchAddFavorite(productId, userInfo.id)) //Favorilere Ekle
  }

  return (
    <div className={`product-card__cell ${slide ? "w-100 slide" : ""}`}>
      <div className="product-card__row">
        <div className="product-card__item">
          <Link href={`/${product.butiks?.data[0]?.attributes.butik_slug}`}>
            <div className="product-card__butic">
              <a href={`/${product.butiks?.data[0]?.attributes.butik_slug}`} className="d-flex h-100">
                <img className="product-card__butic-logo" src={product.butiks?.data[0]?.attributes.butik_image} alt={product.butiks?.data[0]?.attributes.butik_name} />
              </a>
            </div>
          </Link>
          <div className="product-card__image">
            {IsLoginIn() &&
            <div className={`product-card__favorite ${isActive ? "active" : ""}`} onClick={() => addFavorite()}>
              <div className="product-card__favorite-icon">
                <RiHeart3Line />
              </div>
            </div>
            }
            <Link href={`/${product.butiks?.data[0]?.attributes.butik_slug}/${product.slug}`}>
              <a href={`/${product.butiks?.data[0]?.attributes.butik_slug}/${product.slug}`} className="product-card__image--link d-flex h-100">
                <img src={product.image} alt={product.title} />
              </a>
            </Link>
          </div>
        </div>
        <div className="product-card__info">
          <Link href="/productDetail">
            <h2 className="product-card__name">{product.title}</h2>
          </Link>
          <p className="product-card__price">{product.price} ₺</p>
        </div>
        {/* <div className="button">
        <a href={product.link} className="d-flex align-items-center justify-content-center" target="_blank">
          <p className="button-text">İnstagramda Gör</p>
          <Image src={right} className="button-icon" />
        </a>
      </div> */}
        <a className="product-card__whatsapp d-block mt-2" target="_blank"
          href={"https://wa.me/+905395066951/?text=Merhaba. Ben butikmarketi.com'da gördüğüm bir ürününüz hakkında bilgi almak istiyorum. Ürünün linki şöyle:" + ' ' + product.link}
          onClick={() => pageIncreaseCount(productId, product.whatsappClicks, "products", "whatsappClicks")}>
          <div className="d-flex align-items-center justify-content-center">
            <Image src={whatsapp} alt="Ürün hakkında soru sor" />
            <span>Ürün için satıcıya soru sorun</span>
          </div>
        </a>
      </div>
    </div>
  )
}

export default ProductCard;