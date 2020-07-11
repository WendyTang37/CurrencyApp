import m from 'mithril';
import Rates from '../services/RatesService';
import { CurrencyList } from '../models/types';

interface Attrs {
}

export default () : m.Component<Attrs> => {
    let currencies: CurrencyList = [];
    let selectedFromCurrency = '';
    let selectedToCurrency = '';
    let amount = 0;
    let converted = 0;

    const getCurrencyDropdown = () => {
        return currencies.map(currency => {
            return m('option', {
                value: currency,
            }, currency);
        })
    }

    const submitForm = (e: Event) => {
        e.preventDefault();
        Rates.convert(selectedToCurrency, selectedFromCurrency, amount)
            .then(res => converted = res);
    }

    return {
        oninit: () => {
            Rates.getCurrencies()
                .then(res => {
                    currencies = res;
                })
        },
        view: function() {
            return m('section.ExchangeRates', [
                m('h2', 'Exchange Rates'),
                m('hr'),
                m('form.conversion-container', {
                        onsubmit: submitForm
                    }, [
                    m('div.field-container', [
                        m('label.from-currency-label[for=from-currency]', 'From'),
                        m('select.from-currency-select#from-currency[name=from-currency][required]', {
                                onchange: (e: InputEvent) => {
                                    selectedFromCurrency = (e.target as HTMLSelectElement).value
                                }
                            },
                            m('option', {value:''}, 'Select Currency'),
                            getCurrencyDropdown()
                        )
                    ]),
                    m('div.field-container', [
                        m('label.to-currency-label[for=to-currency]', 'To'),
                        m('select.to-currency-select#to-currency[name=to-currency][required]', {
                                oninput: (e: InputEvent) => {
                                    selectedToCurrency = (e.target as HTMLSelectElement).value
                                }
                            },
                            m('option', {value:''}, 'Select Currency'),
                            getCurrencyDropdown()
                        )
                    ]),
                    m('div.field-container', [
                        m('label.amount-label[for=amount]', 'Amount'),
                        m('input.amount-input#amount[name=amount][type=tel][required]', {
                            value: amount,
                            oninput: (e: InputEvent) => {
                                amount = +(e.target as HTMLSelectElement).value
                            }
                        })
                    ]),
                    m('div.convert-button-container', [
                        m('button.convert-button[type=submit]', 'Convert')
                    ])
                ]),
                m('div.conversion-result-container', 
                    `${amount} ${selectedFromCurrency} = ${converted} ${selectedToCurrency}`)
            ]);
        }

    }

}