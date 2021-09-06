import React from 'react'
import Link from "next/link";

const Categories = ({ categoryList }) => {
  return (
    <div className="categories">
      <div className="custom-container">
        <div className="d-flex">
          {categoryList.map((category, index) =>
            <Link href={category.slug} key={index}>
              <div className="categories-item">
                <img src={category.image} alt={category.title} />
                <span className="categories-name">{category.title}</span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Categories;