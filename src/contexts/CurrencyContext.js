import React, { Component } from 'react'

const CurrencyContext = React.createContext()

export class CurrencyProvider extends Component {

  state = {
    currency : localStorage.getItem("currency") ? localStorage.getItem("currency") : "$"
  }

  setCurrency = (currency) => {
    this.setState(prevState => currency)
  }
  render() {
    const { children } = this.props
    const { currency } = this.state
    const { setCurrency } = this

    return (
      <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
    )
  }
}

export default CurrencyContext
