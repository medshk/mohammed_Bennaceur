import React, { Component } from "react";
import { Option, Select } from "../../dropDowns/SelectOptions";
import "./Header.scss";
import logo from "../../../assets/icons/logo.svg";
import BagDropDown from "../../dropDowns/BagDropDrown/BagDropDown";
import { Query } from "react-apollo";
import {
	GET_ALL_CURRENCIES,
	GET_CATEGORIES_NAME,
} from "../../../graphql/schema";
import { Link } from "react-router-dom";

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: localStorage.getItem("category")
				? localStorage.getItem("category")
				: "all",
		};
	}

	handleClick = (name) => {
		this.setState({
			name,
		});
		localStorage.setItem("category", name);
	};

	render() {
		return (
			<header className="header">
				<div className="header-container">
					<nav className="header__nav">
						<Query query={GET_CATEGORIES_NAME}>
							{({ loading, error, data }) => {
								if (loading) return "...";
								if (error) return "Error" + error;
								return data.categories.map((ctg) => (
									<Link
										key={ctg.name}
										className={`header__link ${
											this.state.name === ctg.name ? "header__link--active" : ""
										}`}
										to={`/${ctg.name}`}
										onClick={() => this.handleClick(ctg.name)}
									>
										{ctg.name}
									</Link>
								));
							}}
						</Query>
					</nav>
					<div className="header__logo">
						<img src={logo} alt="" />
					</div>
					<div className="header-buttons-wrapper">
						<Query query={GET_ALL_CURRENCIES}>
							{({ loading, error, data }) => {
								if (loading) return <p>$</p>;

								if (error) return `Error! ${error.message}`;

								return (
									<Select>
										{data.currencies.map((currency) => (
											<Option value={currency.symbol} key={currency.symbol}>
												{currency.label}
											</Option>
										))}
									</Select>
								);
							}}
						</Query>

						<BagDropDown />
					</div>
				</div>
			</header>
		);
	}
}
