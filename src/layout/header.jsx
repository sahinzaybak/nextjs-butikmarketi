import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import logo from '../assets/images/logo-2.png'

import { fetchCategoryList } from '../store/actions/category'
import Categories from '../components/categories'

const Header = () => {
  const dispatch = useDispatch()
  let categoryList = useSelector(state => state.category.categoryList) //Dolan kategori listesini al.
  useEffect(() => {
    dispatch(fetchCategoryList()) //Kategori listesini doldurmak için action'a istek gönder.

  }, [])
  return (
    <>
      <div className="header d-flex align-items-center">
        <div className="custom-container">
          <div className="d-flex align-items-center">
            <a href="/" className="header-logo">
              <Image src={logo} alt="" />
            </a>
            <div className="header-search">
              <div className="d-flex align-items-center w-100 h-100">
                <input type="text" placeholder="Ürün Ara.." />
              </div>
            </div>
            <div className="header-sign-up">
            </div>
          </div>
        </div>
      </div>
      <Categories categoryList={categoryList} />
    </>
  )
}

export default Header;
