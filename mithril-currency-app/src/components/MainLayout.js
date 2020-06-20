import m from 'mithril';
import Navigation from './Navigation';

export default {
    view: function(vnode) {
        let selected = vnode.attrs.selected;
        let tabs = [
            {
                route:'currency',
                name: 'Currency Rates'
            },
            { 
                route:'exchange', 
                name:'Exchange Rates'
            },
            { 
                route:'historical', 
                name:'Historical Rates'
            },
        ];
        return m('div', [
            m(Navigation, {tabs}),
            m('section.main-container', vnode.children)
        ]);
    }
}