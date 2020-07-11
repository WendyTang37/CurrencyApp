import m from 'mithril';

import { RatesData } from '../models/types';


interface Attrs {
    rateData: RatesData;
}

export default (): m.Component<Attrs> => {
    return {
        view: function({attrs: {rateData}}) {
            // const rateData = vnode.attrs.rateData;
            return m('div', [
                m('div.rate-info-container', [
                    m('div.rate-info', [
                        m('i.fas.fa-calendar-alt'),
                        m('div.title', 'DATE'),
                        m('div.detail', rateData.date)
                    ]),
                    m('div.rate-info', [
                        m('i.far.fa-money-bill-alt'),
                        m('div.title', 'BASE'),
                        m('div.detail', rateData.base)
                    ])
                ]),
                m('table', [
                    m('thead', [
                        m('tr', [
                            m('th', 'Code'),
                            m('th', 'Rate')
                        ])
                    ]),
                    Object.entries(rateData.rates).map(([code, rate]) => {
                        return m('tr', [
                            m('td', code),
                            m('td', rate)
                        ]);
                    })
                ])
                // m('div', JSON.stringify(Rates.currency.data))
            ]);
        }
    };
}