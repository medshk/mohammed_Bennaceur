import React, { Component } from "react";

import "./style.scss";
export default class BooleanFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: this.props.selectedValue || "",
    };
  }
  handleChange = (e) => {
    const { value, checked } = e.target;
    console.log("e", value);
    if (checked) {
      this.setState({ selectedValue: value }, this.updateParentState);
    } else {
      this.setState(
        {
          selectedValue: "",
        },
        this.updateParentState
      );
    }
  };

  updateParentState = () => {
    this.props.setSelectedBooleans({
      attName: this.props.att,
      value: this.state.selectedValue,
    });
  };
  render() {
    const att = this.props.att;
    return (
      <div className="filter__boolean">
        <p>{att}</p>
        <div className="filter__boolean-content">
          <input
            type="checkbox"
            name="yes"
            value="yes"
            id={`${att}yes`}
            onChange={this.handleChange}
            checked={true ? this.state.selectedValue === "yes" : false}
          />
          <label htmlFor={`${att}yes`}>Yes</label>
          <input
            type="checkbox"
            name="no"
            value="no"
            id={`${att}no`}
            onChange={this.handleChange}
            checked={true ? this.state.selectedValue === "no" : false}
          />
          <label htmlFor={`${att}no`}>No</label>
        </div>
      </div>
    );
  }
}
