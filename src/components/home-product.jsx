import Image from 'next/image'
import Link from "next/link";
import React from 'react'
import ProductCard from '../components/product-card'
import rightArrow from '../assets/images/right-arrow-big.svg'

const HomeProducts = ({ productList }) => {
  return (
    <div className="product-item">
      <div className="custom-container">
        <h1 className="category-title">{productList.title}</h1>
        <div className="product-item__wrp d-flex">
          <div className="row">
            {productList.products.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
        </div>
        <div className="more-button">
          <Link href={`kategori/${productList.slug}`} className="d-flex align-items-center justify-content-center">
            <a className="d-flex">
              <p className="more-button__text">TÜM {productList.title} ÜRÜNLERİ </p>
              <Image src={rightArrow} className="button-icon" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomeProducts;