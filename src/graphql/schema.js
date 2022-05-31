import gql from "graphql-tag";

export const GET_PRODUCTS_BY_CATEGORY = gql`
	query getProductsByCategory($input: CategoryInput) {
		category(input: $input) {
			name
			products {
				id
				name
				inStock
				gallery
				brand
				prices {
					amount
					currency {
						symbol
					}
				}
			}
		}
	}
`;

export const GET_ALL_CURRENCIES = gql`
	query getAllCurrencies {
		currencies {
			label
			symbol
		}
	}
`;

export const GET_PRODUCT = gql`
  query getProduct($productId: String!) {
    product(id: $productId) {
    id
    name
    inStock
    gallery
    description
    category
    attributes {
      id
      name
      type
      items {
        displayValue
        value
        id
      }
    }
    brand
    prices {
      currency {
        label
        symbol
      }
      amount
    }
  }
}
  `;
export const GET_CATEGORIES_NAME = gql`
  query getCategoriesName {
  categories {
    name
  }
}
`