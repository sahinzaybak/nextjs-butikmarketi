import Image from 'next/image'
import React from 'react'
import shoes from '../assets/images/shoe.svg'

const Categories = ({ categoryList }) => {
  return (
    <div className="categories">
      <div className="custom-container">
        <div className="d-flex">
          {categoryList.map((category) =>
            <div href="/ayakkabi" className="categories-item">
              <Image src={category.image} alt={category.name} />
              <a href="" className="categories-name">{category.name}</a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Categories;