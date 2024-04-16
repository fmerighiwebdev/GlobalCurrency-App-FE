import React from 'react';

import conversionImage from "../images/convert.svg";

function Rates({ rateInfo }) {
return (
    <div className="rate-info">
        <div className="rate-from">
            <span>{rateInfo.amountFrom.toFixed(2)}</span>
            <p>{rateInfo.from.toUpperCase()}</p>
        </div>
        <div className="arrow">
            <img src={conversionImage} alt="Conversion" />
        </div>
        <div className="rate-to">
            <span>{rateInfo.amountTo.toFixed(2)}</span>
            <p>{rateInfo.to.toUpperCase()}</p>
        </div>
    </div>
);
}

export default Rates;