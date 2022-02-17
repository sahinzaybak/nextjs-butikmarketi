import Image from 'next/image'
import received from '../../../assets/images/order.svg'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

//Components
import OrderDetail from '../../order-detail/order-detail'
const orderDetailModal = (props) => {
	return (
		<Modal open={props.open} onClose={props.onClose} showCloseIcon={props.showCloseIcon} classNames={{ modal: 'modal-steps xlarge' }} center>
			<div className="modal-form">
				<OrderDetail
					orderDetailInfo={props.orderDetailInfo}
					cargoInfo={props.cargoInfo}
					orderNumber={props.orderNumber}
					isMember={props.isMember}
          orderedPersonName={props.orderedPersonName}
				/>
			</div>
		</Modal>
	);
};

export default orderDetailModal;
