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
          //primary: "#E06500",
          primary: colors.orange.accent3,
          secondary: colors.deepOrange.lighten3,
          header: colors.indigo.darken4,
          breadcrumb: colors.grey.lighten4,
          'tr-odd': "#EDEDEDFF",
          'player-me': colors.orange.accent3,
          'ck-color-base-background': colors.grey.lighten4
        },
      },
      dark: {
        colors: {
          background: "#222222",
          //surface: "#000000",
          primary: colors.deepOrange.darken3,
          secondary: colors.deepOrange.darken3,
          header: colors.indigo.lighten3,
          breadcrumb: colors.grey.darken3,
          'tr-odd': colors.grey.darken2,
          'player-me': colors.deepOrange.darken3,
          'ck-color-base-background': colors.grey.darken3
        },
      },
    },
  },
})
