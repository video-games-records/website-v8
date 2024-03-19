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
    defaultTheme: 'dark',
    themes: {
      light: {
        colors: {
          background: "#FFFFFF",
          surface: "#FFFFFF",
          primary: '05194DFF',
          secondary: '3011ACFF',
          header: '05194DFF',
          breadcrumb: 'EDEDEDFF',
          'tr-odd': colors.orange.lighten4,
        },
      },
      dark: {
        colors: {
          background: "#00000",
          //surface: "#000000",
          primary: colors.blueGrey.darken1,
          secondary: colors.blueGrey.darken4,
          header: colors.orange.lighten4,
          breadcrumb: colors.blueGrey.darken3,
          'tr-odd': colors.blueGrey.darken2,
        },
      },
    },
  },
})
