import m from 'mithril';

import RatesService from '../services/RatesService';
import Rates from './Rates'

export default () => {
    let rateData = {
        rates: {},
        base: '',
        date: '',
    }

    return {
        oninit: async function(vnode) {
            await RatesService.getCurrencyRates()
                .then(data => {
                    rateData = data;
                });
        },
        view: function() {
            return m('section.CurrencyRates', [
                m('h2', 'Currency Rates'),
                m('hr'),
                m(Rates, {rateData})
            ]);
        }
    };
}