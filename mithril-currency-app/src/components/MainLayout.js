import m from 'mithril';
import Navigation from './Navigation';

export default {
    view: function(vnode) {
        let selected = vnode.attrs.selected;
        let title = "Currency Exchange App";
        let tabs = [
            {
                route:'/currency',
                name: 'Currency Rates'
            },
            { 
                route:'/exchange', 
                name:'Exchange Rates'
            },
            { 
                route:'/historical', 
                name:'Historical Rates'
            },
        ];
        return m('div', {class: 'main-layout'}, [
            m(Navigation, {tabs, title}),
            m('section.main-container', vnode.children)
        ]);
    }
}