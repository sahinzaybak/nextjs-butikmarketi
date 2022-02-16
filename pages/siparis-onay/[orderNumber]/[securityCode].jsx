import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from "next/router";

//actions
import { fetchOrderConfirm } from '../../../src/store/actions/orders'
const orderConfirm = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const orderNumber = router.query.orderNumber;
	const securityCode = router.query.securityCode;
	useEffect(() => {
		if (orderNumber)
			dispatch(fetchOrderConfirm(orderNumber, securityCode)) //siparişi onayla
	}, [orderNumber])
	return (
		<div className="center-layout">
			<h4>{orderNumber}</h4>
		</div>
	);
};

export default orderConfirm;
