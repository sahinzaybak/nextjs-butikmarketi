import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Link from "next/link";
import Image from 'next/image'
import logo from '../assets/images/logo-2.png'
import search from '../assets/images/search.svg'
import user from '../assets/images/log-in (1).svg'
import heart from '../assets/images/shopping-bag (2).svg'

import { fetchCategoryList } from '../store/actions/category'
import Categories from '../components/categories'

const Header = () => {
  const dispatch = useDispatch()
  let categoryList = useSelector(state => state.category.categoryList) //Dolan kategori listesini al.
  useEffect(() => {
    dispatch(fetchCategoryList()) //Kategori listesini doldurmak için action'a dispatch et.
  }, [])

  return (
    <>
      <div className="header d-flex align-items-center">
        <div className="custom-container">
          <div className="d-flex align-items-center justify-content-between">
            <a href="/" className="header-logo">
              <Image src={logo} alt="" />
            </a>
            <div className="header-search">
              <div className="d-flex align-items-center w-100 h-100">
                <div className="d-flex">
                  <Image src={search} alt="" />
                  <input type="text" placeholder="Ürün Ara.." />
                </div>
              </div>
            </div>
            <div className="header-action">
              <div className="d-flex">
                <Link href="/siparis-detay">
                  <a className="header-action__item">
                    <Image src={heart} alt="" />
                    <p className="header-action__name">Sipariş Bilgileriniz</p>
                  </a>
                </Link>
                <div className="header-action__item dropdown">
                  <Image src={user} alt="" />
                  <p className="header-action__name">Giriş Yap</p>
                </div>
                <div className="header-action__dropdown">
                  <div className="header-action__dropdown--item">
                    <Link href="/giris-yap">Giriş Yap</Link>
                    <Link href="/kayit-ol">Üye Ol</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Categories categoryList={categoryList} />
    </>
  )
}

export default Header;
