import util from "libs/util";

function plugin(Vue) {
    if (plugin.installed) {
        return;
    }
    Object.defineProperties(Vue.prototype, {
        util: {
            get() {
                return util
            }
        },
    });
}
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

export default plugin;
