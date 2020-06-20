import m from 'mithril';

export default () => {
    // let active = 0;
    // let currentRoute = m.route();
    // let currentRoute = m.route.get();
    // console.log('hello');
    // console.log(currentRoute);
    // letvnode.attrs.currentRoute
    return {
        view: function(vnode) {
            let tabs = vnode.attrs.tabs;
            return m('nav', 
                m('div.title', vnode.attrs.title),
                tabs.map((tab, i) => {
                    return m(m.route.Link, {
                        href: tab.route,
                        class: vnode.attrs.currentRoute === tab.route ? 'selected' : '',
                        // onclick: () => { active = i; m.route.set('/'+tab.route)}
                    }, tab.name);
                })
            );
        }
    }

} 