import m from 'mithril';

export default () => {
    return {
        view: function(vnode) {
            let tabs = vnode.attrs.tabs;
            return m('nav', 
                m('div.title', vnode.attrs.title),
                tabs.map((tab, i) => {
                    return m(m.route.Link, {
                        href: tab.route,
                        class: vnode.attrs.currentRoute === tab.route ? 'selected' : '',
                    }, tab.name);
                })
            );
        }
    }

} 