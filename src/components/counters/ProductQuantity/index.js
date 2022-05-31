import React, { Component } from "react";
import "./style.scss";

export default class ProductQuanity extends Component {
	render() {
    const { increment ,decrement ,quantity} = this.props
		return (
			<div
				className={`product-quantity ${
					this.props.size ? "product-quantity--big" : ""
				}`}
			>
				<button
					onClick={increment}
				></button>
				<p>{quantity}</p>
				<button
					onClick={decrement}
				></button>
			</div>
		);
	}
}
