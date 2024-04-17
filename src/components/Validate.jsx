import React from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

import "../styles/Validate.css";
import checkIcon from "../images/check.svg";
import crossIcon from "../images/x.svg";

import Option from "./Option";

function Validate() {
  const [crypto, setCrypto] = React.useState([]);
  const [address, setAddress] = React.useState("");
  const [currency, setCurrency] = React.useState("");
  const [isValid, setIsValid] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const BASE_URL = "http://localhost:5000";

  async function getAllCrypto() {
    try {
      const result = await axios.get(`${BASE_URL}/api/get-crypto-currencies`);
      setCrypto(result.data);
    } catch (err) {
      console.error(err);
    }
  }

  React.useEffect(() => {
    getAllCrypto();
  }, []);

  async function validateAddress(e) {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await axios.get(`${BASE_URL}/api/validate-address`, {
        params: {
          address,
          currency,
        },
      });
      setIsValid(result.data);
      setShow(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setShow(false);
    setAddress(e.target.value);
  }

  function handleSelect(e) {
    setShow(false);
    setCurrency(e.target.value);
  }

  function getSortedCrypto() {
    return crypto.sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  const sortedCrypto = getSortedCrypto();

  return (
    <section className="validate-address">
      <Container className="validate-address-container">
        <h2>Verifica indirizzi</h2>
        <form className="validate-form" onSubmit={validateAddress}>
          <input
            type="text"
            name="address"
            placeholder="Inserisci un indirizzo"
            onChange={handleChange}
          />
          <select name="currency" onChange={handleSelect}>
            {sortedCrypto.map((currency, index) => (
              <Option currency={currency} key={index} type={"crypto"} />
            ))}
          </select>
          <button type="submit" disabled={loading}>
            {loading ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Verifica"
            )}
          </button>
        </form>
        {show && (
          <div
            className={
              isValid
                ? "result valid"
                : !isValid
                ? "result not-valid"
                : "result"
            }
          >
            <img
              src={isValid ? checkIcon : !isValid ? crossIcon : null}
              alt={isValid ? "check" : !isValid ? "cross" : null}
            />
            <p>
              Il tuo indirizzo <em>"{address}"</em>{" "}
              <span>{isValid ? "è VALIDO" : "NON è valido"}</span>
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}

export default Validate;
