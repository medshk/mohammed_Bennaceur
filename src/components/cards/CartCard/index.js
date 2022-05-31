import React, { Component } from "react";
import "./style.scss";
import ProductNameAndBrand from "../../dataDisplay/ProductNameAndBrand";
import ProductPrice from "../../dataDisplay/ProductPrice";
import TextRadio from "../../inputs/TextRadio";
import SwatchRadio from "../../inputs/SwatchRadio";
import ProductQuanity from "../../counters/ProductQuantity";
import Carousel from "../../carousels/Carousel";
import { Query } from "react-apollo";
import { GET_PRODUCT } from "../../../graphql/schema";
import CartContext from "../../../contexts/CartContext";

export default class CartCard extends Component {
	static contextType = CartContext;

	constructor(props) {
		super(props);
		this.state = {
			quantity: 1,
		};
	}
  

	updateAttributes = (attribute) => {
		const { cart, setCart } = this.context;
    const { id } = this.props.product
		const updatedCart = cart.map((item) => {
			if (item.id === id) {
				const updatedAttributes = item.attributes.map((att) => {
					if (att.name === attribute.name) {
            return attribute};
					return att;
				});
				return { ...item, attributes: updatedAttributes };
			}
			return item;
		});

		setCart(updatedCart);
	};

	incrementQuantity = () => {
		const { quantity } = this.props.product;
		this.updateCart(quantity + 1);
	};
	decrementQuantity = () => {
		const { quantity, id } = this.props.product;
		const { cart, setCart } = this.context;
		if (quantity === 1) {
			const updatedCart = cart.filter((item) => item.id !== id);
			setCart(updatedCart);
		}
		else this.updateCart(quantity - 1);
	};
	updateCart = (quantity) => {
		const { cart, setCart } = this.context;
    const { id } = this.props.product
		const updatedCart = cart.map((item) => {
			if (item.id === id) return { ...item, quantity };
			return item;
		});
		setCart(updatedCart);
	};
	render() {
		const { productId, attributes: storedAttributes } = this.props.product;
		const id = this.props.product.id;

		return (
			<Query query={GET_PRODUCT} variables={{ productId }} fetchPolicy="no-cache">
				{({ loading, error, data }) => {
					if (loading) return "loading";
					if (error) return "Error" + error;
					const { name, brand, gallery, prices, attributes } = data.product ? data.product : {};
          if(Object.keys(data).length !== 0)return (
						<div
							className={`productCart ${
								this.props.size ? "productCart--big" : ""
							} `}
						>
							<div className="productCart-column-one">
								<ProductNameAndBrand
									size={this.props.size}
									content={{ name, brand }}
								/>
								<ProductPrice size={this.props.size} content={prices} />
								{attributes.sort((a,b) => {
                  if(a.type === "text") return -1
                  else return 1
                })
                .map((attribute) => {
									if (attribute.type === "text") {
										return (
											<TextRadio
												size={this.props.size}
												content={attribute}
												setState={this.updateAttributes}
												key={attribute.id}
												id={id}
												selectedItem={storedAttributes.find(
													(att) => att.name === attribute.name
												)}
											/>
										);
									} else
										return (
											<SwatchRadio
												size={this.props.size}
												content={attribute}
												key={attribute.id}
												setState={this.updateAttributes}
												id={id}
												selectedItem={storedAttributes.find(
													(att) => att.name === attribute.name
												)}
											/>
										);
								})}
							</div>

							<div className="productCart-column-two">
								<ProductQuanity
									size={this.props.size}
									quantity={this.props.product.quantity}
									increment={this.incrementQuantity}
                  decrement={this.decrementQuantity}
								/>
								<Carousel size={this.props.size}>
									{gallery.map((image) => (
										<img src={image} alt="product" key={image} />
									))}
								</Carousel>
							</div>
						</div>
					);
				}}
			</Query>
		);
	}
}
