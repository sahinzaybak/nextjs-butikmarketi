import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from "next/router";

//actions
import { fetchOrderDetailInfo } from '../../src/store/actions/orders'

let orderDetailInfo
const orderConfirm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const orderNumber = router.query.orderNumber;

  orderDetailInfo = useSelector((state) => state.orders.orderDetailInfo); //Dolan "butik profil bilgisini" al.
  console.log(orderDetailInfo)
  useEffect(() => {
    if (orderNumber)
      dispatch(fetchOrderDetailInfo(orderNumber)) //sipariş detaylarını getir.
  }, [orderNumber])

  return (
    <>
      {orderDetailInfo.products &&
        <div className="order-detail mt-4">
          <div className="custom-container">
            <div className="category-title__wrp">
              <h1 className="category-title">{orderNumber} numaralı SİPARİŞ BİLGİLERİ</h1>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="order-detail__left">
                  <div className="order-detail__butic">
                    <div className="d-flex">
                      <div className="order-detail__butic-logo mr-2">
                        <img src={orderDetailInfo.products.data[0].attributes.butiks.data[0].attributes.butik_image} alt="" />
                      </div>
                      <div className="order-detail__butic-info mt-1">
                        <h6>{orderDetailInfo.products.data[0].attributes.butiks.data[0].attributes.butik_name}</h6>
                        <a href="">{orderDetailInfo.products.data[0].attributes.butiks.data[0].attributes.butik_whatsapp}</a>
                      </div>
                    </div>
                  </div>
                  <div className="order-detail__user">
                    <div className="order-detail__user-item">
                      <p>Siparişi Veren</p>
                      <span>{orderDetailInfo.nameSurname}</span>
                    </div>
                    <div className="order-detail__user-item">
                      <p>Sipariş Tarihi</p>
                      <span>{orderDetailInfo.orderDate}</span>
                    </div>
                    <div className="order-detail__user-item">
                      <p>İletişim Numarası</p>
                      <span>{orderDetailInfo.phone}</span>
                    </div>
                    <div className="order-detail__user-item">
                      <p>Teslimat Adresi</p>
                      <span>{orderDetailInfo.address}</span>
                    </div>
                    <div className="order-detail__user-item">
                      <p>Sipariş Açıklaması</p>
                      <span>{orderDetailInfo.description}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div className="order-detail__status cargo">
                  <p>Ürününüz xbutik tarafından kargoya verildi.</p>
                  <a>Kargo Takibi</a>
                </div>
                <div className="order-detail__product">
                  <div className="d-flex">
                    <div className="order-detail__product-image mr-3">
                      <img src={orderDetailInfo.products.data[0].attributes.image} alt="" />
                    </div>
                    <div className="order-detail__product-info">
                      <h2 className="order-detail__product-name">{orderDetailInfo.products.data[0].attributes.title}</h2>
                      <p className="order-detail__product-price">{orderDetailInfo.products.data[0].attributes.price} ₺</p>
                      <div className="order-detail__list">
                        <div className="order-detail__list-item">
                          <p>Seçtiğiniz Beden:</p>
                          <span>{orderDetailInfo.size} </span>
                        </div>
                        <div className="order-detail__list-item">
                          <p>Seçtiğiniz Renk:</p>
                          <span>{orderDetailInfo.color} </span>
                        </div>
                      </div>
                      <div className="order-detail__list">
                        <div className="order-detail__list-item">
                          <p>Seçtiğiniz Adedi:</p>
                          <span>{orderDetailInfo.count} </span>
                        </div>
                        <div className="order-detail__list-item">
                          <p> Toplam Fiyat:</p>
                          <span>{orderDetailInfo.totalPrice} ₺ </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default orderConfirm;
