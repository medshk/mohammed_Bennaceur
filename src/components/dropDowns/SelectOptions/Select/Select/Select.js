import React, { Component } from "react";
import "./Select.scss";
import arrow from "../../../../../assets/icons/arrow-down.svg";
import CurrencyContext from "../../../../../contexts/CurrencyContext";

export default class Select extends Component {
  static contextType = CurrencyContext;
	constructor(props) {
		super(props);
		this.selectorRef = React.createRef(null);
		this.btnRef = React.createRef(null);

		this.state = {
			value: "",
			isOpen: false,
		};
	}
	static getDerivedStateFromProps(props, state) {
		if (state.value === "") {
			//Change in props
      if(localStorage.getItem("currency")) {
        return {
          value: localStorage.getItem("currency"),
        };
      }
			return {
				value: props.children[0].props.value,
			};
		}
		return null; // No change to state
	}

	componentDidMount() {
		// hide select list when user click away
		window.addEventListener("click", (e) => {
			if (
				e.target !== this.selectorRef.current &&
				this.state.isOpen &&
				e.target !== this.btnRef.current
			) {
				this.toggleDisplay();
			}
		});

    // intit currency context in first render 
    if(!localStorage.getItem("currency")) {
    const { setCurrency } = this.context;
    setCurrency(this.state.value)
    }
	}

	// hide and show select list when user click one of the list options
	toggleDisplay = () => {
		this.setState((previousState) => ({
			isOpen: !previousState.isOpen,
		}));
	};

	// change the display text (currency) when user click in one of the list options
	handleChange = (value) => {
		this.setState({ value });
    const {setCurrency } = this.context;
    setCurrency({currency: value})
    localStorage.setItem("currency",value)
		this.toggleDisplay();
	};

	render() {
		return (
			<div className="select">
				<button
					className="select__btn"
					onClick={this.toggleDisplay}
					ref={this.btnRef}
				>
					{this.state.value}
					<img src={arrow} alt="arrow icon" />
				</button>
				<ul
					ref={this.selectorRef}
					className="select__list"
					style={this.state.isOpen ? { display: "flex" } : { display: "none" }}
				>
					{this.props.children.map(({ props: { children, value } }) => (
						<li
							className="select__item"
							onClick={() => this.handleChange(value)}
							key={value}
						>
							{children}
						</li>
					))}
				</ul>
			</div>
		);
	}
}
