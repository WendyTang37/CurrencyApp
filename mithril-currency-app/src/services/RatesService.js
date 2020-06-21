import m from 'mithril';

const fx = window.fx;

const Rates = {
    getCurrencyRates: (state) => {
        if(sessionStorage.getItem('currencyRates')) {
            return new Promise((resolve, reject) => {
                const data = JSON.parse(sessionStorage.getItem('currencyRates'));
                fx.base = data.base;
                fx.rates = data.rates;
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
                fx.base = data.base;
                fx.rates = data.rates;
                return data;
            });
        }
    },
    getCurrencies: () => {
        if(sessionStorage.getItem('currencies')) {
            return new Promise((resolve, reject) => {
                m.redraw();
                resolve(JSON.parse(sessionStorage.getItem('currencies')));
            });
        } else {
            return Rates.getCurrencyRates()
            .then((res) => {
                const currencies = Object.keys(res.rates);
                sessionStorage.setItem('currencies', JSON.stringify(currencies));
                return currencies;
            });
        }
    },
    convert: (to, from, amount) => {
        if(!fx.base || !fx.rates) {
            return Rates.getCurrencyRates()
                .then(res => fx.convert(amount, {from, to}));
        } else {
            return Promise.resolve(fx.convert(amount, {from, to}));
        }
    }
}

export default Rates;