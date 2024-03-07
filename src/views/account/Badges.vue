<template>
  <v-sheet class="ma-3">
    <v-row>
      <v-col cols="12" class="d-flex flex-wrap">
        <draggable v-model="badges" item-key="id">
          <template #item="{element}">
            <badge v-bind:badge="element.badge" v-bind:createdAt="element.createdAt" class="ma-1"></badge>
          </template>
        </draggable>
      </v-col>
      <v-col cols="12">
        <v-btn @click="order">{{ $t('badge.order.button') }}</v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import PlayerBadgeMaster from "@/components/vgr/player/badge/Master";
import Security from "@/mixins/Security.vue";
import Badge from "@/components/vgr/badge/Badge.vue";
import Date from "@/mixins/Date.vue";
import draggable from 'vuedraggable';
import axios from "axios";
import {useFlashMessageStore} from "@/store/base/flashMessage";

export default {
  mixins: [Security, Date],
  name: 'AccountBadges',
  components: {
    Badge,
    PlayerBadgeMaster,
    draggable
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
    order() {
      let promises = [];
      let i = 1;
      let api = this.axios;
      this.badges.forEach(function(element) {
        if (element.mbOrder !== i) {
          element.mbOrder = i;
          promises.push(api.put('/api/player_badges/' + element.id, element));
        }
        i++;
      });
      axios.all(promises)
          .then(() => {
            this.load();
            useFlashMessageStore().confirm(this.$t('badge.order.confirm'));
          });
    },
  }
};
</script>
