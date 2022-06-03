import React, { Component } from "react";
import ProductCard from "../../components/cards/ProductCard";
import "./style.scss";
import { Query } from "react-apollo";
import {
	GET_PRODUCTS_BY_CATEGORY,
} from "../../graphql/schema";


export default class Home extends Component {
	render() {
		const categoryName = this.props.match.params.name || "all";
		return (
			<div className="home">
				<div className="home-container">
					<h1 className="home__category">{categoryName}</h1>
					<div className="home-grid">
						<Query
							query={GET_PRODUCTS_BY_CATEGORY}
							variables={{ input:{title: categoryName} }}
							fetchPolicy="no-cache"
						>
							{({ loading, error, data }) => {
								if (loading) return "Loading...";

								if (error) return `Error! ${error.message}`;
                if(Object.keys(data).length !== 0) return data.category.products.map((product) => (
									<ProductCard product={product} key={product.id} />
								));
							}}
						</Query>
					</div>
				</div>
			</div>
		);
	}
}
