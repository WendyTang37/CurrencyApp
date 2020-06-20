import m from 'mithril';

export default () => {
    let active = 0;
    return {
        view: function(vnode) {
            let tabs = vnode.attrs.tabs;
            return m('nav', tabs.map((tab, i) => {
                    return m('a', {
                        class: active === i ? 'selected' : '',
                        onclick: () => { active = i; m.route.set('/'+tab.route)}
                    }, tab.name);
                })
            );
        }
    }

} 