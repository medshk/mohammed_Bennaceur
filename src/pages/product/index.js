import React, { Component } from "react";
import ProductNameAndBrand from "../../components/dataDisplay/ProductNameAndBrand";
import ProductPrice from "../../components/dataDisplay/ProductPrice";
import { withApollo } from "react-apollo";
import "./style.scss";
import { Query } from "react-apollo";
import { GET_PRODUCT } from "../../graphql/schema";
import TextRadio from "../../components/inputs/TextRadio";
import SwatchRadio from "../../components/inputs/SwatchRadio";
import CartContext from "../../contexts/CartContext";
import parse from 'html-react-parser';

export class Product extends Component {
	static contextType = CartContext;

	constructor(props) {
		super(props);
		const { id } = this.props.match.params;
		this.state = {
			productId: id,
			attributes: [],
			quantity: 1,
      prices: [],
		};
	}

  componentWillMount() { 
    this.initState()
   }

   componentWillUnmount() {
     this.setState(null)
    }
   
  initState = async () => {
    // init the state with the first item of each attribute
		const { id } = this.props.match.params;
		const data = await this.props.client.query({
			query: GET_PRODUCT,
			variables: {
				productId: id,
			},
      fetchPolicy: 'network-only',
		})
      const initAttributes = data.data.product.attributes.map(({ name, items }) => {
        const { id , value } = items[0]
       return {id,name,value}
      })
      this.setState({ attributes: initAttributes ,prices: [...data.data.product.prices]})
  }

  

	setAttributes = (att) => {
		//find or create attribute
		const attribute = this.state.attributes.find(
			(item) => item.name === att.name
		);
		// if attribute exists update the attributes array
		if (attribute) {
			const updatedArray = this.state.attributes.map((item) => {
				if (item.name === att.name) {
					return att;
				}
				return item;
			});
			this.setState({ attributes: updatedArray });
		}
		// create new attribute
		else {
			this.setState((prevState) => ({
				attributes: [...prevState.attributes, att],
			}));
		}
	};

	handleClick = () => {
		const { setCart, getIdCounter, cart } = this.context;

		//find if product with same attributes exists in cart
		const product = cart.find(
			(item) =>
				item.productId === this.state.productId &&
				item.attributes.length === this.state.attributes.length &&
				item.attributes.every(
					(value, index) =>
						value.name === this.state.attributes[index].name &&
						value.value === this.state.attributes[index].value
				)
		);

		// if product exists update product's quantity
		if (product) {
			const updatedArray = cart.map((item) => {
				if (item.id === product.id) {
					return { ...item, quantity: item.quantity + 1 };
				}
				return item;
			});
			setCart(updatedArray);
		}
		// create new product
		else {
			setCart([...cart, { id: getIdCounter(), ...this.state }]);
		}
    alert("Product added to cart ")
	};
	render() {
		const { id } = this.props.match.params;
		return (
			<Query query={GET_PRODUCT} variables={{ productId: id }} fetchPolicy="network-only">
				{({ loading, error, data }) => {
					if (loading) return "loading";
					if (error) return "Error" + error;
					const {
						name,
						brand,
						inStock,
						gallery,
						prices,
						attributes,
						description,
					} = data.product ? data.product : {} ;
					if(Object.keys(data).length !== 0) return (
						<div className="product">
							<div className="product-column1">
								{gallery.map((image) => (
									<div className="product__image" key={image}>
										<img src={image} alt="" />
									</div>
								))}
							</div>
							<div className="product-column2">
								<img src={gallery[0]} alt="product" />
							</div>
							<div className="product-column3">
								<ProductNameAndBrand size="big" content={{ name, brand }} />
								{attributes.sort((a,b) => {
                  if(a.type === "text") return -1
                  else return 1
                }).map((attribute) => {
									if (attribute.type === "text") {
										return (
											<TextRadio
												size="big"
												content={attribute}
												setState={this.setAttributes}
												key={attribute.id}
                        selectedItem={this.state.attributes.find(
													(att) => att.name === attribute.name
												)}

                      
											/>
										);
									} else
										return (
											<SwatchRadio
												size="big"
												content={attribute}
												key={attribute.id}
												setState={this.setAttributes}
                        selectedItem={this.state.attributes.find(
													(att) => att.name === attribute.name
												)}
											/>
										);
								})}
								<ProductPrice size="big" title="price" content={prices} />
								<button
									className="product__submit-btn"
									disabled={inStock ? false : true}
									style={inStock ? { opacity: 1 } : { opacity: 0.5 }}
									onClick={this.handleClick}
								>
									{inStock ? "add to cart" : "out of stock"}
								</button>
								<div
									className="product__description"
								>
                  {parse(description)}
                  </div>
							</div>
						</div>
					);
				}}
			</Query>
		);
	}
}

export default withApollo(Product);
