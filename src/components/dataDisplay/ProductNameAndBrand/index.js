import React, { Component } from "react";
import "./style.scss";

export default class ProductNameAndBrand extends Component {
	render() {
    const { name ,brand } = this.props.content
		return (
			<div className={`product-info ${this.props.size ? "product-info--big" : ""}`}>
				<h3 className="product-info__brand">{brand}</h3>
				<p className="product-info__name">{name}</p>
			</div>
		);
	}
}
