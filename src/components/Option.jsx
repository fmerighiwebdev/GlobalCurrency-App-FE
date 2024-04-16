import React from "react";

function Option({ currency, type }) {
  return (
    <option value={type === "fiat" ? currency.short_code : currency.ticker}>
      {type === "fiat"
        ? `${currency.name} (${currency.short_code})`
        : currency.name
        ? `${currency.name} (${currency.ticker})`
        : currency.ticker.toUpperCase()}
    </option>
  );
}

export default Option;
