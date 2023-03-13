const scriptUrl = (id) => `https://widget.ybug.io/button/${id}.js`;

let isInitialized = false;

const initYbug = (id, settings) => {
    window.ybug_settings = {
        id,
        ...settings,
        onload: () => {
            settings?.onload?.();
        },
    }
    
    if (!isInitialized) {
        const script = document.createElement('script');
        script.async = true;
        if (settings.nonce) {
            script.nonce = settings.nonce;
        }
        script.src = scriptUrl(id);
        document.head.appendChild(script);
        isInitialized = true;
    }
}

/**
 * Install Ybug's Feedback Widget into your app
 *
 * @param id       Ybug ID
 * @param settings Additional settings (@see https://ybug.io/docs/installation#installation)
 */
const install = (app, { id, settings }) => {
    
    if (!id) {
        throw new Error('Please provide a Ybug Project ID');
    }
    
    initYbug(id, settings);
    
    const ybugApi = {
        boot: () => window.Ybug?.boot(),
        show: (arg) => window.Ybug?.show(arg),
        hide: (arg) => window.Ybug?.hide(arg),
        open: (arg) => window.Ybug?.open(arg),
        destroy: () => window.Ybug?.destroy(),
        close: () => window.Ybug?.close(),
        on: (evt, callback) => window.Ybug?.on(evt, callback),
        log: (type, msg) => window.Ybug?.log(type, msg),
        setUser: (arg) => window.Ybug?.setUser(arg),
        
        /**
         * Init method can be used to change the settings object.
         * @param settings
         */
        init(settings) {
            initYbug(id, settings);
            this.destroy();
            this.boot();
        },
    };
    
    // make $ybug property available
    // to all components using Options API
    app.config.globalProperties.$ybug = ybugApi;
    
    // provide the ybug api to support all components
    // using Composition API or Options API
    app.provide('ybug', ybugApi);
}

export default {
    install
}