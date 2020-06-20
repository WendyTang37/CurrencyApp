import m from 'mithril';

import Rates from '../services/RatesService';

export default () => {
    return {
        oninit: Rates.currency.fetch,
        view: function() {
            return m('div.CurrencyRates', [
                m('h2', 'Currency Rates'),
                m('hr'),
                m('div.rate-info-container', [
                    m('div.rate-info', [
                        m('i.fas.fa-calendar-alt'),
                        m('div.title', 'DATE'),
                        m('div.detail', Rates.currency.data.date)
                    ]),
                    m('div.rate-info', [
                        m('i.far.fa-money-bill-alt'),
                        m('div.title', 'BASE'),
                        m('div.detail', Rates.currency.data.base)
                    ])
                ]),
                m('table', [
                    m('thead', [
                        m('tr', [
                            m('th', 'Code'),
                            m('th', 'Rate')
                        ])
                    ]),
                    Object.entries(Rates.currency.data.rates).map(([code,rate]) => {
                        return m('tr', [
                            m('td', code),
                            m('td', rate)
                        ]);
                    })
                ])
                // m('div', JSON.stringify(Rates.currency.data))
            ]);
        }
    };
}