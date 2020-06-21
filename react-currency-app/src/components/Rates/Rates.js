import React from 'react';

import './Rates.css';

const Rates = (props) => {
    // const rateData = props.rateData;
    const getCurrencyRateTableItems = () => {
        return Object.entries(props.rateData.rates).map(([code,rate]) => {
            return (
                <tr key={code}>
                    <td>{code}</td>
                    <td>{rate}</td>
                </tr>
            );
        });
    };
        
    return (
        <div className="Rates">
            <div className="rate-info-container">
                <div className="rate-info">
                    <i className="fas fa-calendar-alt"></i>
                    <div className="title">DATE</div>
                    <div className="detail">{props.rateData.date}</div>
                </div>
                <div className="rate-info">
                    <i className="far fa-money-bill-alt"></i>
                    <div className="title">BASE</div>
                    <div className="detail">{props.rateData.base}</div>
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

export default Rates;