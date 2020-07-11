import m from 'mithril';

import RatesService from '../services/RatesService'
import Rates from './Rates'
import { RatesData } from '../models/types';

interface Attr {

}

export default (): m.Component<Attr> => {
    let rateData: RatesData;

    let date = ''

    const setDate = (e: InputEvent) => {
        date = (e.target as HTMLInputElement).value;
    }

    const submitForm = (e: Event) => {
        e.preventDefault();
        RatesService.getHistoricalRates(date)
            .then(res => rateData = res);
    }

    return {
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

                rateData?.rates ? m(Rates, {rateData}) : null
            ]);
        }
    };
}