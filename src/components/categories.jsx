import React from 'react'
import Link from "next/link";

const Categories = ({ categoryList }) => {
  return (
    <div className="categories">
      <div className="custom-container">
        <div className="categories-main d-flex justify-content-between">
          {categoryList.map((category, index) =>
            <div className="categories-wrp" key={index}>
              <Link href={`../kategori/${category.slug}`}>
                <div className="categories-item">
                  <span className="categories-name">{category.title}</span>
                </div>
              </Link>
              <div className="categories-sub d-flex justify-content-between">
                {category.categories.map((categories, index) =>
                  <div className="categories-sub__item" key={index}>
                    <Link href={`../kategori/${categories.slug}`}>{categories.title}</Link>
                    <div className="categories-sub__inner">
                      {categories.categories.map((categories_sub, index) =>
                        <Link href={`../kategori/${categories_sub.slug}`} key={index}>{categories_sub.title}</Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Categories;