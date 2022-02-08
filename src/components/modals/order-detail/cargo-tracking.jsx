import Image from 'next/image'
import received from '../../../assets/images/order.svg'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const cargoTracking = (props) => {
  return (
    <Modal open={props.open} onClose={props.onClose} showCloseIcon={props.showCloseIcon} classNames={{ modal: 'modal-steps large' }} center>
      <div className="d-flex modal-top">
        <Image src={received} alt="Ürün hakkında soru sor" />
        <h3 className="modal-title ml-3">Kargo Takibi</h3>
      </div>
      <div className="modal-form">
        {props.cargoInfo.movement &&
          <>
            <div className="d-flex align-items-center mb-3">
              <img className="cargo-tracking__logo" src={props.cargoInfo.companyImage} alt="" />
              <div className="d-block">
                <p>Siparişiniz {props.cargoInfo.companyName} tarafından gönderilecektir. </p>
                <p>Teslim alacak olan: {props.cargoInfo.receiver} </p>
              </div>
            </div>
            <div className="cargo-tracking">
              {props.cargoInfo.movement.reverse().map((cargo, index) =>
                <div className={`cargo-tracking__item ${cargo.status == 4 ? "checked" : ""}`} key={index}>
                  <p className="cargo-tracking__item-desc">{cargo.description}</p>
                  <p className="cargo-tracking__item-date">{cargo.date.slice(0, 10)} - {cargo.date.slice(11, 16)}</p>
                  <p className="cargo-tracking__item-location">{cargo.externalLocation}</p>
                </div>
              )}
            </div>
          </>
        }
      </div>
    </Modal>
  );
};

export default cargoTracking;
