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
          primary: colors.orange.lighten2,
          secondary: colors.orange.lighten3,
          header: colors.indigo.darken4,
          breadcrumb: colors.grey.lighten4,
          'tr-odd': colors.orange.lighten4,
        },
      },
      dark: {
        colors: {
          background: "#000000",
          //surface: "#000000",
          primary: colors.blueGrey.darken2,
          secondary: colors.blueGrey.darken3,
          header: colors.orange.lighten4,
          breadcrumb: colors.grey.darken1,
          'tr-odd': colors.blueGrey.darken4,
        },
      },
    },
  },
})
