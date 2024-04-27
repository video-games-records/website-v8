<template>
  <v-row>
    <v-col cols="12">
      <v-select
        v-model="country"
        :items="this.countries"
        item-title="name"
        @update:modelValue="onChange()"
        return-object
      >
      </v-select>
    </v-col>
    <v-col>
      <v-table>
        <caption class="screen-reader-text">{{ $t('leaderboard.recordPoints.caption') }}</caption>
        <thead>
        <tr>
          <th class="center" scope="col">#</th>
          <th scope="col">{{ $t('global.nickname') }}</th>
          <th class="right" scope="col">{{ $t('global.recordPoints') }}</th>
          <th class="right" scope="col">{{ $t('global.games') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in leaderboard" :data-rank="item.rankCountry" :key="item.id"
            :class="[isAuthenticated && getAuthenticatedPlayer.id === getPlayerId(item) ? 'player--me' : 'player' ]">
          <td class="pl-2 center">{{ item.rankCountry }}</td>
          <td class="pa-0">
            <player v-bind:player="item" v-bind:show-avatar="true"></player>
          </td>
          <td class="pr-3 right">
            {{ number(item.pointChart) }}
          </td>
          <td class="pr-3 right">
            {{ number(item.nbGame) }}
          </td>
        </tr>
        </tbody>
      </v-table>
    </v-col>
  </v-row>
</template>

<script>
import Player from '@/components/vgr/player/Player.vue';
import Country from '@/components/country/Country.vue';
import Security from "@/mixins/Security.vue";
import Filters from "@/mixins/Filters.vue";
import {useAppStore} from "@/store/app";

export default {
  mixins: [Security, Filters],
  name: 'CountryIndex',
  components: {Country, Player},
  data() {
    return {
      selected: null,
      country: {
        id: null,
        slug: '',
        name: '',
      },
      leaderboard: [],
      countries: [],
    };
  },
  created() {
    this.load();
    this.axios.get('/api/countries?pagination=false&order[libCountry]=ASC')
        .then(response => {
          this.countries = response.data['hydra:member']
        })
  },
  watch: {
    '$route'() {
      if (this.$route.params.id !== undefined) {
        this.load();
      }
    }
  },
  methods: {
    load() {
      // Country
      this.axios.get('/api/countries/' + this.$route.params.id)
          .then(response => {
            this.country = response.data;
            document.title = this.country.name + ' - ' + import.meta.env.VITE_APP_TITLE;
            useAppStore().setCountry(response.data);
          })
      // leaderboard
      this.axios.get('/api/countries/' + this.$route.params.id + '/ranking?maxRank=100')
          .then(response => {
            this.leaderboard = response.data['hydra:member']
          })
    },
    getPlayerId(item) {
      if (item.player) {
        return item.player.id;
      } else {
        return item.id;
      }
    },
    onChange () {
      this.$router.push({ name: 'CountryIndex', params: {id : this.country.id, slugCountry : this.country.slug}});
    }
  },
};
</script>
