import m from 'mithril';

import { RatesData, CurrencyList } from '../models/types';

declare var fx: any;
// const fx = window.fx;
const setFx = (data: RatesData) => {
    fx.base = data.base;
    fx.rates = data.rates;
}

const Rates = {
    getCurrencyRates: (): Promise<RatesData> => {
        const sessionData = sessionStorage.getItem('currencyRates');
        if(sessionData) {
            return new Promise((resolve, reject) => {
                const data = JSON.parse(sessionData);
                setFx(data);
                resolve(data);
                m.redraw();
            });

        } else {
            return m.request({
                method: "GET",
                url: "https://api.exchangeratesapi.io/latest?base=USD",
            })
            .then(data => {
                sessionStorage.setItem('currencyRates', JSON.stringify(data));
                setFx(data as RatesData);
                return data as RatesData;
            });
        }
    },
    getHistoricalRates: (date: string): Promise<RatesData> => {
        return m.request({
            method: "GET",
            url: `https://api.exchangeratesapi.io/${date}?base=USD`
        });
    },
    getCurrencies: (): Promise<CurrencyList> => {
        if(sessionStorage.getItem('currencies')) {
            return new Promise((resolve, reject) => {
                m.redraw();
                const currencies = sessionStorage.getItem('currencies') || '';
                resolve(JSON.parse(currencies));
            });
        } else {
            return Rates.getCurrencyRates()
            .then((res) => {
                const result = res as RatesData;
                const currencies = Object.keys(result.rates);
                sessionStorage.setItem('currencies', JSON.stringify(currencies));
                return currencies;
            });
        }
    },
    convert: (to:string , from: string, amount: number): Promise<number> => {
        if(!fx.base || !fx.rates) {
            return Rates.getCurrencyRates()
                .then(res => fx.convert(amount, {from, to}));
        } else {
            return Promise.resolve(fx.convert(amount, {from, to}));
        }
    }
}

export default Rates;