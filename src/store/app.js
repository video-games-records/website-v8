// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    // Language
    language: 'en',
    // Navigation
    letter : '0',
    platform: {
      id: 52,
      slug: 'switch',
      libPlatform: 'Switch'
    },
    serie: {
      id: 2,
      slug: 'mario-kart',
      libPlatform: 'Mario Kart'
    },
    game: {
      platforms: [],
      forum: {},
      status: {
        value: null
      }
    },
    group: {},
    chart: {},
    playerChart: {
      player: {},
      status: {}
    },
    forum: {},
    topic: {}
  }),
  getters: {
    getLanguage: (state) => state.language,
    getLetter: (state) => state.letter,
    getPlatform: (state) => state.platform,
    getSerie: (state) => state.serie,
    getGame: (state) => state.game,
    getGroup: (state) => state.group,
    getChart: (state) => state.chart,
    getPlayerChart: (state) => state.playerChart,
    getForum: (state) => state.forum,
    getTopic: (state) => state.topic,
  },
  actions: {
    setLanguage(language) {
      this.language = language;
    },
    setLetter(letter) {
      this.letter = letter;
    },
    setPlatform(platform) {
      this.platform = platform;
    },
    setSerie(serie) {
      this.serie = serie;
    },
    setGame(game) {
      this.game = game;
    },
    setGroup(group) {
      this.group = group;
    },
    setChart(chart) {
      this.chart = chart;
    },
    setPlayerChart(playerChart) {
      this.playerChart = playerChart;
    },
    setForum(forum) {
      this.forum = forum;
    },
    setTopic(topic) {
      this.topic = topic;
    },
  },
})
