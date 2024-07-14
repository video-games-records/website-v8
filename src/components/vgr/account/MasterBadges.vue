<template>
  <div>
    <v-card class="ma-3">
      <v-card-title class="bg-primary">{{ $t('badge.type.master') }}</v-card-title>
      <v-card-item>
        <v-row>
          <v-col cols="12" class="d-flex flex-wrap">
            <draggable v-model="badges" item-key="id">
              <template #item="{element}">
                <badge v-bind:badge="element.badge" v-bind:createdAt="element.createdAt" class="ma-1"></badge>
              </template>
            </draggable>
          </v-col>
        </v-row>
      </v-card-item>
      <v-card-actions>
        <v-btn @click="order">{{ $t('badge.order.button') }}</v-btn>
      </v-card-actions>
    </v-card>

  </div>
</template>

<script>
import Security from "@/mixins/Security.vue";
import Badge from "@/components/vgr/badge/Badge.vue";
import Date from "@/mixins/Date.vue";
import draggable from 'vuedraggable';
import axios from "axios";
import {useFlashMessageStore} from "@/store/base/flashMessage";

export default {
  mixins: [Security, Date],
  name: 'AccountMasterBadges',
  components: {
    Badge,
    draggable
  },
  props: {
    type: {
      require: true,
      type: String,
      default: 'player'
    },
    id: {
      require: true,
      type: Number,
      default: 0
    },
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
          '/api/' + this.type + '_badges?pagination=false&badge.type=Master&order[mbOrder]=ASC'
          + '&' + this.type + '=' + this.id + '&ended_at[after]=' + this.getNow)
          .then(response => {
            this.badges = response.data['hydra:member'];
          })
    },
    order() {
      let promises = [];
      let i = 1;
      let api = this.axios;
      let type = this.type;
      this.badges.forEach(function(element) {
        if (element.mbOrder !== i) {
          element.mbOrder = i;
          promises.push(api.put('/api/' + type + '_badges/' + element.id, element));
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
