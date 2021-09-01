import Image from 'next/image'
import React from 'react'

const Categories = ({ categoryList }) => {
  return (
    <div className="categories">
      <div className="custom-container">
        <div className="d-flex">
          {categoryList.map((category, index) =>
            <div href={category.slug} className="categories-item" key={index}>
              {/* <Image src={category.image} alt={category.title} /> */}
              <img src={category.image} alt={category.title} />
              <a href="" className="categories-name">{category.title}</a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Categories;