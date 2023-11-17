// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { loadLocaleMessages, setI18nLanguage } from "@/plugins/i18n";
import i18n from "@/plugins/i18n";

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: ':lang(fr|en)',
        component: () => import(/* webpackChunkName: "home" */ '@/layouts/default/View.vue'),
        children: [
          {
            path: '',
            name: 'Home',
            component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
          },
          { path: ':slugPlayer-player-p:idPlayer(\\d+)', name: 'PlayerMain', meta: {aside: true}, component: () => import(/* webpackChunkName: "Game" */ '@/views/player/Main.vue'),
            children: [
              { path: 'index', name: 'PlayerIndex', component: () => import(/* webpackChunkName: "Player" */ '@/views/player/Index.vue')},
            ]
          },
          { path: ':slugTeam-team-t:idTeam(\\d+)', name: 'TeamMain', meta: {aside: true}, component: () => import(/* webpackChunkName: "Team" */ '@/views/team/Main.vue'),
            children: [
              { path: 'index', name: 'TeamIndex', component: () => import(/* webpackChunkName: "Player" */ '@/views/team/Index.vue')},
            ]
          },
        ]
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  //const paramsLocale = to.params.locale
  const paramsLocale = 'en'

  let lang = localStorage.lang ? localStorage.lang.toLowerCase() : 'en';

  const toLang = to.params && to.params.lang;
  const fromLang = from.params && from.params.lang;

  if (toLang === undefined) {
    next(`/${lang}${to.fullPath}`);
  } else {
    lang = to.params.lang.toLowerCase();
    i18n.locale = lang;

    if (fromLang !== toLang) {
      // load locale messages
      await loadLocaleMessages(i18n, toLang)
      // set i18n language
      setI18nLanguage(i18n, paramsLocale)
    }
  }

  return next()
})

export default router
