<template>
  <div>
    <h1>{{ player.pseudo }}</h1>

    <player-profile-card v-if="player.id" v-bind:player="player"/>

    <ul class="tabs">
      <li v-if="isRoute('Index')" class="tab__item tab__item--current"><span>{{ $t('player.profile.tabs.stats') }}</span></li>
      <li v-else class="tab__item"><router-link :to="{ name: 'PlayerIndex' }">{{ $t('player.profile.tabs.stats') }}</router-link></li>

      <li v-if="isRoute('Badges')" class="tab__item tab__item--current"><span>{{ $t('player.profile.tabs.badges') }}</span></li>
      <li v-else class="tab__item"><router-link :to="{ name: 'PlayerBadges' }">{{ $t('player.profile.tabs.badges') }}</router-link></li>
    </ul>

    <router-view></router-view>
  </div>
</template>

<script>
import PlayerProfileCard from "@/components/vgr/player/profile/Card";


export default {
  name: 'PlayerMain',
  components: {
    PlayerProfileCard
  },
  data() {
    return {
      player: {
        id: null,
        pseudo: '',
      },
    };
  },
  created() {
    this.load();
  },
  watch: {
    '$route.params.idPlayer'() {
      this.load();
      this.$forceUpdate();
    }
  },
  methods: {
    isRoute(name) {
      return this.$route.name.endsWith(name);
    },
    load() {
      this.axios.get('/api/players/' + this.$route.params.idPlayer)
          .then(response => {
            this.player = response.data;
            document.title = this.player.pseudo + ' - ' + import.meta.env.VITE_APP_TITLE;
          })
    }
  },
};
</script>
