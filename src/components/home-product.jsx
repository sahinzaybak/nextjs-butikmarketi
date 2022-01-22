import Image from 'next/image'
import Link from "next/link";
import React from 'react'
import ProductCard from '../components/product-card'
import rightArrow from '../assets/images/right-arrow-big.svg'

const HomeProducts = ({ productList }) => {
  return (
    <div className="product-card">
      <div className="custom-container">
        <div className="category-title__wrp">
          <h1 className="category-title">{productList.title}</h1>
          <Link href={`kategori/${productList.slug}`} className="d-flex align-items-center justify-content-center">
            <a className="d-flex align-items-center">
              <p className="more-button__text">TÜM {productList.title} ÜRÜNLERİ </p>
              <Image src={rightArrow} width={20} className="button-icon" />
            </a>
          </Link>
        </div>
        <div className="product-card__wrp">
          <div className="row">
            {productList.products.data.map((product, index) => (
              <ProductCard product={product.attributes} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeProducts;