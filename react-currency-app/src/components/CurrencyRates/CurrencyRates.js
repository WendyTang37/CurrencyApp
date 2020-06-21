import React, { useState, useEffect } from 'react';
import RatesService from '../../services/RatesService';
import Rates from '../Rates/Rates';

import './CurrencyRates.css';

const CurrencyRates = (props) => {
  const [rateData, setRateData] = useState(null);

  useEffect(() => {
    RatesService.getCurrencyRates()
      .then(res => {
        setRateData(res);
      });
  }, []);

  return (
    <section className="CurrencyRates">
      <h2>Currency Rates</h2>
      <hr />
      {rateData ? <Rates rateData={rateData} /> : null}
    </section>
  )
}

export default CurrencyRates;