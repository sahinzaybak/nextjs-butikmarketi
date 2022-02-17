import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { FiArrowRight } from "react-icons/fi";
import { LoadingOutlined, DoubleRightOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

//Modal Components
import OrderDetailModal from '../../../src/components/modals/order-detail/index'

const myOrders = ({ product, order, myOrderList, cargoInfo, orderedPersonName }) => {
  const [orderCancelInfoText, setOrderCancelInfoText] = useState(false); //Sipariş iptal ettiğinde sipariş iptal yazısını görelim.
  const [open, setOpen] = useState(false);

  //Borderlar
  let isOrderPrepare = false
  let isOrderCancel = false
  let isOrderCargo = false
  let isOrderSuccess = false

  if (myOrderList.attributes.attributes.cargoNo == "") 
    isOrderPrepare = true

  if (myOrderList.attributes.attributes.cargoNo == "" && myOrderList.attributes.attributes.isOrderCancel) 
    isOrderCancel = true
  
  if (myOrderList.attributes.attributes.cargoNo != "" && cargoInfo.statusDescription != "Teslim Edildi" || cargoInfo.statusDescription != "TESLİM EDİLDİ") 
    isOrderCargo = true
  
  if (myOrderList.attributes.attributes.cargoNo != "" && cargoInfo.statusDescription == "Teslim Edildi" || cargoInfo.statusDescription == "TESLİM EDİLDİ") 
    isOrderSuccess = true
  
  return (
    <div className="col-md-6">
      {myOrderList.attributes.attributes.cargoNo == "" ?
        <>
          {myOrderList.attributes.attributes.isOrderCancel ?
            <div className="my-orders__status order-status cancel">
              <div className="d-flex align-items-center">
                <CloseOutlined style={{ fontSize: '20px' }} />
                <p className="ml-3">Siparişiniz iptal edilmiştir.</p>
              </div>
            </div>
            :
            <div className="my-orders__status order-status prepare">
              <div className="d-flex align-items-center">
                <LoadingOutlined style={{ fontSize: '20px' }} />
                <p className="ml-3">Ürününüz kargoya verilmek üzere hazırlanıyor...</p>
              </div>
            </div>
          }
        </>
        :
        <>
          {cargoInfo.statusDescription == "Teslim Edildi" || cargoInfo.statusDescription == "TESLİM EDİLDİ" ?
            <div className="my-orders__status order-status success">
              <div className="d-flex align-items-center">
                <CheckOutlined style={{ fontSize: '20px' }} />
                <p className="ml-2">Ürününüz teslim edildi. Teslim tarihi: 17.03.2022</p>
              </div>
            </div>
            :
            <div className="my-orders__status order-status cargo">
              <div className="d-flex align-items-center">
                <DoubleRightOutlined style={{ fontSize: '20px' }} />
                <p className="ml-2">Ürününüz kargoya verildi..</p>
              </div>
            </div>
          }
        </>
      }

      <div className={`my-orders__item ${isOrderCancel ? "my-orders__item-cancel" : ""}  
        ${!isOrderPrepare && isOrderCargo && !isOrderCancel ? "my-orders__item-cargo" : "my-orders__item-prepare"}`}>
        <div className="d-flex align-items-center">
          <div className="my-orders__item-image mr-3">
            <img src={product.attributes.image} alt="" />
          </div>
          <div className="d-flex justify-content-between w-100">
            <div>
              <h4 className="my-orders__item-title">{product.attributes.title}</h4>
              <span className="my-orders__item-date">{order.attributes.attributes.orderDate}</span>
              <p className="my-orders__item-butic">{product.attributes.butiks.data[0]?.attributes.butik_name} </p>
            </div>
            <div className="my-orders__item-actions">
              <p className="my-orders__item-price mb-1">{order.attributes.attributes.totalPrice} ₺</p>
              <div className="my-orders__item-button" onClick={() => setOpen(true)}>
                <p className="mr-2">Sipariş detayları ve işlemler</p>
                <div className="icon">
                  <FiArrowRight />
                </div>
              </div>

              {open &&
                <OrderDetailModal
                  open={open}
                  onClose={() => setOpen(false)}
                  showCloseIcon={false}
                  classNames={{ modal: 'modal-steps' }}
                  orderDetailInfo={myOrderList}
                  cargoInfo={cargoInfo}
                  orderNumber={5484}
                  isMember={true}
                  orderedPersonName={orderedPersonName}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default myOrders;
