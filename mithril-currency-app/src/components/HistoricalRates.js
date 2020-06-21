import m from 'mithril';

import RatesService from '../services/RatesService'
import Rates from './Rates'

export default () => {
    let rateData = {
        // rates: {},
        // base: '',
        // date: '',
    }

    let date = ''

    const setDate = (e) => {
        date = e.target.value;
        console.log(date);
        console.log(typeof date);
    }

    const submitForm = (e) => {
        e.preventDefault();
        RatesService.getHistoricalRates(date)
            .then(res => rateData = res);
    }

    return {
        // oninit: async function(vnode) {
        //     await RatesService.getCurrencyRates()
        //         .then(data => {
        //             rateData = data;
        //         });
        // },


        view: function() {
            return m('section.Historical', [
                m('h2', 'Historical Rates'),
                m('hr'),
                m('div.date-form-container', [
                    m('form.date-form', {
                        onsubmit: submitForm,
                    }, [
                        m('div.date-input-container', [
                            m('label.date-label[for=date]', 'Enter Date'),
                            m('input.date-input#date[type=date][name=date][required]', {
                                oninput: setDate,
                                min: '1999-01-04'
                            }),
                        ]),
                        m('div.date-button-container', [
                            m('button.date-submit-button[type=submit]', 'Get Rates')
                        ]),
                    ]),
                ]),

                rateData.rates ? m(Rates, {rateData}) : null
            ]);
        }
    };
}