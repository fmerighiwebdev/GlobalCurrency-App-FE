import React from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

import Currency from "./Currency";

import "../styles/Currencies.css";

function Currencies() {
  const [currencies, setCurrencies] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [isActive, setIsActive] = React.useState("");

  const BASE_URL_FIAT = "https://api.currencybeacon.com/v1";
  const BASE_URL_CRYPTO = "https://api.swapzone.io/v1/exchange";

  async function getFiatCurrencies() {
    setLoading(true);
    setIsActive("fiat");
    const type = "fiat";

    try {
      const result = await axios.get(
        `${BASE_URL_FIAT}/currencies?api_key=${process.env.REACT_APP_API_KEY_FIAT}`,
        type
      );
      setCurrencies(result.data.response);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function getCryptoCurrencies() {
    setLoading(true);
    setIsActive("crypto");

    try {
      const result = await axios.get(
        `${BASE_URL_CRYPTO}/currencies`, {
          headers: {
            "x-api-key": process.env.REACT_APP_API_KEY_CRYPTO
          }
        }
      );
      setCurrencies(result.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function getSortedCurrencies() {
    return currencies.sort((a, b) => a.name > b.name ? 1 : -1);
  }

  const sortedCurrencies = getSortedCurrencies();

  return (
    <section className="currencies">
      <Container className="currencies-container">
        <h2>Valute supportate</h2>

        <div className="select-currency">
          <button
            onClick={getFiatCurrencies}
            className={isActive === "fiat" ? "active" : null}
          >
            Fiat
          </button>
          <button
            onClick={getCryptoCurrencies}
            className={isActive === "crypto" ? "active" : null}
          >
            Crypto
          </button>
        </div>

        <div className="currencies-list-container">
          {loading && (
            <div className="loading-container">
              <div className="spinner-grow text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {currencies.length > 0 ? (
            <ul className="currencies-list">
              {sortedCurrencies.map((currency, index) => {
                return <Currency key={index} currency={currency} />;
              })}
            </ul>
          ) : (
            <p className="no-currencies">
              Seleziona un tipo di valute da visualizzare
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}

export default Currencies;
