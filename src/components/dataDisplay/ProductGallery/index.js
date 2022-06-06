import React, { Component } from "react";
import "./style.scss";

export default class index extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selected: this.props.gallery[0],
		};
	}

	handleClick = (img) => {
		this.setState({ selected: img });
	};
	render() {
		const gallery = this.props.gallery;
		return (
			<div className="product-gallery">
				<ul className="product-gallery__list">
					{gallery.map((img) => (
						<li
							key={img}
							onClick={() => this.handleClick(img)}
							className={`product-gallery__item ${
								img == this.state.selected
									? "product-gallery__item--selected"
									: ""
							}`}
						>
							<img src={img} alt={img} />
						</li>
					))}
				</ul>
				<div className="product-gallery__selected-img">
					<img
						src={this.state.selected}
						alt={this.state.selected}
					/>
				</div>
			</div>
		);
	}
}
