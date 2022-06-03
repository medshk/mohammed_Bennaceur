import React, { Component } from "react";
import CurrencyContext from "./CurrencyContext";

const CartContext = React.createContext();
export class CartProvider extends Component {
  static contextType = CurrencyContext
	state = {
		cart: localStorage.getItem("cart")
			? JSON.parse(localStorage.getItem("cart"))
			: [],
	};

  // generate ids for products added in cart
	getIdCounter = () => {
		let productIdsCounter;
		if (!localStorage.getItem("productsIdCounter")) {
			localStorage.setItem("productsIdCounter", 0);
      return 0;
		} else {
      productIdsCounter = localStorage.getItem("productsIdCounter");
			localStorage.setItem(
				"productsIdCounter",
				parseInt(productIdsCounter) + 1
			);
     
		}
    productIdsCounter = localStorage.getItem("productsIdCounter");
    return parseInt(productIdsCounter);
	}

  // update cart state
	setCart = (cart) => {

		localStorage.setItem(
			"cart",
			JSON.stringify(cart)
		);
		this.setState({
			cart:cart,
		});
	}

  // return all ids of products in cart
  getProductsIds = () => {
    const ids = this.state.cart.map(product => product.productId)
    return [...new Set(ids)]
  }
  // get total products price
  getTotalPrice = () => {
    const { currency } = this.context
    let totalQuantity = 0
    const totalPrice  = this.state.cart.reduce((total, { prices ,quantity }) => {
      totalQuantity+= quantity
      return total+= prices.find(price => price.currency.symbol === currency).amount * quantity
    },0)

    return {quantity: totalQuantity, price: totalPrice, currency}
  }

	render() {
		const { children } = this.props;
		const { cart } = this.state;
		const { setCart , getIdCounter, getTotalPrice ,getProductsIds } = this;

		return (
			<CartContext.Provider
				value={{
					cart,
					setCart,
          getIdCounter,
          getTotalPrice,
          getProductsIds
				}}
			>
				{children}
			</CartContext.Provider>
		);
	}
}

export default CartContext;
