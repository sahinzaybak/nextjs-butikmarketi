import { useState, useEffect } from "react";
import Image from 'next/image'
import React from 'react'
import whatsapp from '../assets/images/whatsapp.svg'
import heart from '../assets/images/heart.svg'
import Link from "next/link";
import { pageIncreaseCount } from '../helpers/pageIncreaseCounts'

const ProductCard = ({ product, productId, slide }) => {
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
            <Link href="/kayit-ol">
              <div className="product-card__favorite">
                <Image src={heart} alt="Favorilere Ekle" />
              </div>
            </Link>
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
         onClick={() =>  pageIncreaseCount(productId, product.whatsappClicks, "products", "whatsappClicks")}>
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