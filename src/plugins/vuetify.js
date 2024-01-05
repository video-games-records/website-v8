/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import colors from 'vuetify/util/colors'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: colors.orange.lighten1,
          secondary: colors.orange.lighten4,
          //link: colors.blue.lighten4
        },
      },
      dark: {
        colors: {
          primary: colors.orange.lighten1,
          secondary: colors.orange.lighten4,
          link: colors.brown.lighten1,
        },
      },
    },
  },
})
