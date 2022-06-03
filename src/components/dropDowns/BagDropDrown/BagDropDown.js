import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./BagDropDown.scss";
import bag from "../../../assets/icons/bag.svg";
import BagModal from "../../modals/BagModal/BagModal";
import CartCard from "../../cards/CartCard";
import CartContext from "../../../contexts/CartContext";

export default class BagDropDown extends Component {
	static contextType = CartContext;
	constructor(props) {
		super(props);
		this.dropRef = React.createRef(null);
		this.btnRef = React.createRef(null);

		this.state = {
			isOpen: false,
		};
	}

	componentDidMount() {
		// hide select list when user click away
		window.onclick = (e) => {
			if (
        !this.dropRef.current.contains(e.target) &&
				this.state.isOpen &&
				e.target !== this.btnRef.current
			) {
				this.toggleDisplay();
			}
		};
	}

	// hide and show select list when user click one of the list options
	toggleDisplay = () => {
		this.setState((previousState) => ({
			isOpen: !previousState.isOpen,
		}));
	};

	render() {
		const { cart, getTotalPrice } = this.context;
		const { price, quantity, currency } = getTotalPrice();
		return (
			<div className="bag">
				<button className="bag__button" onClick={this.toggleDisplay}>
					<img src={bag} alt="bag icon" ref={this.btnRef} />
					<span>{quantity}</span>
				</button>
				<BagModal isOpen={this.state.isOpen} >
					<div className="bag__drop-down" ref={this.dropRef}>
						<p className="bag__items-number">
							My Bag,<span> {quantity} items</span>
						</p>
						<div className="bag__content">
							{cart.map((item) => (
								<CartCard product={item} key={item.id} />
							))}
						</div>
						<div className="bag__payment">
							<p>Total</p>
							<p className="bag__total-price">
								{currency}
								{price.toFixed(2)}
							</p>
						</div>
						<div className="bag__action">
							<Link to="/cart">
								<button
									onClick={this.toggleDisplay}
									className="btn btn--viewBag"
								>
									view bag
								</button>
							</Link>
							<button
								className="btn btn--checkout"
								onClick={() => alert("this functionality is under development")}
							>
								Checkout
							</button>
						</div>
					</div>
				</BagModal>
			</div>
		);
	}
}
