import React, { Component } from "react";
import "./style.scss";

export default class Carousel extends Component {
	constructor(props) {
		super(props);
		this.nextBtn = React.createRef(null);
		this.prevBtn = React.createRef(null);

		this.state = {
			currentIndex: 0,
			length: 0,
		};
	}

	componentDidMount() {
		// hide prev btn by default
    if(this.prevBtn?.current)
		this.prevBtn.current.style.display = "none";
	}
	static getDerivedStateFromProps(props, state) {
		if (props.children.length !== state.length) {
			return {
				length: props.children.length,
			};
		}
		return null;
	}

	next = () => {
		// hide next btn when last image is reached
		if (this.state.currentIndex === this.state.length - 2) {
			this.nextBtn.current.style.display = "none";
		}
		if (this.state.currentIndex < this.state.length - 1) {
			this.setState((prevState) => ({
				currentIndex: prevState.currentIndex + 1,
			}));

			// show prev btn when user click on next btn
			this.prevBtn.current.style.display = "block";
		}
	};

	prev = () => {
		// hide prev btn when it's first image
		if (this.state.currentIndex === 1) {
			this.prevBtn.current.style.display = "none";
		}
		if (this.state.currentIndex > 0) {
			this.setState((prevState) => ({
				currentIndex: prevState.currentIndex - 1,
			}));
			// show next btn when user click on prev btn
			this.nextBtn.current.style.display = "block";
		}
	};
	render() {
    const swipeButtons = this.props.children.length > 1 ? <>
    <button
      ref={this.nextBtn}
      onClick={this.next}
      className="btn btn--right"
    >
      {">"}
    </button>
    <button
      ref={this.prevBtn}
      onClick={this.prev}
      className="btn btn--left"
    >
      {"<"}
    </button>
  </> : ""
		return (
			<div className={`carousel ${this.props.size ? "carousel--big" : ""}`}>
				<div className="carousel-container">
					<div
						className="carousel__images-container"
						style={{
							transform: `translateX(-${this.state.currentIndex * 100}%)`,
						}}
					>
						{this.props.children}
					</div>
					{swipeButtons}
				</div>
			</div>
		);
	}
}
