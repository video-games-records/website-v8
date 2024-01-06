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

export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(axios)
    .use(i18n)
    .use(constante)
    .use(HighchartsVue)
}
