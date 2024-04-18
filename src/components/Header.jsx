import React from 'react'
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import currencyLogo from '../images/currency-icon.svg';
import downArrow from '../images/down-arrow.svg';

import '../styles/Header.css';

function Header() {

  const [isActive, setIsActive] = React.useState(false);

  function handleHover() {
    setIsActive(true);
  }

  function handleLeave() {
    setIsActive(false);
  }

  return (
    <header>
      <Container className="header-container">
        <div className="header-logo">
          <Link to="/">
            <img src={currencyLogo} alt="Currency Converter" />
          </Link>
          <h1>GlobalCurrency App</h1>
        </div>
        <nav className="header-menu">
          <ul className="menu-items">
            <li className="sub-menu-link" onMouseOver={handleHover} onMouseLeave={handleLeave}>
              <p>Converti</p>
              <img src={downArrow} alt="Arrow" />
              {isActive && (
                <ul className="sub-menu">
                  <li>
                    <Link aria-disabled="true" role="link">FIAT</Link>
                  </li>
                  <li>
                    <Link to="/convert-crypto">CRYPTO</Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="menu-link">
              <Link to="/validate">Verifica indirizzi</Link>
            </li>
            <li className="menu-link">
              <Link to="/currencies">Valute supportate</Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header