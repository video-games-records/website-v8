<template>
  <router-link :to="{ name: 'LostPositionIndex' }">
    <v-badge :content="nb">
      <v-icon icon="mdi-arrow-down-thin" size="x-large"></v-icon>
      <v-tooltip
          activator="parent"
          location="bottom"
      >{{ nb }} {{ $t('topbar.lostPositions', nb) }}</v-tooltip>
      <span class="d-sr-only">{{ nb }} {{ $t('topbar.lostPositions', nb) }}</span>
    </v-badge>
  </router-link>
</template>

<script>
import Security from "@/mixins/Security.vue";

export default {
  mixins: [Security],
  name: 'LostPositionBox',
  data() {
    return {
      nb: 0
    };
  },
  created() {
    this.maj();
    // Every 5 mins
    setInterval(() => this.maj(), 300000);
  },
  methods: {
    maj: function () {
      this.axios.get('/api/players/' + this.getAuthenticatedPlayer.id + '/nb-new-lost-position').then(response => {
        this.nb = response.data;
      })
    },
  },
};
</script>
