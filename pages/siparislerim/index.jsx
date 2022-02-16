import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { FiArrowRight } from "react-icons/fi";
import { LoadingOutlined, DoubleRightOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

//Modal Components
import MyOrders from '../../src/components/my-orders/my-orders'

//actions
import { fetchMyOrders } from '../../src/store/actions/orders'

let myOrderList, cargoInfo;
const myOrders = () => {
  const dispatch = useDispatch();

  myOrderList = useSelector((state) => state.orders.myOrderList); //Dolan "sipariş listesini" al.
  cargoInfo = useSelector((state) => state.orders.cargoInfo); //Dolan "kargo bilgilerini al"
  useEffect(() => {
    dispatch(fetchMyOrders()) //üyenin siparişlerini getir.
  }, [])

  return (
    <div className="my-orders">
      <div className="my-orders__header">
        <div className="custom-container h-100">
          <div className="my-orders__header-text">
            <p>Siparişlerim.</p>
            <span>Merhabalar, siparişlerinizi aşağıdaki listeden detaylı olarak görebilirsiniz.</span>
          </div>
        </div>
      </div>
      <div className="custom-container">
        <div className="my-orders__wrp mt-3">
          <div className="row">
            {myOrderList && myOrderList.map((order, indexs) =>
              <>
                {order.attributes.attributes.products.data.map((product, index) =>
                  <MyOrders
                    product={product}
                    order={order}
                    myOrderList={myOrderList[indexs]}
                    cargoInfo={cargoInfo}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default myOrders;
