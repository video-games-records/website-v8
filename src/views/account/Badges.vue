<template>
  <v-sheet class="ma-3">
    <v-sheet class="d-flex flex-wrap">
      <div v-for="item in badges" :data-position="item.position" :key="item['@id']" class="ma-1">
        <badge v-bind:badge="item.badge" v-bind:createdAt="item.createdAt"></badge>
      </div>
    </v-sheet>
  </v-sheet>
</template>

<script>
import PlayerBadgeMaster from "@/components/vgr/player/badge/Master";
import Security from "@/mixins/Security.vue";
import Badge from "@/components/vgr/badge/Badge.vue";
import Date from "@/mixins/Date.vue";

export default {
  mixins: [Security, Date],
  name: 'AccountBadges',
  components: {
    Badge,
    PlayerBadgeMaster
  },
  data() {
    return {
      badges: [],
    }
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.axios.get(
          '/api/player_badges?pagination=false&badge.type=Master&order[mbOrder]=ASC'
          + '&player=' + this.getAuthenticatedPlayer.id + '&ended_at[after]=' + this.getNow)
          .then(response => {
            this.badges = response.data['hydra:member'];
          })
    },
  }
};
</script>
