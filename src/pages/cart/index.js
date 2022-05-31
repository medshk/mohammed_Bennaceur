import React, { Component } from "react";
import CartCard from "../../components/cards/CartCard";
import CartContext from "../../contexts/CartContext";
import "./style.scss";

export default class Cart extends Component {
	static contextType = CartContext;
	render() {
		const { cart, getTotalPrice } = this.context;
		const { price, quantity, currency } = getTotalPrice();
		const TAX = 21;
		const taxAmount = ((TAX / 100) * price).toFixed(2);
		const totalPrice = parseFloat(price + taxAmount).toFixed(2);
		return (
			<div className="cart">
				<h2 className="cart__title">Cart</h2>
				<div className="cart__bag">
					{cart.map((item) => (
						<CartCard size="big" product={item} key={item.id} />
					))}
				</div>
				<div className="cart_action">
					<div className="cart-column1">
						<label>Tax {TAX}%:</label>
						<label>Quantity:</label>
						<label>Total:</label>
					</div>
					<div className="cart-column2">
						<span>
							{currency}
							{taxAmount}
						</span>
						<span>{quantity}</span>
						<span>
							{currency}
							{totalPrice}
						</span>
					</div>
				</div>
				<button
					onClick={() => {
						console.log("cart");
						alert("this functionality is under developement");
					}}
					className="cart__submit-btn"
				>
					order
				</button>
			</div>
		);
	}
}
