import React, { Component } from "react";
import "./style.scss";
export default class SelectFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: this.props.selectedValue || "",
    };
  }

  handleChange = (e) => {
    this.setState({ selectedValue: e.target.value }, this.updateParentState);
  };

  discardChanges = () => {
    this.setState({ selectedValue: "" }, this.updateParentState);
  };

  updateParentState = () => {
    this.props.setSelectedOptions({
      attName: this.props.content[0],
      value: this.state.selectedValue,
    });
  };
  render() {
    const attributeName = this.props.content[0];
    const values = [...this.props.content[1]];
    return (
      <div className="filter__select">
        <label htmlFor={attributeName}>{attributeName}</label>
        <select
          id={attributeName}
          value={this.state.selectedValue}
          onChange={this.handleChange}
        >
          <option disabled value={""} defaultChecked>
            Choose a {attributeName}
          </option>
          {values.map((val) => (
            <option value={val} key={val}>
              {val}
            </option>
          ))}
        </select>
        <button
          className="filter__select-unselect-btn"
          onClick={this.discardChanges}
        >
          Unselect
        </button>
      </div>
    );
  }
}
