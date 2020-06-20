import m from 'mithril';

const Rates = {
    currency: {
        data: {
            rates: {}
        },
        fetch: () => {
            return m.request({
                method: "GET",
                url: "https://api.exchangeratesapi.io/latest?base=USD",
            })
            .then(result => Rates.currency.data = result );
        }
    }
}

export default Rates;