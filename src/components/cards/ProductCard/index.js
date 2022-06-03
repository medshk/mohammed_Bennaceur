import React, { Component } from "react";
import "./style.scss";
import CurrencyContext from "../../../contexts/CurrencyContext";
import CartContext from "../../../contexts/CartContext";
import { Link } from "react-router-dom";
import inCart from "../../../assets/icons/inCart.png";
export default class ProductCard extends Component {
	static contextType = CartContext;

	addToCart = () => {
		const { id : productId, attributes, prices } = this.props.product;
    const { setCart, getIdCounter, cart } = this.context;

		const initAttributes = attributes.map(({ name, items }) => {
			const { id, value } = items[0];
			return { id, name, value };
		});
    console.log(productId)
		//find if product with same attributes exists in cart
		const product = cart.find(
			(item) =>
				item.productId === productId &&
				item.attributes.length === initAttributes.length &&
				item.attributes.every(
					(value, index) =>
						value.name === initAttributes[index].name &&
						value.value === initAttributes[index].value
				)
		);

		// if product exists update product's quantity
		if (product) {
			const updatedArray = cart.map((item) => {
				if (item.id === product.id) {
					return { ...item, quantity: item.quantity + 1 };
				}
				return item;
			});
			setCart(updatedArray);
		}
		// create new product
		else {
			setCart([
				...cart,
				{
					id: getIdCounter(),
					productId,
					attributes: initAttributes,
					quantity: 1,
          prices
				},
			]);
		}
		alert("Product added to cart ");

	};
	render() {
		const classType = this.props.product.inStock
			? "product--in-stock"
			: "product--out-of-stock";

		const { id, name, brand, gallery, prices } = this.props.product;

		return (
			<CurrencyContext.Consumer>
				{({ currency }) => {
					const price = prices.find(
						(price) => price.currency.symbol === currency
					);
					const { amount } = price;
					return (
						<div className={`product ${classType}`}>
							<div className="product-container">
								<Link to={`/product/${id}`}>
									<div className="product__image-wrapper">
										<img src={gallery[0]} alt="product" />
									</div>
								</Link>
								<div className="product__info">
									<p className="product__title">
										{brand} {name}
									</p>
									<span className="product__price">
										{currency}
										{amount}
									</span>
								</div>
								<div className="product__action">
									<button onClick={this.addToCart}>
										<img src={inCart} alt="cart icon" />
									</button>
								</div>
							</div>
						</div>
					);
				}}
			</CurrencyContext.Consumer>
		);
	}
}
