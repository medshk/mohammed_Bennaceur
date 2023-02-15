import React, { Children, Component } from "react";
import { GET_PRODUCTS_BY_CATEGORY } from "../graphql/schema";
import { withApollo } from "react-apollo";

const ProductContext = React.createContext();

class Provider extends Component {
  state = {
    products: [],
  };
  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    const title = this.props.param || "all";
    const data = await this.props.client.query({
      query: GET_PRODUCTS_BY_CATEGORY,
      variables: {
        input: { title },
      },
      fetchPolicy: "no-cache",
    });
    this.setProducts(data.data.category.products);
    console.log("dayyyyy", data.data.category.products);
  };
  setProducts = (products) => {
    console.log("param", this.props.param);
    // console.log("wayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy", products);
    this.setState({ products });
  };
  getProducts = () => this.state.products;
  render() {
    const { children } = this.props;
    const { setProducts, getProducts } = this;
    return (
      <ProductContext.Provider value={{ setProducts, getProducts }}>
        {children}
      </ProductContext.Provider>
    );
  }
}
export const ProductProvider = withApollo(Provider);
export default ProductContext;
