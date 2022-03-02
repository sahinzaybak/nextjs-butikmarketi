import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'

const myOrdersFilters = ({ cargoInfo }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(0);
  let defaultMyOrderList = useSelector((state) => state.orders.defaultMyOrderList); //Dolan "sipariş listesini" al.

  const filters = [
    {
      "id": 0,
      "title": "Tüm siparişleriniz",
    },
    {
      "id": 1,
      "title": "Hazırlanan siparişleriniz",
    },
    {
      "id": 2,
      "title": "Kargoda olan siparişleriniz",
    },
    {
      "id": 3,
      "title": "İptal ettiğiniz siparişleriniz",
    },
    {
      "id": 4,
      "title": "Teslim Edilen siparişleriniz",
    }
  ]

  let filteredOrders;
  function filterSelected(filter_id) {
    switch (filter_id) {
      case 0:
        filteredOrders = defaultMyOrderList.filter(x => x.attributes.id != "")
        break;

      case 1:
        filteredOrders = defaultMyOrderList.filter(x => x.attributes.attributes.cargoNo == "" && x.attributes.attributes.isOrderCancel == false)
        break;

      case 2:
        filteredOrders = defaultMyOrderList.filter(x => x.attributes.attributes.cargoNo != "" && cargoInfo.statusDescription != "Teslim Edildi" || cargoInfo.statusDescription != "TESLİM EDİLDİ")
        break;

      case 3:
        filteredOrders = defaultMyOrderList.filter(x => x.attributes.attributes.isOrderCancel == true)
        break;

      case 4:
        filteredOrders = defaultMyOrderList.filter(x => x.attributes.attributes.cargoNo != "" && cargoInfo.statusDescription == "Teslim Edildi" || cargoInfo.statusDescription == "TESLİM EDİLDİ")
        break;

      default:
        break;
    }
    dispatch({ type: "MY_ORDER_LIST", payload: filteredOrders }) //siparişleri filtrele

  }
  return (
    <div className="my-orders__filter">
      <div className="custom-container">
        <div className="d-flex align-items-center justify-content-between">
          {filters.map((filter, key) =>
            <div className={`filter-item ${key == active ? "active" : ""}`} onClick={() => {
              setActive(key);
              filterSelected(filter.id)
            }}>
              <p>{filter.title}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default myOrdersFilters;
