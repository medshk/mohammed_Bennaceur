import React, { Component } from 'react'

export default class Option extends Component {
  render() {
    return (
     <li value={this.props.value}>
       {this.props.children}
     </li>
    )
  }
}
