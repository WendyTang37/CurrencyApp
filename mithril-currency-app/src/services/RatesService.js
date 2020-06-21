import m from 'mithril';

const Rates = {
    currency: {
        data: {
            rates: {}
        },
        fetch: () => {
            if(sessionStorage.getItem('currencyRates')) {
                return new Promise((resolve) => {
                    Rates.currency.data = JSON.parse(sessionStorage.getItem('currencyRates'));
                });
            } else {
                return m.request({
                    method: "GET",
                    url: "https://api.exchangeratesapi.io/latest?base=USD",
                })
                .then(result => {
                    Rates.currency.data = result;
                    sessionStorage.setItem('currencyRates', JSON.stringify(result));
                });
            }
        },
        getCurrencies:() => {
            if(sessionStorage.getItem('currencies')) {
                return Promise.resolve(JSON.parse(sessionStorage.getItem('currencies')));
            } else {
                return Rates.currency.fetch()
                    .then((res) => Object.keys(res.rates));
            }
        }
    }
}

export default Rates;