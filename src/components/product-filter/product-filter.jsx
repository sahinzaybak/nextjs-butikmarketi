//** Kategoriye Ait Ürünler Sayfası

import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchProductFilterApply } from "../../../src/store/actions/products";

const categoryProducts = ({ categoryTitle, filterList, pageType, buticSlug }) => {
	const isInitialMount = useRef(true);
	const dispatch = useDispatch();
	const [checked, setChecked] = useState([]);
	const [isActive, setActive] = useState([]);
	const [selectedFilterTitle, setSelectedFilterTitle] = useState([]);

	// Ürün filtrele >
	const handleCheck = (event) => {
		let updatedList = [...checked];
		let selectedFilterArray = [...isActive]; //filtre seçince seçilen filtreye active class eklemek için. X,S,M 'leri arraya aldık ki class eklerken ...includes(X) == true olursa buna göre seçili filtreye class'ı ekleyelim. Diğer türlü bütün filtrelere class ekliyordu.
		if (event.target.checked) {
			setSelectedFilterTitle(event.target.title + 's'); //color+s, size+s
			updatedList = [...checked, `&filters[${event.target.title}s][${event.target.title}_title][$in]=` + event.target.value]; //filtre seç
			selectedFilterArray = [...isActive, event.target.value]; //filtre seçince seçilen filtreye active class eklemek için. 
		}

		else {
			updatedList.splice(checked.indexOf(`&filters[${event.target.title}s][${event.target.title}_title][$in]=` + event.target.value), 1); //filtre çıkar
			selectedFilterArray.splice(isActive.indexOf(event.target.value), 1); ///filtre seçince seçilen filtreye active class silmek için. 
		}

		setChecked(updatedList);
		setActive(selectedFilterArray);
	};

	useEffect(() => {
		if (isInitialMount.current) isInitialMount.current = false; // ilk sayfa yüklendiğinde useEffect çalışmasın. Mount & Update ayrımı 
		else {
			const checkedItems = checked.length ?
				checked.reduce((total, item) => {
					return total + item;
				}) : "";

			dispatch(fetchProductFilterApply(categoryTitle, checkedItems, selectedFilterTitle, pageType, buticSlug)); //Filtreyi Uygula
			//categoryTitle => elbise-x-c56 -- checkedItems => &filters[sizes][size_title][$in]=XXL&filters[sizes][size_title][$in]=XL
		}
	}, [checked]); //Filtreleden filtre seçildiği zaman çalışsın

	//Ürün Filtrele  />

	return (
		<div className="filter">
			{filterList && filterList.map((filterSub, index) => (
				<div className="filter-item" key={index}>
					<h6 className="filter-title">{filterSub.main_title_text}</h6>
					{filterSub && filterSub.filter_sub.map((filter, index) =>
						<div className="filter-choose" key={index}>
							<label className="checkbox" className={`checkbox ${isActive.includes(filter.title) ? "active" : ""}`}>
								<span className="checkbox__input">
									<input type="checkbox" value={filter.title} title={filterSub.main_title} name="checkbox"
										onChange={handleCheck} />
									<span className="checkbox__control">
										<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden="true" focusable="false">
											<path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' />
										</svg>
									</span>
								</span>
								<span className="radio__label">{filter.title}</span>
							</label>
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export default categoryProducts;
