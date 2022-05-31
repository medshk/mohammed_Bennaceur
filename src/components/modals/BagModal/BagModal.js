import React, { Component } from "react";
import { createPortal } from "react-dom";
import "./BagModal.scss";

export default class BagModal extends Component {
	componentDidUpdate() {
		if (this.props.isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}
	render() {
		return createPortal(
			<div
				ref={this.props.reff}
				className="modal"
				style={this.props.isOpen ? { display: "block" } : { display: "none" }}
			>
				{this.props.children}
			</div>,
			document.querySelector("#root")
		);
	}
}
