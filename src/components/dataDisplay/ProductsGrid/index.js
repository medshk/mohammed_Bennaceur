import React, { Component } from "react";
import ProductCard from "../../cards/ProductCard";
import "./style.scss";

export default class ProductGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: this.props.products,
    };
  }

  filterProducts = () => {
    const { colors, booleans, options } = this.props.queryParams;
    const products = this.props.products;
    // filtering products
    const filterdProducts = products.filter((product) => {
      if (!colors.length && !booleans.length && !options.length) return true;
      // console.log("product", product.name, "_____", product.attributes);
      if (!product.attributes.length) return false;
      let hasColor = true;
      let hasBoolean = true;
      let hasOption = true;

      // check if product has color attribute
      if (colors.length) {
        const attribute = product.attributes.find(
          (att) => att.name === "Color"
        );
        if (attribute) {
          // check if product has atleast one color that belong to color filter
          const isExist = attribute.items.find((clr) =>
            colors.includes(clr.value)
          );
          hasColor = !!isExist;
        } else hasColor = false;
      }

      // check if product has attributes with yes no value
      if (booleans.length) {
        hasBoolean = booleans.every((bool) => {
          const attribute = product.attributes.find(
            (att) => att.name === bool.attName
          );
          return true
            ? (attribute && bool.value === "yes") ||
                (!attribute && bool.value === "no")
            : false;
        });
      }

      // check if product has select option attributes
      if (options.length) {
        hasOption = options.every((option) => {
          const attribute = product.attributes.find(
            (att) => att.name === option.attName
          );
          if (attribute) {
            const isSameValue = attribute.items.find(
              (item) => item.value === option.value
            );
            return true ? attribute && isSameValue : false;
          } else {
            return false;
          }
        });
      }

      // return true if product match all filter attribute
      return hasColor && hasBoolean && hasOption;
    });

    return filterdProducts;
  };

  componentDidMount() {
    this.filterProducts();
  }
  render() {
    const products = this.filterProducts();
    return (
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
        {!products.length && (
          <p className="product-not-found">Product Not Found !</p>
        )}
      </div>
    );
  }
}
