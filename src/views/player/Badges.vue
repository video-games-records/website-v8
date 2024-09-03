<template>
  <div class="pa-4">
    <player-badge-default v-if="getSpecial !== 0" v-bind:badges="getSpecial"
                          v-bind:title="this.$t('badge.type.special')"/>

    <player-badge-default v-if="getVgrChart !== 0" v-bind:badges="getVgrChart"
                          v-bind:title="this.$t('badge.type.chart')"/>

    <player-badge-default v-if="getVgrProof !== 0" v-bind:badges="getVgrProof"
                          v-bind:title="this.$t('badge.type.proof')"/>

    <player-badge-default v-if="getForum !== 0" v-bind:badges="getForum"
                          v-bind:title="this.$t('badge.type.forum')"/>

    <player-badge-default v-if="getConnexion !== 0" v-bind:badges="getConnexion"
                          v-bind:title="this.$t('badge.type.connexion')"/>

    <player-badge-default v-if="getDonation !== 0" v-bind:badges="getDonation"
                          v-bind:title="this.$t('badge.type.donation')"/>

    <player-badge-default v-if="getPlatform !== 0" v-bind:badges="getPlatform"
                          v-bind:title="this.$t('badge.type.platform')"/>

    <player-badge-serie v-bind:player="this.$parent.$parent.player" v-bind:id-player="this.$route.params.idPlayer"/>

    <player-badge-master v-bind:player="this.$parent.$parent.player" v-bind:id-player="this.$route.params.idPlayer"/>
  </div>
</template>

<script>
import PlayerBadgeDefault from "@/components/vgr/player/badge/Default";
import PlayerBadgeMaster from "@/components/vgr/player/badge/Master";
import PlayerBadgeSerie from "@/components/vgr/player/badge/Serie";

export default {
  name: 'PlayerBadges',
  components: {
    PlayerBadgeMaster,
    PlayerBadgeDefault,
    PlayerBadgeSerie,
  },
  data() {
    return {
      badges: [],
    };
  },
  computed: {
    getNow: function () {
      function pad(s) {
        return (s < 10) ? '0' + s : s;
      }

      let d = new Date();
      return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-');
    },
    getSpecial() {
      let badges = this.getBadges('Inscription');
      badges = badges.concat(this.getBadges('SpecialWebmaster'));
      badges = badges.concat(this.getBadges('VgrSpecialCountry'));
      badges = badges.concat(this.getBadges('VgrSpecialCup'));
      badges = badges.concat(this.getBadges('VgrSpecialLegend'));
      badges = badges.concat(this.getBadges('VgrSpecialMedals'));
      badges = badges.concat(this.getBadges('VgrSpecialPoints'));
      return badges;
    },
    getConnexion() {
      return this.getBadges('Connexion');
    },
    getForum() {
      return this.getBadges('Forum');
    },
    getDonation() {
      return this.getBadges('Don');
    },
    getVgrChart() {
      return this.getBadges('VgrChart');
    },
    getVgrProof() {
      return this.getBadges('VgrProof');
    },
    getPlatform() {
      return this.getBadges('Platform');
    },
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.axios.get(
          '/api/player_badges?pagination=false'
          + '&player=' + this.$route.params.idPlayer + '&endedAt[after]=' + this.getNow)
          .then(response => {
            this.badges = response.data['hydra:member'];
          })
    },
    getBadges(type) {
      let data = [];
      this.badges.forEach(function (element) {
            if (element.badge.type === type) {
              data.push(element);
            }
          }
      );
      return data;
    },
  },
};
</script>
