import m from 'mithril';

import Rates from '../services/RatesService';

export default () => {
    let state = {
        rates: {},
        base: '',
        date: '',
    }

    return {
        oninit: async function(vnode) {
            await Rates.getCurrencyRates()
                .then(data => {
                    state = data;
                    console.log(state);
                });
        },
        view: function() {
            return m('section.CurrencyRates', [
                m('h2', 'Currency Rates'),
                m('hr'),
                m('div.rate-info-container', [
                    m('div.rate-info', [
                        m('i.fas.fa-calendar-alt'),
                        m('div.title', 'DATE'),
                        m('div.detail', state.date)
                    ]),
                    m('div.rate-info', [
                        m('i.far.fa-money-bill-alt'),
                        m('div.title', 'BASE'),
                        m('div.detail', state.base)
                    ])
                ]),
                m('table', [
                    m('thead', [
                        m('tr', [
                            m('th', 'Code'),
                            m('th', 'Rate')
                        ])
                    ]),
                    Object.entries(state.rates).map(([code,rate]) => {
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