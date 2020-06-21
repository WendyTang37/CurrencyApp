import m from 'mithril';
import Rates from '../services/RatesService';

export default () => {
    const state = {
        currencies: [],
        selectedFromCurrency: '',
        selectedToCurrency: '',
        amount: 0,
        converted: 0
    }

    const getCurrencyDropdown = () => {
        return state.currencies.map(currency => {
            return m('option', {
                value: currency,
            }, currency);
        })
    }

    const submitForm = (e) => {
        e.preventDefault();
        Rates.convert(state.selectedToCurrency, state.selectedFromCurrency, state.amount)
            .then(res => state.converted = res);
    }

    return {
        oninit: () => {
            Rates.getCurrencies()
                .then(res => {
                    state.currencies = res;
                })
        },
        view: function() {
            return m('section.ExchangeRates', [
                m('h2', 'Exchange Rates'),
                m('hr'),
                m('form.conversion-container', {
                        onsubmit: submitForm
                    }, [
                    m('div.from-currency-container', [
                        m('label.from-currency-label[for=from-currency]', 'From'),
                        m('select.from-currency-select#from-currency[name=from-currency][required]', {
                                onchange: (e) => {state.selectedFromCurrency = e.target.value}
                            },
                            m('option', {value:''}, 'Select Currency'),
                            getCurrencyDropdown()
                        )
                    ]),
                    m('div.to-currency-container', [
                        m('label.to-currency-label[for=to-currency]', 'To'),
                        m('select.to-currency-select#to-currency[name=to-currency][required]', {
                                onchange: (e) => {state.selectedToCurrency = e.target.value}
                            },
                            m('option', {value:''}, 'Select Currency'),
                            getCurrencyDropdown()
                        )
                    ]),
                    m('div.amount-container', [
                        m('label.amount-label[for=amount]', 'Amount'),
                        m('input.amount-input#amount[name=amount][type=tel][required]', {
                            value: state.amount,
                            oninput: (e) => {state.amount = e.target.value}
                        })
                    ]),
                    m('div.convert-button-container', [
                        m('button.convert-button[type=submit]', 'Convert')
                    ])
                ]),
                m('div.conversion-result-container', 
                    `${state.amount} ${state.selectedFromCurrency} = ${state.converted} ${state.selectedToCurrency}`)
            ]);
        }

    }

}