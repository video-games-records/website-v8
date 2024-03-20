// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { loadLocaleMessages, setI18nLanguage } from "@/plugins/i18n";
import i18n from "@/plugins/i18n";
import {TokenService} from "@/services/token.service";

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
          /********* SEARCH ***********/
          { path: 'search', name: 'Search', component: () => import(/* webpackChunkName: "Search" */ '@/views/Search.vue')},
          { path: 'advanced-score-search', name: 'PlayerChartSearch', component: () => import(/* webpackChunkName: "game-list" */ '@/views/player-chart/Search.vue')},
          /********* ACCOUNT ***********/
          { path: 'account', name: 'account', meta: {requiresAuth: true}, component: () => import(/* webpackChunkName: "account" */ '@/views/account/Main.vue'),
            children: [
              { path: 'index', name: 'AccountIndex', component: () => import(/* webpackChunkName: "Player" */ '@/views/account/Index.vue')},
              { path: 'avatar', name: 'AccountAvatar', component: () => import(/* webpackChunkName: "Player" */ '@/views/account/Avatar.vue')},
              { path: 'team', name: 'AccountTeam', component: () => import(/* webpackChunkName: "Player" */ '@/views/account/Team.vue')},
              { path: 'badges', name: 'AccountBadges', component: () => import(/* webpackChunkName: "Player" */ '@/views/account/Badges.vue')},
            ]
          },
          /********* ARTICLE ***********/
          { path: ':slugArticle-article-a:id(\\d+)', name: 'ArticleIndex', component: () => import(/* webpackChunkName: "article" */ '@/views/article/Index.vue')},
          /********* FORUM ***********/
          { path: 'forum-home', name: 'ForumHome', component: () => import(/* webpackChunkName: "forum" */ '@/views/forum/Home.vue')},
          { path: 'forum-notify', name: 'ForumNotify', meta: {requiresAuth: true}, component: () => import(/* webpackChunkName: "forum" */ '@/views/forum/forum/Notify.vue')},
          { path: ':slugForum-forum-f:idForum(\\d+)', name: 'ForumMain', component: () => import(/* webpackChunkName: "forum" */ '@/views/forum/forum/Main.vue'),
            children: [
              { path: 'index', name: 'ForumIndex', component: () => import(/* webpackChunkName: "forum" */ '@/views/forum/forum/Index.vue')},
              { path: ':slugTopic-topic-t:idTopic(\\d+)', name: 'TopicMain', component: () => import(/* webpackChunkName: "forum" */ '@/views/forum/forum/topic/Main.vue'),
                children: [
                  { path: 'index', name: 'TopicIndex', component: () => import(/* webpackChunkName: "forum" */ '@/views/forum/forum/topic/Index.vue')},
                  { path: 'reply', name: 'TopicReply', meta: {requiresAuth: true}, component: () => import(/* webpackChunkName: "forum" */ '@/views/forum/forum/topic/Reply.vue')},
                ]
              },
              { path: 'new-topic', name: 'TopicNew', component: () => import(/* webpackChunkName: "forum" */ '@/views/forum/forum/NewTopic.vue')},
            ]
          },
          /********* LEADERBOARD ***********/
          { path: 'leaderboard-point-chart', name: 'LeaderboardPointChart', component: () => import(/* webpackChunkName: "leaderboard" */ '@/views/leaderboard/PointChart.vue')},
          { path: 'leaderboard-point-game', name: 'LeaderboardPointGame', component: () => import(/* webpackChunkName: "leaderboard" */ '@/views/leaderboard/PointGame.vue')},
          { path: 'leaderboard-medal', name: 'LeaderboardMedal', component: () => import(/* webpackChunkName: "leaderboard" */ '@/views/leaderboard/Medal.vue')},
          { path: 'leaderboard-cup', name: 'LeaderboardCup', component: () => import(/* webpackChunkName: "leaderboard" */ '@/views/leaderboard/Cup.vue')},
          { path: 'leaderboard-proof', name: 'LeaderboardProof', component: () => import(/* webpackChunkName: "leaderboard" */ '@/views/leaderboard/Proof.vue')},
          { path: 'leaderboard-badge', name: 'LeaderboardBadge', component: () => import(/* webpackChunkName: "leaderboard" */ '@/views/leaderboard/Badge.vue')},
          /********* LOST-POSITION ***********/
          { path: 'lost-position', name: 'LostPositionIndex', meta: {requiresAuth: true}, component: () => import(/* webpackChunkName: "lost-position" */ '@/views/lost-position/Index.vue')},
          /********* MESSAGE ***********/
          { path: 'messages', name: 'MessageIndex', meta: {requiresAuth: true}, component: () => import(/* webpackChunkName: "message" */ '@/views/message/Index.vue')},
          /********* PLAYER ***********/
          { path: 'player/list', name: 'PlayerList', component: () => import(/* webpackChunkName: "Game" */ '@/views/player/List.vue')},
          { path: ':slugPlayer-player-p:idPlayer(\\d+)', name: 'PlayerMain', component: () => import(/* webpackChunkName: "Game" */ '@/views/player/Main.vue'),
            children: [
              { path: 'index', name: 'PlayerIndex', component: () => import(/* webpackChunkName: "Player" */ '@/views/player/Index.vue')},
              { path: 'games', name: 'PlayerGames', component: () => import(/* webpackChunkName: "Player" */ '@/views/player/Games.vue')},
              { path: 'charts', name: 'PlayerCharts', component: () => import(/* webpackChunkName: "Player" */ '@/views/player/Charts.vue')},
              { path: 'proofs', name: 'PlayerProofs', component: () => import(/* webpackChunkName: "Player" */ '@/views/player/Proofs.vue')},
              { path: 'badges', name: 'PlayerBadges', component: () => import(/* webpackChunkName: "Player" */ '@/views/player/Badges.vue')},
              { path: 'presentation', name: 'PlayerPresentation', component: () => import(/* webpackChunkName: "Player" */ '@/views/player/Presentation.vue')},
              { path: 'collection', name: 'PlayerCollection', component: () => import(/* webpackChunkName: "Player" */ '@/views/player/Collection.vue')},
              { path: ':slugGame-game-g:idGame(\\d+)', name: 'PlayerGameMain', component: () => import(/* webpackChunkName: "Player" */ '@/views/player/game/Main.vue'),
                children: [
                  { path: 'proofs', name: 'PlayerGameProofs', component: () => import(/* webpackChunkName: "Player" */ '@/views/player/game/Proofs.vue')},
                ]
              },
            ]
          },
          { path: 'proofs', name: 'proof', meta: {requiresAuth: true}, component: () => import(/* webpackChunkName: "account" */ '@/views/proof/Main.vue'),
            children: [
              { path: 'index', name: 'ProofIndex', component: () => import(/* webpackChunkName: "Player" */ '@/views/proof/Index.vue')},
              { path: ':slugGame-game-g:idGame(\\d+)', name: 'ProofGameMain', component: () => import(/* webpackChunkName: "Player" */ '@/views/proof/game/Main.vue'),
                children: [
                  { path: 'proofs', name: 'ProofGameProofs', component: () => import(/* webpackChunkName: "Player" */ '@/views/proof/game/Proofs.vue')},
                ]
              },
            ]
          },
          /********* TEAM ***********/
          { path: 'team/list', name: 'TeamList', component: () => import(/* webpackChunkName: "Game" */ '@/views/team/List.vue')},
          { path: ':slugTeam-team-t:idTeam(\\d+)', name: 'TeamMain', component: () => import(/* webpackChunkName: "Team" */ '@/views/team/Main.vue'),
            children: [
              { path: 'index', name: 'TeamIndex', component: () => import(/* webpackChunkName: "Player" */ '@/views/team/Index.vue')},
              { path: 'presentation', name: 'TeamPresentation', component: () => import(/* webpackChunkName: "Player" */ '@/views/team/Presentation.vue')},
              { path: 'badges', name: 'TeamBadges', component: () => import(/* webpackChunkName: "Player" */ '@/views/team/Badges.vue')},
              { path: 'players', name: 'TeamPlayers', component: () => import(/* webpackChunkName: "Player" */ '@/views/team/Players.vue')},
              { path: 'games', name: 'TeamGames', component: () => import(/* webpackChunkName: "Player" */ '@/views/team/Games.vue')},
              { path: 'leaderboards', name: 'TeamLeaderboards', component: () => import(/* webpackChunkName: "Player" */ '@/views/team/Leaderboards.vue')},
            ]
          },
          /********* THE SITE ***********/
          { path: 'rules', name: 'Rules', component: () => import(/* webpackChunkName: "rules" */ '@/views/page/Rules.vue')},
          { path: 'faq', name: 'Faq', component: () => import(/* webpackChunkName: "faq" */ '@/views/page/Faq.vue')},
          { path: 'partnership', name: 'Partnership', component: () => import(/* webpackChunkName: "partnership" */ '@/views/page/Partnership.vue')},
          { path: 'credits', name: 'Credits', component: () => import(/* webpackChunkName: "credits" */ '@/views/page/Credits.vue')},
          { path: 'recruitment', name: 'Recruitment', component: () => import(/* webpackChunkName: "recruitment" */ '@/views/page/Recruitment.vue')},
          { path: 'how-it-works', name: 'HowItWorks', component: () => import(/* webpackChunkName: "how-it-works" */ '@/views/page/HowItWorks.vue')},
          { path: 'donations', name: 'Donations', component: () => import(/* webpackChunkName: "donations" */ '@/views/page/Donations.vue')},
          { path: 'the-vgr-team', name: 'TheVgrTeam', component: () => import(/* webpackChunkName: "the-vgr-team" */ '@/views/page/TheVgrTeam.vue')},
          /********* PLATFORM ***********/
          { path: 'game-platform-:slugPlatform-p:id(\\d+)', name: 'PlatformIndex', component: () => import(/* webpackChunkName: "platform" */ '@/views/platform/Index.vue'), props: {default: true}},
          /********* SERIE ***********/
          { path: 'serie-:slugSerie-s:id(\\d+)', name: 'SerieIndex', component: () => import(/* webpackChunkName: "serie" */ '@/views/serie/Index.vue')},
          /********* GAME-LIST ***********/
          { path: 'game-letter-:letter', name: 'GameListByLetter', component: () => import(/* webpackChunkName: "game-list" */ '@/views/game/list/ByLetter.vue'), props: {default: true}},
          { path: 'upcoming-games', name: 'GameNext', component: () => import(/* webpackChunkName: "game-list" */ '@/views/game/list/Next.vue')},
          { path: 'lastest-games', name: 'GameLast', component: () => import(/* webpackChunkName: "game-list" */ '@/views/game/list/Last.vue')},
          /********* GAME ***********/
          { path: ':slugGame-game-g:idGame(\\d+)', name: 'GameMain', component: () => import(/* webpackChunkName: "Game" */ '@/views/game/Main.vue'),
            children: [
              { path: 'index', name: 'GameIndex', component: () => import(/* webpackChunkName: "Game" */ '@/views/game/Index.vue')},
              { path: 'submit', name: 'GameSubmit', meta: {requiresAuth: true}, component: () => import(/* webpackChunkName: "Game" */ '@/views/game/Submit.vue')},
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
          { path: ':pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFound.vue')},
        ]
      },
    ],
  }
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

    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (TokenService.getToken() === null) {
        next({
          path: '/',
          query: { redirect: to.fullPath }
        });
      }
    }
  }

  return next()
})

export default router
