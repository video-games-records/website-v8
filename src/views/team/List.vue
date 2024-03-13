<template>
  <div>

    <h1>{{ $t('team.list.title') }}</h1>

    <v-table class="members-list">
      <caption class="screen-reader-text">{{ $t('team.list.caption') }}</caption>
      <thead>
      <tr>
        <th scope="col">
          #
        </th>
        <th scope="col">
          <button class="table-order" @click="orderBy('libTeam')">{{ $t('team.name') }}</button>
        </th>
        <th scope="col" class="hidden-sm-and-down">
          <button class="table-order" @click="orderBy('createdAt')">{{ $t('global.createdAt') }}</button>
        </th>
        <th scope="col">
          <button class="table-order" @click="orderBy('rankPointGame')">{{ $t('global.rank') }}</button>
        </th>
        <th scope="col" class="hidden-sm-and-down">
          <button class="table-order" @click="orderBy('nbGame')">{{ $t('global.games') }}</button>
        </th>
        <th scope="col">
          <button class="table-order" @click="orderBy('pointGame')">{{ $t('global.gamePoints') }}</button>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(team, index) in teams" :key="team.id">
        <td>
          {{ itemsPerPage * (page - 1) + index + 1 }}
        </td>
        <td>
          <team v-bind:team="team"/>

        </td>
        <td class="hidden-sm-and-down">
          <date v-bind:date="team.createdAt"
                v-bind:options="{ month: 'long', day: 'numeric', year: 'numeric' }"></date>
        </td>
        <td>
          {{ team.rankPointGame }}
        </td>
        <td class="hidden-sm-and-down">
          {{ number(team.nbGame) }}
        </td>
        <td>
          {{ number(team.pointGame) }}
        </td>
      </tr>
      </tbody>

    </v-table>

    <v-pagination
        :density="this.$vuetify.display.mobile ? 'compact' : 'default'"
        v-model="page"
        :length="length"
        total-visible=6
        @update:modelValue="updateResource()" />

  </div>
</template>

<script>
import Date from '@/components/tools/Date.vue';
import Player from '@/components/vgr/player/Player';
import Country from "@/components/country/Country";
import Filters from "@/mixins/Filters.vue";
import Team from "@/components/vgr/team/Team.vue";

export default {
  mixins:[Filters],
  name: 'TeamList',
  components: {
    Team,
    Player,
    Country,
    'date': Date,
  },
  data() {
    return {
      page: 1,
      length: 1,
      itemsPerPage: 20,
      teams: [],
      order: {
        column: 'user.createdAt',
        direction: 'DESC',
      }
    };
  },
  created() {
    this.updateResource();
  },
  computed: {
    title() {
      return this.$t('team.list.title') + ' - ' + import.meta.env.VITE_APP_TITLE;
    },
    getResourceUrl() {
      let url = '/api/teams?itemsPerPage=' + this.itemsPerPage;
      // Add group player + team
      url += '&groups[]=team.read&groups[]=team.rank.pointGame&groups[]=team.rank.medal'
      // Add order by
      url += '&order[' + this.order.column + ']=' + this.order.direction;
      // Add page
      url = url + '&page=' + this.page;
      return url;
    }
  },
  methods: {
    updateResource() {
      this.axios.get(this.getResourceUrl)
          .then(response => {
            this.teams = response.data['hydra:member'];
            this.length = Math.trunc((response.data['hydra:totalItems'] - 1) / this.itemsPerPage ) + 1;
          })
    },
    orderBy(column) {
      if (column !== this.order.column) {
        this.order.column = column;
      } else if (this.order.direction === 'ASC') {
        this.order.direction = 'DESC';
      } else {
        this.order.direction = 'ASC';
      }
      this.updateResource();
    }
  },
};
</script>
