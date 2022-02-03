import axios from "axios";
export const fetchCreateOrder = (getOrdersValue) => (dispatch) => {//Sipariş oluştur.
  let currentDay = function (sp) {
    let today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    return yyyy + sp + mm + sp + dd;
  };
  axios.post("http://localhost:1337/api/orders", { //Sipariş oluştur
      data: {
        butikId: getOrdersValue.butikId,
        products: getOrdersValue.productId,
        nameSurname: getOrdersValue.username,
        phone: getOrdersValue.phone,
        address: getOrdersValue.address,
        description: getOrdersValue.desc,
        size: getOrdersValue.size,
        color: getOrdersValue.color,
        count: getOrdersValue.count,
        status: false, //üyeliksiz siparişlerde onay olmadan status false.
        totalPrice: getOrdersValue.price,
        orderDate: currentDay("-"),
      },
    }).then((value) => {
      axios.post("http://localhost:8080/sendMsg", { //Whatsapp mesaj gönder
        name: getOrdersValue.username,
        phone: parseInt(9 + getOrdersValue.phone),
        order_id: " ",
        user_id: value.data.data.id,
      });
    });
};

export const fetchOrderConfirm =  (orderNumber) => async (dispatch) => { //Siparişi onayla
  const orderInfo = await axios.get(`http://localhost:1337/api/orders?filters[orderNo]=${orderNumber}`) //Önce siparişi bul.
  axios.put(`http://localhost:1337/api/orders/${orderInfo.data.data[0].id}`, { //Sipariş ID'ye göre status'u güncelle.
    data: {
      status: true,
    },
  });
};

export const fetchOrderDetailInfo = (orderNumber) => (dispatch) => { //Sipariş bilgilerini getir.
  axios.get(`http://localhost:1337/api/orders?filters[orderNo]=${orderNumber}&populate=products.butiks`).then((response) => {
    dispatch({
      type: "ORDER_DETAIL_INFO",
      payload: response.data.data[0].attributes
    });
  });
};