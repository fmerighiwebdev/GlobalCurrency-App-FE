import React from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

import Currency from "./Currency";

import "../styles/Currencies.css";

function Currencies() {
  const [currencies, setCurrencies] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [isActive, setIsActive] = React.useState("");

  const BASE_URL = "http://localhost:5000";

  async function getFiatCurrencies() {
    setLoading(true);
    setIsActive("fiat");
    const type = "fiat";

    try {
      const result = await axios.get(
        `${BASE_URL}/api/get-fiat-currencies`,
        {
          params: {
            type,
          },
        }
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
      const result = await axios.get(`${BASE_URL}/api/get-crypto-currencies`);
      setCurrencies(result.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function getSortedCurrencies() {
    return currencies.sort((a, b) => (a.name > b.name ? 1 : -1));
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
