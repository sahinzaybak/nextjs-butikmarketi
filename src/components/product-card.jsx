import Image from 'next/image'
import React from 'react'
import whatsapp from '../assets/images/whatsapp.svg'
import right from '../assets/images/right-arrow.svg'

const ProductCard = ({ product }) => {
  return (
    <div className="product-card__cell">
      <div className="product-card__item">
        <div className="product-card__butic">
          <img className="butiks-slider__logo" src={product.butik_image} alt="" />
        </div>
        <div className="product-card__image">
          <a href={product.link} target="_blank">
            <img src={product.image} />
          </a>
        </div>
      </div>
      <div className="product-card__info">
        <h2 className="product-card__name">{product.title}</h2>
        <p className="product-card__price">{product.fiyat} ₺</p>
      </div>

      <div className="button">
        <a href={product.link} className="d-flex align-items-center justify-content-center" target="_blank">
          <p className="button-text">Detaylı İncele</p>
          <Image src={right} className="button-icon" />
        </a>
      </div>

      <a className="product-card__whatsapp d-block mt-2" target="_blank"
        href={"https://wa.me/+905395066951/?text=Merhaba. Ben butikmarketi.com'da gördüğüm bir ürününüz hakkında bilgi almak istiyorum. Ürünün linki şöyle:" + ' ' + product.link}>
        <div className="d-flex align-items-center justify-content-center">
          <Image src={whatsapp} alt="Ürün hakkında soru sor" />
          <span>Ürün hakkında satıcıya soru sor</span>
        </div>
      </a>
    </div>
  )
}

export default ProductCard;