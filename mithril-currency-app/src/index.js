import m from "mithril";

import CurrencyRates from './components/CurrencyRates';
import ExchangeRates from './components/ExchangeRates';
import HistoricalRates from './components/HistoricalRates';
import MainLayout from './components/MainLayout'

m.route(document.body, '/currency', {
    '/currency': {
        render: function() {
            return m(MainLayout, m(CurrencyRates));
        }
    },
    '/exchange': {
        render: function() {
            return m(MainLayout, m(ExchangeRates));
        }
    },
    '/historical': {
        render: function() {
            return m(MainLayout, m(HistoricalRates));
        }
    }
})