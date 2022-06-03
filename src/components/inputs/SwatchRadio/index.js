import React, { Component } from "react";
import CartContext from "../../../contexts/CartContext";
import "./style.scss";

export default class SwatchRadio extends Component {
	static contextType = CartContext;

	handleChange = (att) => {
		this.props.setState(att);
	};

	selectedItem = (value, index) => {
		const selectedItem = this.props.selectedItem;
		if (selectedItem) {
			if (selectedItem.value === value) return true;
			return false;
		} else if (index === 0) return true;
		else return false;
	};

	render() {
		const { name, items } = this.props.content;
		// using id prop to diffrentiate between input radio in cart page
		// of the same product but with diffrent item's attribute
		const id = this.props.id ? this.props.id : "";
		// using size props to diffrentiate between input radio in cart page and bag
		const size = this.props.size;
		return (
			<div
				className={`color-radio ${this.props.size ? "color-radio--big" : ""}`}
			>
				<p className="color-radio__title">{name}:</p>
				<div className="color-radio__content">
					{items.map((item, index) => (
						<React.Fragment key={item.id}>
							<input
								type="radio"
								name={`${name}${id}${size}`}
								value={item.value}
								id={`${id}${item.id}${size}`}
								onChange={() =>
									this.props.size
										? this.handleChange({
												id: item.id,
												name,
												value: item.value,
										  })
										: ""
								}
								checked={this.selectedItem(item.value, index)}
							/>
							<label
								htmlFor={`${id}${item.id}${size}`}
								style={{ backgroundColor: item.value }}
							></label>
						</React.Fragment>
					))}
				</div>
			</div>
		);
	}
}
