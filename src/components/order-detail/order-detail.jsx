//Sipariş Detayları

import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { LoadingOutlined, DoubleRightOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

//Modal Components
import OrderCancel from '../../../src/components/modals/order-detail/order-cancel'
import ProductComment from '../../../src/components/modals/comment'
import CargoTracking from '../../../src/components/modals/order-detail/cargo-tracking'

//actions
import { fetchOrderCancel } from '../../../src/store/actions/orders'

const orderDetailComp = ({ orderDetailInfo, cargoInfo, orderNumber, isMember }) => {
  const dispatch = useDispatch();
  const [orderCancelInfoText, setOrderCancelInfoText] = useState(false); //Sipariş iptal ettiğinde sipariş iptal yazısını görelim.

  //Modal işlemleri
  const [openOrderCancel, setOpenOrderCancel] = useState(false);
  const [openCargoTracking, setOpenCargoTracking] = useState(false);
  const [openComment, setOpenComment] = useState(false);

  function orderDoingCancel() { //Evet, sipraişimi iptal etmek istiyorum
    dispatch(fetchOrderCancel(orderDetailInfo.id)) //Sipariş iptal => isOrderCancel = false
    setOrderCancelInfoText(true) //Sipariş iptal ettiğinde sipariş iptal yazısını görelim.
  }

  return (
    <>
      {orderDetailInfo.attributes &&
        <div className="order-detail mt-4">
          <div className={`custom-container ${isMember ? "w-100" : ""}`}>
            {orderDetailInfo.attributes.attributes.status ?
              <>
                {!isMember &&
                  <div className="category-title__wrp mb-4">
                    <h1 className="category-title"> numaralı SİPARİŞ BİLGİLERİ</h1>
                  </div>
                }
                {orderDetailInfo.attributes.attributes.cargoNo == "" ?
                  <>
                    {orderCancelInfoText || orderDetailInfo.attributes.attributes.isOrderCancel ?
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
                          <a className="mr-2 ml-2" onClick={() => setOpenComment(true)}>Ürüne Yorum Yap</a>
                          <a>Satıcıyı Değerlendir</a>
                          <ProductComment
                            open={openComment}
                            productId={orderDetailInfo.attributes.attributes.products.data[0].id}
                            comments={orderDetailInfo.attributes.attributes.products.data[0].attributes.comments}
                            onClose={() => setOpenComment(false)}
                            classNames={{ modal: 'modal-comment' }} />
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
                            cargoNo={orderDetailInfo.attributes.attributes.cargoNo}
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
                            <img src={orderDetailInfo.attributes.attributes.products.data[0].attributes.butiks.data[0].attributes.butik_image} alt="" />
                          </div>
                          <div className="order-detail__butic-info mt-1">
                            <h6>{orderDetailInfo.attributes.attributes.products.data[0].attributes.butiks.data[0].attributes.butik_name}</h6>
                            <a href="">{orderDetailInfo.attributes.attributes.products.data[0].attributes.butiks.data[0].attributes.butik_whatsapp}</a>
                          </div>
                        </div>
                      </div>
                      <div className="order-detail__user">
                        <div className="order-detail__user-item">
                          <p>Siparişi Veren</p>
                          <span>{orderDetailInfo.attributes.attributes.nameSurname}</span>
                        </div>
                        <div className="order-detail__user-item">
                          <p>Sipariş Tarihi</p>
                          <span>{orderDetailInfo.attributes.attributes.orderDate}</span>
                        </div>
                        <div className="order-detail__user-item">
                          <p>İletişim Numarası</p>
                          <span>{orderDetailInfo.attributes.attributes.phone}</span>
                        </div>
                        <div className="order-detail__user-item">
                          <p>Teslimat Adresi</p>
                          <span>{orderDetailInfo.attributes.attributes.address}</span>
                        </div>
                        <div className="order-detail__user-item">
                          <p>Sipariş Açıklaması</p>
                          <span>{orderDetailInfo.attributes.attributes.description}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-9">
                    <div className="order-detail__product">
                      <div className="d-flex">
                        <div className="order-detail__product-image mr-3">
                          <img src={orderDetailInfo.attributes.attributes.products.data[0].attributes.image} alt="" />
                        </div>
                        <div className="order-detail__product-info">
                          <h2 className="order-detail__product-name">{orderDetailInfo.attributes.attributes.products.data[0].attributes.title}</h2>
                          <p className="order-detail__product-price">{orderDetailInfo.attributes.attributes.products.data[0].attributes.price} ₺</p>
                          <div className="order-detail__list">
                            <div className="order-detail__list-item">
                              <p>Seçtiğiniz Beden:</p>
                              <span>{orderDetailInfo.attributes.attributes.size} </span>
                            </div>
                            <div className="order-detail__list-item">
                              <p>Seçtiğiniz Renk:</p>
                              <span>{orderDetailInfo.attributes.attributes.color} </span>
                            </div>
                          </div>
                          <div className="order-detail__list">
                            <div className="order-detail__list-item">
                              <p>Seçtiğiniz Adedi:</p>
                              <span>{orderDetailInfo.attributes.attributes.count} </span>
                            </div>
                            <div className="order-detail__list-item">
                              <p> Toplam Fiyat:</p>
                              <span>{orderDetailInfo.attributes.attributes.totalPrice} ₺ </span>
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

export default orderDetailComp;
