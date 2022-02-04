//Sipariş Detayları

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from "next/router";
import { LoadingOutlined, DoubleRightOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

//actions
import { fetchOrderDetailInfo, fetchOrderCancel, fetchCargoInfo } from '../../src/store/actions/orders'

//Modal Components
import OrderCancel from '../../src/components/modals/order-detail/order-cancel'
import CargoTracking from '../../src/components/modals/order-detail/cargo-tracking'

let orderDetailInfo;
let cargoInfo;
const orderConfirm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const orderNumber = router.query.orderNumber;
  const [orderCancelInfoText, setOrderCancelInfoText] = useState(false); //Sipariş iptal ettiğinde sipariş iptal yazısını görelim.

  orderDetailInfo = useSelector((state) => state.orders.orderDetailInfo); //Dolan "sipariş detay bilgilerini" al.
  cargoInfo = useSelector((state) => state.orders.cargoInfo); //Dolan "kargo bilgilerini al"

  useEffect(() => {
    if (orderNumber) dispatch(fetchOrderDetailInfo(orderNumber)) //sipariş detaylarını getir.
  }, [orderNumber])

  useEffect(() => {
    if (orderDetailInfo.attributes != null && orderDetailInfo.attributes.cargoNo != "") dispatch(fetchCargoInfo()) //Kargo bilgilerini getir.
  }, [orderDetailInfo])

  //Modal işlemleri
  const [openOrderCancel, setOpenOrderCancel] = useState(false);
  const [openCargoTracking, setOpenCargoTracking] = useState(false);

  function orderDoingCancel() { //Evet, sipraişimi iptal etmek istiyorum
    dispatch(fetchOrderCancel(orderDetailInfo.id)) //Sipariş iptal => isOrderCancel = false
    setOrderCancelInfoText(true) //Sipariş iptal ettiğinde sipariş iptal yazısını görelim.
  }

  return (
    <>
      {orderDetailInfo.attributes &&
        <div className="order-detail mt-4">
          <div className="custom-container">
            {orderDetailInfo.attributes.status ?
              <>
                <div className="category-title__wrp mb-4">
                  <h1 className="category-title">{orderNumber} numaralı SİPARİŞ BİLGİLERİ</h1>
                </div>
                {orderDetailInfo.attributes.cargoNo == "" ?
                  <>
                    {orderCancelInfoText || orderDetailInfo.attributes.isOrderCancel ?
                      <div className="order-detail__status cancel">
                        <div className="d-flex align-items-center">
                          <CloseOutlined style={{ fontSize: '20px' }} />
                          <p className="ml-3">Siparişiniz iptal edilmiştir.</p>
                        </div>
                      </div>
                      :
                      <div className="order-detail__status prepare">
                        <div className="d-flex align-items-center">
                          <LoadingOutlined style={{ fontSize: '20px' }} />
                          <p className="ml-3">Ürününüz xbutik tarafından kargoya verilmek üzere hazırlanıyor...</p>
                        </div>
                        <a onClick={() => setOpenOrderCancel(true)}>Siparişi İptal Et</a>
                        {openOrderCancel &&
                          <OrderCancel
                            open={openOrderCancel}
                            onClose={() => setOpenOrderCancel(false)}
                            showCloseIcon={false}
                            classNames={{ modal: 'modal-steps' }}
                            onClickSuccess={() => {
                              orderDoingCancel()
                              setOpenOrderCancel(false)
                            }}
                            onClickBack={() => setOpenOrderCancel(false)}
                          />
                        }
                      </div>
                    }
                  </>
                  :
                  <>
                    {cargoInfo.statusDescription == "Teslim Edildi" || cargoInfo.statusDescription == "TESLİM EDİLDİ" ?
                      <div className="order-detail__status success">
                        <div className="d-flex align-items-center">
                          <CheckOutlined style={{ fontSize: '20px' }} />
                          <p className="ml-2">Ürününüz teslim edildi. Teslim tarihi: 17.03.2022</p>
                        </div>
                        <div className="d-flex">
                          <a>Değişim Talebi</a>
                          <a className="mr-2 ml-2">Ürünü Değerlendir</a>
                          <a>Satıcıyı Değerlendir</a>
                        </div>
                      </div>
                      :
                      <div className="order-detail__status cargo">
                        <div className="d-flex align-items-center">
                          <DoubleRightOutlined style={{ fontSize: '20px' }} />
                          <p className="ml-2">Ürününüz kargoya verildi.. Tahmini teslimat tarihi: 12.03.2022.</p>
                        </div>
                        <a onClick={() => setOpenCargoTracking(true)}>Kargo Takip</a>
                        {openCargoTracking &&
                          <CargoTracking
                            open={openCargoTracking}
                            onClose={() => setOpenCargoTracking(false)}
                            showCloseIcon={true}
                            cargoInfo={cargoInfo}
                            cargoNo={orderDetailInfo.attributes.cargoNo}
                            classNames={{ modal: 'modal-steps' }}
                          />
                        }
                      </div>
                    }
                  </>
                }
                <div className="row">
                  <div className="col-md-3">
                    <div className="order-detail__left">
                      <div className="order-detail__butic">
                        <div className="d-flex">
                          <div className="order-detail__butic-logo mr-2">
                            <img src={orderDetailInfo.attributes.products.data[0].attributes.butiks.data[0].attributes.butik_image} alt="" />
                          </div>
                          <div className="order-detail__butic-info mt-1">
                            <h6>{orderDetailInfo.attributes.products.data[0].attributes.butiks.data[0].attributes.butik_name}</h6>
                            <a href="">{orderDetailInfo.attributes.products.data[0].attributes.butiks.data[0].attributes.butik_whatsapp}</a>
                          </div>
                        </div>
                      </div>
                      <div className="order-detail__user">
                        <div className="order-detail__user-item">
                          <p>Siparişi Veren</p>
                          <span>{orderDetailInfo.attributes.nameSurname}</span>
                        </div>
                        <div className="order-detail__user-item">
                          <p>Sipariş Tarihi</p>
                          <span>{orderDetailInfo.attributes.orderDate}</span>
                        </div>
                        <div className="order-detail__user-item">
                          <p>İletişim Numarası</p>
                          <span>{orderDetailInfo.attributes.phone}</span>
                        </div>
                        <div className="order-detail__user-item">
                          <p>Teslimat Adresi</p>
                          <span>{orderDetailInfo.attributes.address}</span>
                        </div>
                        <div className="order-detail__user-item">
                          <p>Sipariş Açıklaması</p>
                          <span>{orderDetailInfo.attributes.description}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-9">
                    <div className="order-detail__product">
                      <div className="d-flex">
                        <div className="order-detail__product-image mr-3">
                          <img src={orderDetailInfo.attributes.products.data[0].attributes.image} alt="" />
                        </div>
                        <div className="order-detail__product-info">
                          <h2 className="order-detail__product-name">{orderDetailInfo.attributes.products.data[0].attributes.title}</h2>
                          <p className="order-detail__product-price">{orderDetailInfo.attributes.products.data[0].attributes.price} ₺</p>
                          <div className="order-detail__list">
                            <div className="order-detail__list-item">
                              <p>Seçtiğiniz Beden:</p>
                              <span>{orderDetailInfo.attributes.size} </span>
                            </div>
                            <div className="order-detail__list-item">
                              <p>Seçtiğiniz Renk:</p>
                              <span>{orderDetailInfo.attributes.color} </span>
                            </div>
                          </div>
                          <div className="order-detail__list">
                            <div className="order-detail__list-item">
                              <p>Seçtiğiniz Adedi:</p>
                              <span>{orderDetailInfo.attributes.count} </span>
                            </div>
                            <div className="order-detail__list-item">
                              <p> Toplam Fiyat:</p>
                              <span>{orderDetailInfo.attributes.totalPrice} ₺ </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
              :
              <div className="order-detail__error">
                <p>Merhabalar, siparişinizi görebilmeniz için siparişinizi onaylamanız gerekmektedir.</p>
              </div>
            }
          </div>
        </div>
      }


    </>
  );
};

export default orderConfirm;
