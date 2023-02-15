import React, { Component } from "react";
import "./style.scss";
export default class ColorFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedColors: this.props.selectedColors || [],
    };
  }
  handleChange = (e) => {
    const { value, checked } = e.target;
    console.log("e", value);
    if (checked) {
      this.setState(
        { selectedColors: [...this.state.selectedColors, value] },
        this.updateParentState
      );
    } else {
      this.setState(
        {
          selectedColors: this.state.selectedColors.filter(
            (color) => color !== value
          ),
        },
        this.updateParentState
      );
    }
  };

  updateParentState = () => {
    this.props.setSelectedColors(this.state.selectedColors);
  };
  render() {
    const colors = this.props.content;
    return (
      <div className="filter__color">
        <p>Color</p>
        <div className="filter__color-content">
          {colors.map((item) => (
            <React.Fragment key={item}>
              <input
                type="checkbox"
                name={`${item}`}
                value={item}
                id={item}
                onChange={this.handleChange}
                checked={
                  true
                    ? this.state.selectedColors.find(
                        (color) => color === item
                      ) === item
                    : false
                }
              />
              <label htmlFor={item} style={{ backgroundColor: item }}></label>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
}
