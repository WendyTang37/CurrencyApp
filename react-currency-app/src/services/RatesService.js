import axios from 'axios';

const fx = window.fx;

const RatesService = {
    getCurrencyRates: () => {
        if(sessionStorage.getItem('currencyRates')) {
            const data = JSON.parse(sessionStorage.getItem('currencyRates'));
            fx.base = data.base;
            fx.rates = data.rates;
            return Promise.resolve(data);
        } else {
            return axios('https://api.exchangeratesapi.io/latest?base=USD')
                .then(res => {
                    sessionStorage.setItem('currencyRates', JSON.stringify(res.data));
                    fx.base = res.data.base;
                    fx.rates = res.data.rates;
                    return res.data;
                });
        }
    },
    convert: (from, to, amount) => {
        if(!fx.base || !fx.rates) {
            return RatesService.getCurrencyRates()
                .then(res => fx.convert(amount, {from, to}));
        } else {
            return Promise.resolve(fx.convert(amount, {from, to}));
        }
         
    },
    getCurrencies:() => {
        if(sessionStorage.getItem('currencies')) {
            return Promise.resolve(JSON.parse(sessionStorage.getItem('currencies')));
        } else {
            return RatesService.getCurrencyRates()
                .then((res) => {
                    const currencies = Object.keys(res.rates)
                    sessionStorage.setItem('currencies', JSON.stringify(currencies));
                    return currencies;
                });
        }
    }
}

export default RatesService;