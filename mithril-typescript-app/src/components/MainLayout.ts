import m from 'mithril';
import Navigation from './Navigation';

interface Attrs {}

const MainLayout: m.Component<Attrs> = {
    view: function(vnode) {
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
        let currentRoute = m.route.get();
        return m('div.main-layout', [
            m(Navigation, {tabs, title, currentRoute}),
            m('section.main-container', vnode.children)
        ]);
    }
}

export default MainLayout;