//Sipariş Detayları

import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from "next/router";

//actions
import { fetchOrderDetailInfo, fetchCargoInfo } from '../../../src/store/actions/orders'

//Order Detail Component
import OrderDetail from '../../../src/components/order-detail/order-detail'

let orderDetailInfo,cargoInfo;
const orderConfirm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const orderNumber = router.query.orderNumber;
  const securityCode = router.query.securityCode;

  orderDetailInfo = useSelector((state) => state.orders.orderDetailInfo); //Dolan "sipariş detay bilgilerini" al.
  cargoInfo = useSelector((state) => state.orders.cargoInfo); //Dolan "kargo bilgilerini al"
  console.log(orderDetailInfo)

  useEffect(() => {
    if (orderNumber) dispatch(fetchOrderDetailInfo(orderNumber, securityCode)) //sipariş detaylarını getir.
  }, [orderNumber])

  useEffect(() => {
    if (orderDetailInfo.attributes != null && orderDetailInfo.attributes.cargoNo != "")
      dispatch(fetchCargoInfo()) //Kargo bilgilerini getir.
  }, [orderDetailInfo])

  return (
    <>
      <OrderDetail
        orderDetailInfo={orderDetailInfo}
        cargoInfo={cargoInfo}
        orderNumber={orderNumber}
        />
    </>
  );
};

export default orderConfirm;
