import m from 'mithril';

import RatesService from '../services/RatesService';
import Rates from './Rates'
import { RatesData } from '../models/types';


export default () => {
    let rateData = {
        rates: {},
        base: '',
        date: '',
    }

    return {
        oninit: async function() {
            await RatesService.getCurrencyRates()
                .then(data => {
                    rateData = data as RatesData;
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