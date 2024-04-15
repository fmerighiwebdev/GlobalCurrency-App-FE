import React from 'react'

function CryptoOption({ currency }) {
  return (
    <option value={currency.ticker}>
      {currency.name ? currency.name : currency.ticker}
    </option>
  );
}

export default CryptoOption