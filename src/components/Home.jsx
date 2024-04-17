import React from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';

import '../styles/Home.css';
import currencyIcon from '../images/currency-icon.svg';
import Crypto from './Crypto';

function Home() {

  const [cryptoRates, setCryptoRates] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const BASE_URL = "http://localhost:5000";

  async function getCryptoRates() {
    try {
      const result = await axios.get(`${BASE_URL}/api/get-crypto-rates`);
      setCryptoRates(result.data.data);
      console.log(result.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getCryptoRates();
  }, []);

  return (
    <main className="home">
      <Container className="home-container">
        <div className="hero-logo">
          <img src={currencyIcon} alt="Currency Icon" />
        </div>
        <div className="main-crypto-latest">
          {loading && (
            <div className="loading-container">
              <div className="spinner-grow text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          <h2>Crypto Rates</h2>
          <ul className="crypto-latest">
            {cryptoRates.length > 0 &&
              cryptoRates.map((crypto, index) => {
                return <Crypto key={index} crypto={crypto} />;
              })}
          </ul>
        </div>
      </Container>
    </main>
  );
}

export default Home