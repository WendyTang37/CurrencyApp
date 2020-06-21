import React, { useState } from 'react';

import Rates from '../Rates/Rates';
import RatesService from '../../services/RatesService'
import './HistoricalRates.css'

const HistoricalRates = (props) => {
  const [rateData, setRateData] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

  const selectDate = (e) => {
    setSelectedDate(e.target.value);
  }

  const submitDateForm = (e) => {
    e.preventDefault();
    // const date = e.target.value;
    RatesService.getHistoricalRates(selectedDate)
      .then(res => {
        setRateData(res);
      });
  }

  return (
    <section className="HistoricalRates">
      <h2>Historical Rates</h2>
      <hr />
      <div className="date-form-container">
        <form className="date-form" onSubmit={submitDateForm}>
          <div className="date-input-container">
            <label className="date-label" htmlFor="date">Enter Date</label>
            <input className="date-input" 
              id="date" 
              name="date" 
              type="date" 
              min="1999-01-04" 
              onChange={selectDate}
              required />
          </div>
          <div className="date-button-container">
            <button className="date-submit-button" type="submit">Get Rates</button>
          </div>
        </form>
      </div>
      {rateData ? <Rates rateData={rateData} /> : null}
    </section>
  )
}

export default HistoricalRates;