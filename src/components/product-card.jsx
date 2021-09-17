import Image from 'next/image'
import React from 'react'
import whatsapp from '../assets/images/whatsapp.svg'
import heart from '../assets/images/heart.svg'
import Link from "next/link";

const ProductCard = ({ product, slide }) => {
  return (
    <div className={`product-card__cell ${slide ? "w-100 slide" : ""}`}>
      <div className="product-card__row">
        <div className="product-card__item">
          <Link href={`/${product.butik_slug}`}>
            <div className="product-card__butic">
              <img className="butiks-slider__logo" src={product.butik_image} alt="" />
            </div>
          </Link>
          <div className="product-card__image">
            <Link href="/kayit-ol">
              <div className="product-card__favorite">
                <Image src={heart} alt="Favorilere Ekle" />
              </div>
            </Link>
            <a href={`/${product.butik_slug}/${product.slug}`} className="product-card__image--link">
              <Link href={`/${product.butik_slug}/${product.slug}`}>
                <img src={product.image} />
              </Link>
            </a>
          </div>
        </div>
        <div className="product-card__info">
          <Link href="/productDetail">
            <h2 className="product-card__name">{product.title}</h2>
          </Link>
          <p className="product-card__price">{product.fiyat} ₺</p>
        </div>
        {/* <div className="button">
        <a href={product.link} className="d-flex align-items-center justify-content-center" target="_blank">
          <p className="button-text">İnstagramda Gör</p>
          <Image src={right} className="button-icon" />
        </a>
      </div> */}
        <a className="product-card__whatsapp d-block mt-2" target="_blank"
          href={"https://wa.me/+905395066951/?text=Merhaba. Ben butikmarketi.com'da gördüğüm bir ürününüz hakkında bilgi almak istiyorum. Ürünün linki şöyle:" + ' ' + product.link}>
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