import React from 'react'

function Currency({ currency }) {
  return (
    <li className="currency">
      <p style={{ color: "white" }}>{currency.name ? currency.name : currency.ticker.toUpperCase()}</p>
      <p style={{ color: "white" }}>{currency.short_code || currency.ticker}</p>
    </li>
  );
}

export default Currency