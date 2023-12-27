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
          /********* ACCOUNT ***********/
          { path: 'account', name: 'account', meta: {requiresAuth: true, aside: true}, component: () => import(/* webpackChunkName: "account" */ '@/views/account/Main.vue'),
            children: [
              { path: 'index', name: 'AccountIndex', component: () => import(/* webpackChunkName: "Player" */ '@/views/account/Index.vue')},
              { path: 'avatar', name: 'AccountAvatar', component: () => import(/* webpackChunkName: "Player" */ '@/views/account/Avatar.vue')},
              { path: 'team', name: 'AccountTeam', component: () => import(/* webpackChunkName: "Player" */ '@/views/account/Team.vue')},
              { path: 'badges', name: 'AccountBadges', component: () => import(/* webpackChunkName: "Player" */ '@/views/account/Badges.vue')},
              { path: 'videos', name: 'AccountVideos', component: () => import(/* webpackChunkName: "Player" */ '@/views/account/Videos.vue')},
            ]
          },
          /********* LEADERBOARD ***********/
          { path: 'leaderboard-point-chart', name: 'LeaderboardPointChart', meta: {aside: true}, component: () => import(/* webpackChunkName: "leaderboard" */ '@/views/leaderboard/PointChart.vue')},
          { path: 'leaderboard-point-game', name: 'LeaderboardPointGame', meta: {aside: true}, component: () => import(/* webpackChunkName: "leaderboard" */ '@/views/leaderboard/PointGame.vue')},
          { path: 'leaderboard-medal', name: 'LeaderboardMedal', meta: {aside: true}, component: () => import(/* webpackChunkName: "leaderboard" */ '@/views/leaderboard/Medal.vue')},
          { path: 'leaderboard-cup', name: 'LeaderboardCup', meta: {aside: true}, component: () => import(/* webpackChunkName: "leaderboard" */ '@/views/leaderboard/Cup.vue')},
          { path: 'leaderboard-proof', name: 'LeaderboardProof', meta: {aside: true}, component: () => import(/* webpackChunkName: "leaderboard" */ '@/views/leaderboard/Proof.vue')},
          { path: 'leaderboard-badge', name: 'LeaderboardBadge', meta: {aside: true}, component: () => import(/* webpackChunkName: "leaderboard" */ '@/views/leaderboard/Badge.vue')},
          /********* PLAYER ***********/
          { path: ':slugPlayer-player-p:idPlayer(\\d+)', name: 'PlayerMain', meta: {aside: true}, component: () => import(/* webpackChunkName: "Game" */ '@/views/player/Main.vue'),
            children: [
              { path: 'index', name: 'PlayerIndex', component: () => import(/* webpackChunkName: "Player" */ '@/views/player/Index.vue')},
            ]
          },
          /********* TEAM ***********/
          { path: ':slugTeam-team-t:idTeam(\\d+)', name: 'TeamMain', meta: {aside: true}, component: () => import(/* webpackChunkName: "Team" */ '@/views/team/Main.vue'),
            children: [
              { path: 'index', name: 'TeamIndex', component: () => import(/* webpackChunkName: "Player" */ '@/views/team/Index.vue')},
            ]
          },
          /********* THE SITE ***********/
          { path: 'rules', name: 'Rules', meta: {aside: true}, component: () => import(/* webpackChunkName: "rules" */ '@/views/page/Rules.vue')},
          { path: 'faq', name: 'Faq', meta: {aside: true}, component: () => import(/* webpackChunkName: "faq" */ '@/views/page/Faq.vue')},
          { path: 'partnership', name: 'Partnership', meta: {aside: true}, component: () => import(/* webpackChunkName: "partnership" */ '@/views/page/Partnership.vue')},
          { path: 'credits', name: 'Credits', meta: {aside: true}, component: () => import(/* webpackChunkName: "credits" */ '@/views/page/Credits.vue')},
          { path: 'recruitment', name: 'Recruitment', meta: {aside: true}, component: () => import(/* webpackChunkName: "recruitment" */ '@/views/page/Recruitment.vue')},
          { path: 'how-it-works', name: 'HowItWorks', meta: {aside: true}, component: () => import(/* webpackChunkName: "how-it-works" */ '@/views/page/HowItWorks.vue')},
          { path: 'donations', name: 'Donations', meta: {aside: true}, component: () => import(/* webpackChunkName: "donations" */ '@/views/page/Donations.vue')},
          { path: 'the-vgr-team', name: 'TheVgrTeam', meta: {aside: true}, component: () => import(/* webpackChunkName: "the-vgr-team" */ '@/views/page/TheVgrTeam.vue')},
          /********* PLATFORM ***********/
          { path: 'game-platform-:slugPlatform-p:id(\\d+)', name: 'PlatformMain', component: () => import(/* webpackChunkName: "platform" */ '@/views/platform/Main.vue'), props: {default: true},
            children: [
              { path: 'index', name: 'PlatformIndex', component: () => import(/* webpackChunkName: "game-list" */ '@/views/platform/Index.vue')},
              { path: 'leaderboard', name: 'PlatformLeaderboard', component: () => import(/* webpackChunkName: "game-list" */ '@/views/platform/Leaderboard.vue')},
            ]
          },
          /********* SERIE ***********/
          { path: 'serie-:slugSerie-s:id(\\d+)', name: 'SerieIndex', component: () => import(/* webpackChunkName: "serie" */ '@/views/serie/Index.vue')},
          /********* GAME-LIST ***********/
          { path: 'game-letter-:letter', name: 'GameListByLetter', meta: {aside: true}, component: () => import(/* webpackChunkName: "game-list" */ '@/views/game/list/ByLetter.vue'), props: {default: true}},
          { path: 'game-platform-:slugPlatform-p:id(\\d+)', name: 'PlatformMain', component: () => import(/* webpackChunkName: "platform" */ '@/views/platform/Main.vue'), props: {default: true},
            children: [
              { path: 'index', name: 'PlatformIndex', component: () => import(/* webpackChunkName: "game-list" */ '@/views/platform/Index.vue')},
              { path: 'leaderboard', name: 'PlatformLeaderboard', component: () => import(/* webpackChunkName: "game-list" */ '@/views/platform/Leaderboard.vue')},
            ]
          },
          { path: 'upcoming-games', name: 'GameNext', meta: {aside: true}, component: () => import(/* webpackChunkName: "game-list" */ '@/views/game/list/Next.vue')},
          { path: 'lastest-games', name: 'GameLast', meta: {aside: true}, component: () => import(/* webpackChunkName: "game-list" */ '@/views/game/list/Last.vue')},
          /********* GAME ***********/
          { path: ':slugGame-game-g:idGame(\\d+)', name: 'GameMain', component: () => import(/* webpackChunkName: "Game" */ '@/views/game/Main.vue'),
            children: [
              { path: 'index', name: 'GameIndex', component: () => import(/* webpackChunkName: "Game" */ '@/views/game/Index.vue')},
              { path: 'video-submit', name: 'GameVideoSubmit', meta: {requiresAuth: true}, component: () => import(/* webpackChunkName: "Video" */ '@/views/game/video/Submit.vue')},
              { path: 'videos', name: 'GameVideoList', component: () => import(/* webpackChunkName: "Video" */ '@/views/game/video/List.vue')},
              { path: 'rules', name: 'GameRules', component: () => import(/* webpackChunkName: "Video" */ '@/views/game/Rules.vue')},
              { path: 'submit', name: 'GameSubmit', component: () => import(/* webpackChunkName: "Game" */ '@/views/game/Submit.vue')},
              { path: ':slugForum-forum-f:idForum(\\d+)', name: 'GameForumMain', component: () => import(/* webpackChunkName: "Video" */ '@/views/game/forum/Main.vue'),
                children: [
                  { path: 'index', name: 'GameForumIndex', component: () => import(/* webpackChunkName: "forum" */ '@/views/game/forum/Index.vue')},
                  { path: ':slugTopic-topic-t:idTopic(\\d+)', name: 'GameTopicMain', component: () => import(/* webpackChunkName: "forum" */ '@/views/game/forum/topic/Main.vue'),
                    children: [
                      { path: 'index', name: 'GameTopicIndex', component: () => import(/* webpackChunkName: "forum" */ '@/views/game/forum/topic/Index.vue')},
                      { path: 'reply', name: 'GameTopicReply', meta: {requiresAuth: true}, component: () => import(/* webpackChunkName: "forum" */ '@/views/game/forum/topic/Reply.vue')},
                    ]
                  },
                  { path: 'new-topic', name: 'GameTopicNew', component: () => import(/* webpackChunkName: "forum" */ '@/views/game/forum/NewTopic.vue')},
                ]
              },
              { path: ':slugGroup-group-g:idGroup(\\d+)', name: 'GroupMain', component: () => import(/* webpackChunkName: "Game" */ '@/views/game/group/Main.vue'),
                children: [
                  { path: 'index', name: 'GroupIndex', component: () => import(/* webpackChunkName: "Game" */ '@/views/game/group/Index.vue')},
                  { path: 'submit', name: 'GroupSubmit', meta: {requiresAuth: true}, component: () => import(/* webpackChunkName: "Game" */ '@/views/game/group/Submit.vue')},
                  { path: ':slugChart-chart-c:idChart(\\d+)', name: 'ChartMain', component: () => import(/* webpackChunkName: "Game" */ '@/views/game/group/chart/Main.vue'),
                    children: [
                      { path: 'index', name: 'ChartIndex', component: () => import(/* webpackChunkName: "Game" */ '@/views/game/group/chart/Index.vue')},
                      { path: 'submit', name: 'ChartSubmit', meta: {requiresAuth: true}, component: () => import(/* webpackChunkName: "Game" */ '@/views/game/group/chart/Submit.vue')},
                      { path: 'pc-:idPc(\\d+)', name: 'PlayerChartMain', component: () => import(/* webpackChunkName: "Game" */ '@/views/game/group/chart/playerChart/Main.vue'),
                        children: [
                          { path: 'index', name: 'PlayerChartIndex', component: () => import(/* webpackChunkName: "Game" */ '@/views/game/group/chart/playerChart/Index.vue')},
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
        ]
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
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
      setI18nLanguage(i18n, toLang)
    }
  }

  return next()
})

export default router
