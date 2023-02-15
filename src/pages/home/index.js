import React, { Component } from "react";
import "./style.scss";
import { Query } from "react-apollo";
import { GET_PRODUCTS_BY_CATEGORY } from "../../graphql/schema";
import ProductsFilter from "../../components/filters/ProductsFilter";
import ProductGrid from "../../components/dataDisplay/ProductsGrid";

export default class Home extends Component {
  getQueryParams = () => {
    let params = new URLSearchParams(this.props.location.search);
    const colors = [];
    const booleans = [];
    const options = [];
    params.forEach((param, key) => {
      if (key === "colors") {
        colors.push(...param.split(","));
      } else if (key === "booleans") {
        booleans.push(...JSON.parse(param));
      } else {
        options.push(...JSON.parse(param));
      }
    });
    return { colors, booleans, options };
  };
  render() {
    const queryParams = this.getQueryParams();

    const categoryName = this.props.match.params.name || "all";
    return (
      <div className="home">
        <div className="home-container">
          <div className="home-columnOne">
            <ProductsFilter
              history={this.props.history}
              queryParams={queryParams}
              categoryName={categoryName}
            />
          </div>
          <div className="home-columnTwo">
            <h1 className="home__category">{categoryName}</h1>

            <div className="home-grid">
              <Query
                query={GET_PRODUCTS_BY_CATEGORY}
                variables={{ input: { title: categoryName } }}
                fetchPolicy="no-cache"
              >
                {({ loading, error, data }) => {
                  if (loading) return "Loading...";

                  if (error) return `Error! ${error.message}`;
                  if (Object.keys(data).length !== 0)
                    return (
                      <ProductGrid
                        products={data.category.products}
                        queryParams={queryParams}
                      />
                    );
                }}
              </Query>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
