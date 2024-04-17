import React from 'react';

import trendUp from '../images/trend-up.svg';
import trendDown from '../images/trend-down.svg';

function Crypto({ crypto }) {
  return (
    <li className="crypto-item">
      <div className="crypto-header">
        <h3>{crypto.name}</h3>
        <span><em>{crypto.symbol}</em></span>
      </div>
      <div className="crypto-content">
        {crypto.quote.USD.percent_change_24h > 0 ? (
          <img src={trendUp} alt="Trend Up" />
        ) : (
          <img src={trendDown} alt="Trend Down" />
        )}
        <p>{crypto.quote.USD.price.toFixed(2)} $</p>
        <span className={crypto.quote.USD.percent_change_24h > 0 ? "green-text" : "red-text"}>{crypto.quote.USD.percent_change_24h.toFixed(2)}%</span>
      </div>
    </li>
  );
}

export default Crypto