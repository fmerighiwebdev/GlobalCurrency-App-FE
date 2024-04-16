import React from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

import "../styles/Convert.css";

import Option from "./Option";
import Rates from "./Rates";

function Convert({ type }) {
  const [currencies, setCurrencies] = React.useState([]);
  const [amount, setAmount] = React.useState(0);
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");
  const [rateInfo, setRateInfo] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const BASE_URL_FIAT = "https://api.currencybeacon.com/v1";
  const BASE_URL_CRYPTO = "https://api.swapzone.io/v1/exchange";

  React.useEffect(() => {
    async function getFiatCurrencies() {
      try {
        const result = await axios.get(
          `${BASE_URL_FIAT}/currencies?api_key=${process.env.REACT_APP_API_KEY_FIAT}`,
          type
        );
        setCurrencies(result.data.response);
        console.log(result.data.response);
      } catch (err) {
        console.error(err);
      }
    }

    async function getCryptoCurrencies() {
      try {
        const result = await axios.get(`${BASE_URL_CRYPTO}/currencies`, {
          headers: {
            "x-api-key": process.env.REACT_APP_API_KEY_CRYPTO,
          },
        });
        setCurrencies(result.data);
        console.log(result.data);
      } catch (err) {
        console.error(err);
      }
    }

    if (type === "fiat") {
      getFiatCurrencies();
    } else if (type === "crypto") {
      getCryptoCurrencies();
    }
  }, [type]);

  function handleChange(event) {
    setAmount(event.target.value);
    setRateInfo({});
  }

  function handleSelectFrom(event) {
    setFrom(event.target.value.toLowerCase());
    setRateInfo({});
  }

  function handleSelectTo(event) {
    setTo(event.target.value.toLowerCase());
    setRateInfo({});
  }

  function getSortedCurrencies() {
    return currencies.sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  async function convertFiat(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const result = await axios.get(`${BASE_URL_FIAT}/convert`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY_FIAT,
          from: from,
          to: to,
          amount: amount,
        },
      });
      console.log(result.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function convertCrypto(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const result = await axios.get(`${BASE_URL_CRYPTO}/get-rate`, {
        headers: {
          "x-api-key": process.env.REACT_APP_API_KEY_CRYPTO,
        },
        params: {
          from: from,
          to: to,
          amount: amount,
          rateType: "all"
        },
      });
      console.log(result.data)
      setRateInfo(result.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  let sortedCurrencies = [];

  if (currencies.length > 0) {
    sortedCurrencies = getSortedCurrencies();
  }

  return (
    <section className="convert">
      <Container className="convert-container">
        <h2>Converti {type === "fiat" ? "FIAT" : "CRYPTO"}</h2>
        <p>
          Seleziona attentamente la valuta {type === "crypto" ? "e la rete" : null} su cui vuoi eseguire la
          conversione
        </p>
        <form onSubmit={type === "fiat" ? convertFiat : convertCrypto}>
          <div className="select-group">
            <div className="select-element">
              <label htmlFor="from">DA:</label>
              <select id="from" name="from" onChange={handleSelectFrom}>
                {sortedCurrencies.length > 0 &&
                  sortedCurrencies.map((currency) => (
                    <Option
                      key={currency.ticker || currency.short_code}
                      currency={currency}
                      type={type}
                    />
                  ))}
              </select>
            </div>
            <div className="select-element">
              <label htmlFor="to">A:</label>
              <select id="to" name="to" onChange={handleSelectTo}>
                {sortedCurrencies.map((currency) => (
                  <Option
                    key={currency.ticker || currency.short_code}
                    currency={currency}
                    type={type}
                  />
                ))}
              </select>
            </div>
          </div>
          <div className="input-element">
            <label htmlFor="amount">Quantità:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="0.00"
              step="0.10"
              lang="en"
              onChange={handleChange}
            />
          </div>
          <button type="submit">
            {loading ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Converti"
            )}
          </button>
        </form>
        {type === "crypto" && rateInfo.amountTo && (
          <Rates rateInfo={rateInfo} />
        )}
      </Container>
    </section>
  );
}

export default Convert;
