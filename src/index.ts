import { App, Plugin } from 'vue';

import type { UserInfo, YbugApi, YbugSettings } from './ybug';

type YbugInstallOptions = {
  id: string;
  settings?: YbugSettings & { [key: string]: string };
};

const scriptUrl = (id: string) => `https://widget.ybug.io/button/${id}.js`;

let isInitialized = false;

const initYbug = (id: string, settings?: YbugSettings) => {
  // @ts-expect-error will not be defined in window
  window.ybug_settings = {
    id,
    ...settings,
    onload: () => {
      settings?.onload?.();
    },
  };

  if (!isInitialized) {
    const script = document.createElement('script');
    script.async = true;
    if (settings?.nonce) {
      script.nonce = settings.nonce;
    }
    script.src = scriptUrl(id);
    document.head.appendChild(script);
    isInitialized = true;
  }
};

const YbugPlugin: Plugin = {
  /**
   * Install Ybug's Feedback Widget into your app
   *
   * @param app      Vue app instance
   * @param id       Ybug ID
   * @param settings Additional settings (@see https://ybug.io/docs/installation#installation)
   */
  install(app: App, { id, settings }: YbugInstallOptions) {
    if (!id) {
      throw new Error('Please provide a Ybug Project ID');
    }

    initYbug(id, settings);

    const ybugApi: YbugApi = {
      // @ts-expect-error will not be defined in window
      boot: () => window.Ybug?.boot(),
      // @ts-expect-error will not be defined in window
      show: (arg) => window.Ybug?.show(arg),
      // @ts-expect-error will not be defined in window
      hide: (arg) => window.Ybug?.hide(arg),
      // @ts-expect-error will not be defined in window
      open: (arg) => window.Ybug?.open(arg),
      // @ts-expect-error will not be defined in window
      destroy: () => window.Ybug?.destroy(),
      // @ts-expect-error will not be defined in window
      close: () => window.Ybug?.close(),
      // @ts-expect-error will not be defined in window
      on: (evt, callback) => window.Ybug?.on(evt, callback),
      // @ts-expect-error will not be defined in window
      log: (type, msg) => window.Ybug?.log(type, msg),
      // @ts-expect-error will not be defined in window
      setUser: (arg) => window.Ybug?.setUser(arg),

      /**
       * Init method can be used to change the settings object.
       * @param settings
       */
      init(settings: YbugSettings) {
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
  },
};

export type { UserInfo, YbugApi, YbugSettings, YbugInstallOptions };

export default YbugPlugin;
