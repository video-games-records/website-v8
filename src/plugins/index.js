/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../store'
import router from '../router'
import axios from "./axios";
import i18n from "./i18n";
import constante from './constante';
import HighchartsVue from 'highcharts-vue';
import CKEditor from '@ckeditor/ckeditor5-vue';
import VueGtag from "vue-gtag";
import ScriptX from 'vue-scriptx';
import Ads from 'vue-google-adsense'

export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(axios)
    .use(i18n)
    .use(constante)
    .use(HighchartsVue)
    .use(CKEditor)
    .use(VueGtag, {
      config: {
          id: import.meta.env.VITE_GA_MEASUREMENT_ID,
          params: {
              anonymize_ip: true
          }
      },
    }, router)
    .use(ScriptX)
    .use(Ads.Adsense)
}
