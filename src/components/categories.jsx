import Image from 'next/image'
import React from 'react'
import shoes from '../assets/images/shoe.svg'
import jeans from '../assets/images/jeans.svg'
import bag from '../assets/images/bag.svg'
import dress from '../assets/images/dress.svg'
import blouse from '../assets/images/blouse.svg'
import accessory from '../assets/images/accessory.svg'
import tshirt from '../assets/images/tshirt.svg'
import shirt from '../assets/images/shirt.svg'
import underwear from '../assets/images/underwear.svg'
import sweatshirt from '../assets/images/sweatshirt.svg'
import short from '../assets/images/shorts.svg'
import jacket from '../assets/images/jacket.svg'
import cosmetic from '../assets/images/cosmetic.svg'

const Categories = ({categoryList}) => {
  return (
    <div className="categories">
      <div className="custom-container">
        <div className="d-flex">
          <div href="/ayakkabi" className="categories-item">
            <Image src={shoes} alt="" />
            <a href="" className="categories-name">Ayakkabı</a>
          </div>
          <div href="/pantalon" className="categories-item">
            <Image src={jeans} alt="" />
            <a href="" className="categories-name">Pantalon</a>
          </div>
          <div href="/canta" className="categories-item">
            <Image src={bag} alt="" />
            <a href="" className="categories-name">Çanta</a>
          </div>
          <div className="categories-item">
            <Image src={dress} alt="" />
            <a href="" className="categories-name">Elbise</a>
          </div>
          <div className="categories-item">
            <Image src={blouse} alt="" />
            <a href="" className="categories-name">Bluz</a>
          </div>
          <div className="categories-item">
            <Image src={accessory} alt="" />
            <a href="" className="categories-name">Aksesuar</a>
          </div>
        
          <div className="categories-item">
            <Image src={tshirt} alt="" />
            <a href="" className="categories-name">T-shirt</a>
          </div>
          <div className="categories-item">
            <Image src={shirt} alt="" />
            <a href="" className="categories-name">Gömlek</a>
          </div>
          <div className="categories-item">
            <Image src={underwear} alt="" />
            <a href="" className="categories-name">İç Giyim</a>
          </div>
          <div className="categories-item">
            <Image src={sweatshirt} alt="" />
            <a href="" className="categories-name">Eşofman</a>
          </div>
          <div className="categories-item">
            <Image src={short} alt="" />
            <a href="" className="categories-name">Şort</a>
          </div>
          <div className="categories-item">
            <Image src={jacket} alt="" />
            <a href="" className="categories-name">Ceket</a>
          </div>
          <div className="categories-item">
            <Image src={cosmetic} alt="" />
            <a href="" className="categories-name">Kozmetik</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Categories;