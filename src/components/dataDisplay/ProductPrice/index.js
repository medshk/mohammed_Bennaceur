import React, { Component } from "react";
import CurrencyContext from "../../../contexts/CurrencyContext";
import "./style.scss";

export default class ProductPrice extends Component {
  static contextType = CurrencyContext;
	render() {
    const prices = this.props.content;
    const { currency } = this.context;
    const price = prices.find(
			(price) => price.currency.symbol === currency
		);
    const { amount } = price
		return (
			<div
				className={`product-price ${
					this.props.size ? "product-price--big" : ""
				}`}
			>
				<h3
					className="product-price__title"
					style={!this.props.title ? { display: "none" } : { display: "block" }}
				>
					Price:
				</h3>
				<span className="product-price__price">{currency}{amount}</span>
			</div>
		);
	}
}
