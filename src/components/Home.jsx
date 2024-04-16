import React from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';

import '../styles/Home.css';
import currencyIcon from '../images/currency-icon.svg';

function Home() {

  const [cryptoRates, setCryptoRates] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const BASE_URL = "https://pro-api.coinmarketcap.com";

  async function getCryptoRates() {
    try {
      const result = await axios.get(`${BASE_URL}/v1/cryptocurrency/listings/latest`, {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.REACT_APP_API_KEY_COINMARKETCAP,
        },
        params: {
          limit: 5
        }
      });
      console.log(result.data);
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
          <h2>Crypto Rates</h2>
          <div className="crypto-latest">
            {/* Crypto rates will be displayed here */}
          </div>
        </div>
      </Container>
    </main>
  )
}

export default Home