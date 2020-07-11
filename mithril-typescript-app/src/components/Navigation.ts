import m from 'mithril';
import { Tab } from '../models/types';


interface Attrs {
    tabs: Tab[];
    title: string;
    currentRoute: string;
}

export default (): m.Component<Attrs> => {
    return {
        view: function({attrs: {tabs, title, currentRoute}}) {
            // let tabs = vnode.attrs.tabs;
            return m('nav', 
                m('div.title', title),
                tabs.map((tab, i) => {
                    return m(m.route.Link, {
                        href: tab.route,
                        class: currentRoute === tab.route ? 'selected' : '',
                    }, tab.name);
                })
            );
        }
    }

} 