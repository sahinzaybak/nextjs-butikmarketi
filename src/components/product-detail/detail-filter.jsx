
//Filter Seçenekleri
import { useSelector, useDispatch } from 'react-redux'

const DetailFilter = ({ productSize, productColors, componentType }) => {
  const dispatch = useDispatch()
  let selecteFilterIndexSize = useSelector((state) => state.products.productDetailSelectedFilterSize);
  let selecteFilterIndexColor = useSelector((state) => state.products.productDetailSelectedFilterColor);

  return (
    <>
      <div className={`product-detail filter ${componentType == "Modal" ? "modal-type" : ""}`}>
        {productSize &&
          <div className="product-info__item mt-3">
            <span className="product-info__title">Beden Seçenekleri</span>
            <div className="d-flex mt-2">
              {productSize.map((size, index) => (
                <p className={`product-info__desc size ${selecteFilterIndexSize === index ? "selected" : ""}`} key={index}
                  onClick={() => { dispatch({ type: 'SELECTED_FILTER_SIZE', payload: { index: index, selectedTitle: size.size_title } }) }}>
                  {size.size_title}
                </p>
              ))}
            </div>
          </div>
        }
        {productColors.length != 0 &&
          <div className="product-info__item mt-3">
            <span className="product-info__title">Renk Seçenekleri</span>
            <div className="d-flex mt-2">
              {productColors.map((color, index) => (
                <p className={`product-info__desc color ${selecteFilterIndexColor === index ? "selected" : ""}`} key={index}
                  onClick={() => { dispatch({ type: 'SELECTED_FILTER_COLOR', payload: { index: index, selectedTitle: color.color_title } }) }}
                  style={{ backgroundColor: color.color_code }}>
                </p>
              ))}
            </div>
          </div>
        }
      </div>
    </>
  );
};

export default DetailFilter;
