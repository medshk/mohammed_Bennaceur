import React, { Component } from "react";
import "./style.scss";

export default class TextRadio extends Component {
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
    	// using id prop to diffrentiate between inputs radios in cart page 
      // of the same product but with diffrent item's attribute
		const id = this.props.id ? this.props.id : 0;
		// using size props to diffrentiate between input radio in cart page and bag
		const size = this.props.size ? this.props.size : "";

		return (
			<div
				className={`size-radio ${this.props.size ? "size-radio--big" : ""}`}
			>
				<p className="size-radio__title">{name}:</p>
				<div className="size-radio__content">
					{items.map((item, index) => (
						<React.Fragment key={item.id}>
							<input
								type="radio"
								name={`${name}${id}${size}`}
								value={item.value}
								id={`${id}${item.id}${name}${size}`}
								onChange={() =>
                  this.props.size
									 ? this.handleChange({
										id: item.id,
										name,
										value: item.value,
									}) : ""
								}
								checked={this.selectedItem(item.value, index)}
							/>
							<label htmlFor={`${id}${item.id}${name}${size}`}>
								{item.value}
							</label>
						</React.Fragment>
					))}
				</div>
			</div>
		);
	}
}
