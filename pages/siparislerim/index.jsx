import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'

//Modal Components
import MyOrders from '../../src/components/my-orders/my-orders'
import Filters from '../../src/components/my-orders/filters'
//actions
import { fetchMyOrders, fetchCargoInfo } from '../../src/store/actions/orders'

import { loginUserInfo } from '../../src/helpers/auth'

let loginUserInfos;
const myOrders = () => {
  const dispatch = useDispatch();

  let myOrderList = useSelector((state) => state.orders.myOrderList); //Dolan "sipariş listesini" al.
  let cargoInfo = useSelector((state) => state.orders.cargoInfo); //Dolan "kargo bilgilerini al"
  useEffect(() => {
    dispatch(fetchMyOrders()) //üyenin siparişlerini getir.
    dispatch(fetchCargoInfo()) //Kargo bilgilerini getir.
    loginUserInfos = loginUserInfo()
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
      <Filters cargoInfo={cargoInfo} />
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
                    orderedPersonName={loginUserInfos.nameSurname}
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
