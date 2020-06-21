import React, { useState, useEffect } from 'react';
import RatesService from '../../services/RatesService';

import './CurrencyRates.css';

const CurrencyRates = (props) => {

  const [rates, setRates] = useState([]);
  const [base, setBase] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    RatesService.getCurrencyRates()
      .then(res => {
        setRates(res.rates);
        setBase(res.base);
        setDate(res.date);
      });
  }, []);

  const getCurrencyRateTableItems = () => {
      return Object.entries(rates).map(([code,rate]) => {
        return (
          <tr key={code}>
            <td>{code}</td>
            <td>{rate}</td>
          </tr>
        );
      });
  };

  return (
    <div className="CurrencyRates">
      <h2>Currency Rates</h2>
      <hr />
      <div className="rate-info-container">
        <div className="rate-info">
          <i className="fas fa-calendar-alt"></i>
          <div className="title">DATE</div>
          <div className="detail">{date}</div>
        </div>
        <div className="rate-info">
          <i className="far fa-money-bill-alt"></i>
          <div className="title">BASE</div>
          <div className="detail">{base}</div>
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
  )
}

export default CurrencyRates;