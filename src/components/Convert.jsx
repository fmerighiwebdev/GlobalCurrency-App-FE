import React from 'react';
import { Container } from 'react-bootstrap';

import '../styles/Convert.css';

function Convert({ type }) {
  return (
    <section className="convert">
      <Container className="convert-container">
        <h2>Converti {type === "fiat" ? "FIAT" : "CRYPTO"}</h2>
        <form>
          <label htmlFor="amount">Amount:</label>
          <input type="number" id="amount" name="amount" />
          <label htmlFor="from">From:</label>
          <select id="from" name="from">
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="btc">BTC</option>
            <option value="eth">ETH</option>
          </select>
          <label htmlFor="to">To:</label>
          <select id="to" name="to">
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="btc">BTC</option>
            <option value="eth">ETH</option>
          </select>
          <button type="submit">Convert</button>
        </form>
      </Container>
    </section>
  )
}

export default Convert