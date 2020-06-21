import React, { useState, useEffect } from 'react';

import RatesService from '../../services/RatesService';
import './ExchangeRates.css';


const ExchangeRates = (props) => {
    const [currencies, setCurrencies] = useState([]);
    const [selectedCurrencyFrom, setSelectedCurrencyFrom] = useState('');
    const [selectedCurrencyTo, setSelectedCurrencyTo] = useState('');
    const [amount, setAmount] = useState(0);
    const [converted, setConverted] = useState(0);

    useEffect(() => {
        RatesService.getCurrencies()
            .then(res => {
                setCurrencies(res);
            });
    }, []);

    const getCurrenciesDropDown = () => {
        return currencies.map((currency) => <option key={currency} value={currency}>{currency}</option>);
    }

    const changeSelectedCurrencyFrom = (e) => {
        setSelectedCurrencyFrom(e.target.value);
    }

    const changeSelectedCurrencyTo = (e) => {
        setSelectedCurrencyTo(e.target.value);
    }

    const changeAmount = (e) => {
        setAmount(e.target.value);
    }

    const convertCurrency = (e) => {
        e.preventDefault();
        RatesService.convert(selectedCurrencyFrom, selectedCurrencyTo, amount)
            .then(res => {
                setConverted(res);
            });
    }

    return (
        <section className="ExchangeRates">
            <h2>Exchange Rates</h2>
            <hr/>
            <form className="conversion-container" onSubmit={convertCurrency}>
                <div className="field-container">
                    <label className="from-currency-label" htmlFor="from-currency" >From</label>
                    <select className="from-currency-select" 
                            placeholder="select"
                            id="from-currency" 
                            name="from-currency" 
                            value={selectedCurrencyFrom} 
                            onChange={changeSelectedCurrencyFrom}
                            required>
                        <option value="">Select Currency</option>
                        {getCurrenciesDropDown()}
                    </select>
                </div>
                <div className="field-container"> 
                    <label className="to-currency-label" htmlFor="to-currency">To</label>
                    <select className="to-currency-select" 
                            id="to-currency" 
                            name="to-currency"
                            value={selectedCurrencyTo} 
                            onChange={changeSelectedCurrencyTo}
                            required>
                        <option value="">Select Currency</option>
                        {getCurrenciesDropDown()}
                    </select>
                </div>
                <div className="field-container">
                    <label className="amount-label" htmlFor="amount">Amount</label>
                    <input className="amount-input" 
                            type="tel" id="amount" 
                            name="amount" 
                            value={amount} 
                            onChange={changeAmount}
                            required 
                            />
                </div>
                <div className="convert-button-container">
                    <button className="convert-button" type="submit">Convert</button>
                </div>
            </form>
            <div className="conversion-result-container">
                {amount} {selectedCurrencyFrom} = {converted} {selectedCurrencyTo}
            </div>
        </section>
    );
}

export default ExchangeRates;