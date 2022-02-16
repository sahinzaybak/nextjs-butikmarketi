import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { FiArrowRight } from "react-icons/fi";
import { LoadingOutlined, DoubleRightOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

//Modal Components
import OrderDetailModal from '../../../src/components/modals/order-detail/index'


let myOrderList, cargoInfo;
const myOrders = ({ product, order, myOrderList, argoInfo }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="col-md-6">
      <div className="my-orders__cargo d-flex align-items-center">
        <LoadingOutlined style={{ fontSize: '20px' }} />
        <p className="ml-3">Ürününüz hazırlanıyor.</p>
      </div>
      <div className="my-orders__item">
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
