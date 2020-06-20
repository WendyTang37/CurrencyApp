import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './CurrencyRates.css';

const CurrencyRates = (props) => {

  const [rates, setRates] = useState(null);

  useEffect(() => {
    axios('https://api.exchangeratesapi.io/latest?base=USD')
    .then(res => setRates(res.data));
  }, []);

  const getCurrencyRateTableItems = () => {
    // if(rates) {
      // console.log(rates);
      return Object.entries(rates.rates).map(([code,rate]) => {
        return (
          <tr key={code}>
            <td>{code}</td>
            <td>{rate}</td>
          </tr>
        );
      });

    // }
  };

  const display = () => {
    if(rates) {
      return (
        <div>
          <div className="rate-info-container">
            <div className="rate-info">
              <i class="fas fa-calendar-alt"></i>
              <div className="title">DATE</div>
              <div calssName="detail">{rates.date}</div>
            </div>
            <div className="rate-info">
              <i class="far fa-money-bill-alt"></i>
              <div className="title">BASE</div>
              <div className="detail">{rates.base}</div>
            </div>

          </div>
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>
              {getCurrencyRateTableItems()}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }


  return (
    <div className="CurrencyRates">
      <h2>Currency Rates</h2>
      <hr />
      {display()}
     
    </div>
  )
}

export default CurrencyRates;