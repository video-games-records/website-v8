<template>
  <div>

    <h1>{{ $t('player.list.title') }}</h1>

    <v-table class="members-list">
      <caption class="screen-reader-text">{{ $t('player.list.caption') }}</caption>
      <thead>
      <tr>
        <th scope="col">
          #
        </th>
        <th scope="col">
          <button class="table-order" @click="orderBy('pseudo')">{{ $t('player.pseudo') }}</button>
        </th>
        <th scope="col" class="hidden-md-and-down">
          {{ $t('player.country') }}
        </th>
        <th scope="col" class="hidden-sm-and-down">
          <button class="table-order" @click="orderBy('createdAt')">{{ $t('global.createdAt') }}</button>
        </th>
        <th scope="col" class="hidden-sm-and-down">
          <button class="table-order" @click="orderBy('nbConnexion')">{{ $t('player.nbConnexion') }}</button>
        </th>
        <th scope="col">
          <button class="table-order" @click="orderBy('lastLogin')">{{ $t('player.lastLogin') }}</button>
        </th>
        <th scope="col">
          <button class="table-order" @click="orderBy('nbChart')">{{ $t('global.charts') }}</button>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(player, index) in players" :data-position="player.position" :key="player.id">
        <td>
          {{ itemsPerPage * (page - 1) + index + 1 }}
        </td>
        <td>
          <player v-bind:player="player"/>
          <span v-if="player.status.name !== $t('player.status.member')">
                            (<em>{{ player.status.name }}</em>)
                        </span>
        </td>
        <td class="hidden-md-and-down">
          <country v-bind:country="player.country"></country>
          <span v-if="player.country">{{ player.country.name }}</span>
        </td>
        <td class="hidden-sm-and-down">
          <date v-bind:date="player.createdAt"
                v-bind:options="{ month: 'long', day: 'numeric', year: 'numeric' }"></date>
        </td>
        <td class="hidden-sm-and-down">
          {{ number(player.nbConnexion) }}
        </td>
        <td>
          <date v-bind:date="player.lastLogin"
                v-bind:options="{ month: 'long', day: 'numeric', year: 'numeric' }"></date>
        </td>
        <td :data-header="$t('global.charts')">
          {{ number(player.nbChart) }}
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

export default {
  mixins:[Filters],
  name: 'PlayerList',
  components: {
    Player,
    Country,
    'date': Date,
  },
  data() {
    return {
      page: 1,
      length: 1,
      itemsPerPage: 20,
      players: [],
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
      return this.$t('player.list.title') + ' - ' + import.meta.env.VITE_APP_TITLE;
    },
    getResourceUrl() {
      let url = '/api/players??itemsPerPage=' + this.itemsPerPage;
      // Add filter
      url += '&user.enabled=1';
      // Add group player + team
      url += '&groups[]=player.read&groups[]=player.pointChart&groups[]=player.medal'
      // Add group team
      url += '&groups[]=player.team&groups[]=team.read.mini';
      // Add group country
      url += '&groups[]=player.country&groups[]=country.read';
      // Add group user
      url += '&groups[]=player.status&groups[]=player.status.read';
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
            this.players = response.data['hydra:member'];
            this.length = Math.trunc(response.data['hydra:totalItems'] / this.itemsPerPage - 1) + 1;
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
