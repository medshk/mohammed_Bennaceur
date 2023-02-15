import React, { Component } from "react";
import { withApollo } from "react-apollo";
import { GET_PRODUCTS_BY_CATEGORY } from "../../../graphql/schema";
import BooleanFilter from "../booleanFilter";
import ColorFilter from "../colorfilter";
import SelectFilter from "../selectFilter";
import "./style.scss";

export class Productsfilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colorAtt: [],
      booleanAtt: [],
      selectAtt: [],
      selectedColors: this.props.queryParams.colors || [],
      selectedBooleans: this.props.queryParams.booleans || [],
      selectedOptions: this.props.queryParams.options || [],
    };
  }
  componentDidMount() {
    this.initState();
  }

  initState = async () => {
    const data = await this.props.client.query({
      query: GET_PRODUCTS_BY_CATEGORY,
      variables: {
        input: { title: "all" },
      },
      fetchPolicy: "no-cache",
    });
    this.getFilterAttributes(data.data.category.products);
  };

  getFilterAttributes = (products) => {
    // create a Set for color and attributes with boolean values
    // for the other attributes create a Map with att name as key and a Set as value
    const colorAtt = new Set();
    const booleanAtt = new Set();
    const selectAtt = new Map();
    products.forEach(({ attributes, name }) => {
      attributes.forEach((att) => {
        if (att.name === "Color") {
          const colorValues = att.items.map((item) => colorAtt.add(item.value));
        } else if (
          att.items[0].value === "Yes" ||
          att.items[0].value === "No"
        ) {
          booleanAtt.add(att.name);
        } else {
          if (selectAtt.has(att.name)) {
            att.items.forEach((item) => {
              selectAtt.set(att.name, selectAtt.get(att.name).add(item.value));
            });
          } else {
            const array = att.items.map((item) => item.value);

            selectAtt.set(att.name, new Set(array));
          }
        }
      });
    });

    this.setState({
      colorAtt: [...colorAtt],
      booleanAtt: [...booleanAtt],
      selectAtt: [...selectAtt],
    });
  };

  setSelectedColors = (colors) => {
    this.setState({ selectedColors: [...colors] }, this.pushQueryParams);
  };

  setSelectedBooleans = (att) => {
    const values = this.setSelectedAttributes(att, this.state.selectedBooleans);
    this.setState(
      {
        selectedBooleans: [...values],
      },
      this.pushQueryParams
    );
  };
  setSelectedOptions = (att) => {
    const values = this.setSelectedAttributes(att, this.state.selectedOptions);
    this.setState({ selectedOptions: [...values] }, this.pushQueryParams);
  };
  setSelectedAttributes = (att, state) => {
    // check if attribute already exists
    const attribute = state.find((item) => item.attName === att.attName);
    if (attribute) {
      if (!att.value) {
        // if attribute has no value delete it
        return [...state.filter((item) => item.attName !== att.attName)];
      }
      // otherwise update it
      else {
        const newArray = state.map((item) => {
          if (item.attName === att.attName) {
            return att;
          } else {
            return item;
          }
        });
        return [...newArray];
      }
    } else {
      // if none of the above cases add attribute for the first time
      return [...state, att];
    }
  };

  pushQueryParams = () => {
    const params = {
      ...(this.state.selectedColors.length && {
        colors: [...this.state.selectedColors],
      }),
      ...(this.state.selectedBooleans.length && {
        booleans: JSON.stringify([...this.state.selectedBooleans]),
      }),
      ...(this.state.selectedOptions.length && {
        options: JSON.stringify([...this.state.selectedOptions]),
      }),
    };
    this.props.history.push({
      pathname: "/" + this.props.categoryName,
      search: new URLSearchParams(params).toString(),
    });
  };
  render() {
    return (
      <div className="filter">
        <div className="filter-container">
          <p className="filter__title">Filter by :</p>
          <ColorFilter
            content={this.state.colorAtt}
            setSelectedColors={this.setSelectedColors}
            selectedColors={this.state.selectedColors}
          />
          {this.state.booleanAtt.map((att) => {
            const isExist = this.state.selectedBooleans.find(
              (item) => item.attName === att
            );
            if (isExist) {
              return (
                <BooleanFilter
                  att={att}
                  key={att}
                  setSelectedBooleans={this.setSelectedBooleans}
                  selectedValue={isExist.value}
                />
              );
            } else
              return (
                <BooleanFilter
                  att={att}
                  key={att}
                  setSelectedBooleans={this.setSelectedBooleans}
                />
              );
          })}
          {this.state.selectAtt.map((att) => {
            const isExist = this.state.selectedOptions.find(
              (item) => item.attName === att[0]
            );
            if (isExist) {
              return (
                <SelectFilter
                  content={att}
                  key={att[0]}
                  setSelectedOptions={this.setSelectedOptions}
                  selectedValue={isExist.value}
                />
              );
            } else
              return (
                <SelectFilter
                  content={att}
                  key={att[0]}
                  setSelectedOptions={this.setSelectedOptions}
                />
              );
          })}
        </div>
      </div>
    );
  }
}

export default withApollo(Productsfilter);
