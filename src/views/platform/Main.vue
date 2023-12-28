<template>
  <div>
    <h1>{{ getPlatform.libPlatform }}</h1>
    <v-row>
      <v-col cols="12" order="2" md="12" lg="9" order-lg="1">
        <ul class="tabs">
          <li :class="getClassItem('PlatformIndex')"><router-link :to="{ name: 'PlatformIndex'}"><span>{{ $t('global.games') }}</span></router-link></li>
          <li :class="getClassItem('PlatformLeaderboard')"><router-link :to="{ name: 'PlatformLeaderboard'}"><span>{{ $t('global.leaderboard') }}</span></router-link></li>
        </ul>
        <router-view></router-view>
      </v-col>
      <v-col cols="12" order="1" md="12" lg="3" order-lg="2">
        <div v-if="this.$vuetify.display.mobile">
          <v-select
              v-model="platform"
              :items="this.platforms"
              item-title="libPlatform"
              @update:modelValue="onChange()"
              return-object
          >
          </v-select>
        </div>
        <div v-else>
          <div class="label">{{ $t('platform.choose') }}</div>
          <platform-list v-bind:platforms="platforms" :route=null></platform-list>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { useAppStore } from '@/store/app';
import PlatformList from '@/components/vgr/platform/List.vue';

export default {
  name: 'PlatformMain',
  components: {PlatformList},
  data() {
    return {
      platform: {},
      platforms: []
    };
  },
  computed: {
    getPlatform() {
      return useAppStore().getPlatform;
    },
  },
  created() {
    this.load();
    this.axios.get('/api/platforms?pagination=false', {useCache: true})
        .then(response => {
          this.platforms = response.data['hydra:member']
        })
  },
  watch: {
    '$route.params.id' () {
      this.load();
    },
  },
  methods: {
    load() {
      document.title = this.getPlatform.libPlatform + ' - ' + import.meta.env.VITE_APP_TITLE;
      this.axios.get('/api/platforms/' + this.$route.params.id)
          .then(response => {
            this.platform = response.data;
            useAppStore().setPlatform(response.data);
          })
    },
    getClassItem(item) {
      if (this.$route.name.endsWith(item)) {
        return 'tab__item tab__item--current';
      }
      return 'tab__item';
    },
    onChange () {
      this.$router.push({ name: 'PlatformIndex', params: {id : this.platform.id, slugPlatform: this.platform.slug}});
    },
  },
};
</script>

<style scoped>
.platform-list {
  text-align: center;
}
</style>

