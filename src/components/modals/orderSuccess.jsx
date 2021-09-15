import Image from 'next/image'
import tick from '../../assets/images/tick.svg'
import addUser from '../../assets/images/add-user.svg'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const confirm = ({ ...props }) => {
  return (
    <Modal {...props} center>
      <div className="d-flex modal-wrp pb-1">
        <Image src={tick} alt="Ürün hakkında soru sor" />
        <h3 className="modal-title ml-3">Siparişiniz onaylandı</h3>
      </div>
      <div className="modal-form mt-4">
        <div className="modal-form__top">
          <h3 className="large-title green">Tebrikler, siparişiniz başarıyla oluşturuldu.</h3>
          <h3 className="large-title green mb-0"><u>Sipariş Numaranız:</u></h3>
          <h3 className="large-title green">21310435935</h3>
          <h4 className="medium-title green mt-3 ">Sipariş teslim süresince <u><strong>kargo takibi,</strong></u> <u><strong>ürünün teslim süresi,</strong></u>  <u><strong>ürün doğruluğu</strong> </u> vs gibi konularda sürecin takibinde olacağımızı belirtmek isteriz. <br /> <br />Kargo sürecinde sizi sms olarak bilgilendirip, ürün elinize ulaştığı gün <strong>memnuniyet için </strong>sizle iletişime geçiyor olacağız.</h4>
        </div>
        <div className="small-title mt-4">
          <span>Bundan sonraki siparişlerinizde,</span>
          <p className="small-title__disc">Daha kolay sipariş oluşturma</p>
          <p className="small-title__disc">Kargo takibi yapabilme</p>
          <p className="small-title__disc">Beğendiğiniz ürünleri favorilere ekleme</p>
          <p className="small-title__disc">Teslim aldığınız ürüne yorum yapabilme</p>
          <p className="small-title__disc">Verdiğiniz siparişlerinizi görüntüleme</p>
          <p>gibi ve daha fazla özelliği kullabilmek için, dilerseniz sitemize  <u> <strong>üye olabilirsiniz.</strong></u></p>
        </div>
        <div className="alert-modal__action d-flex align-items-center flex-column">
          <div className="green-button info d-flex align-items-center mt-3" onClick={() => setOpenAlert(true)}>
            <Image src={addUser} alt="Ürün hakkında soru sor" />
            <p>Üye olmak istiyorum.</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default confirm;
