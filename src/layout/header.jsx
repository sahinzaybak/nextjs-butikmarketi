import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Link from "next/link";
import Image from 'next/image'
import logo from '../assets/images/logo-2.png'
import search from '../assets/images/search.svg'
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
                  <img src="https://instagram.fist6-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/250796617_652129065964642_5488018670421531944_n.jpg?_nc_ht=instagram.fist6-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=ZMFs5IhBCZ8AX8IOt6Q&edm=APU89FABAAAA&ccb=7-4&oh=e0da536f2fa5f8d3d108dac4152dd55c&oe=618D60D0&_nc_sid=86f79a" alt="" />
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
