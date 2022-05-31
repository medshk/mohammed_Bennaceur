import React, { Component } from "react";
import "./style.scss";
import CurrencyContext from "../../../contexts/CurrencyContext";
import CartContext from "../../../contexts/CartContext";
import { Link } from "react-router-dom";
export default class ProductCard extends Component {
	static contextType = CurrencyContext;
	render() {
		let classType = "";
		if (!this.props.product.inStock) {
			classType = "product--out-of-stock";
		} else {
			classType = "";
		}
		const { id, name, brand, gallery, prices } = this.props.product;
		const { currency } = this.context;
		const price = prices.find((price) => price.currency.symbol === currency);
		const { amount } = price;
		return (
			<CartContext.Consumer>
				{({ getProductsIds }) => {
					const isInCart = getProductsIds().includes(id)
					return (
						<Link to={`/product/${id}`}>
							<div className={`product ${classType} ${isInCart ? "product--in-cart" : ""}`}>
								<div className="product-container">
									<div className="product__image-wrapper">
										<img src={gallery[0]} alt="product" />
									</div>
									<div className="product__info">
										<p className="product__title">
											{brand} {name}
										</p>
										<span className="product__price">
											{currency}
											{amount}
										</span>
									</div>
								</div>
							</div>
						</Link>
					);
				}}
			</CartContext.Consumer>
			// <Link to={`/product/${id}`} >
			// 	<div className={`product ${classType}`}>
			// 		<div className="product-container">
			// 			<div className="product__image-wrapper">
			// 				<img src={gallery[0]} alt="product" />
			// 			</div>
			// 			<div className="product__info">
			// 				<p className="product__title">
			// 					{brand} {name}
			// 				</p>
			// 				<span className="product__price">
			// 					{currency}
			// 					{amount}
			// 				</span>
			// 			</div>
			// 		</div>
			// 	</div>
			// </Link>
		);
	}
}
