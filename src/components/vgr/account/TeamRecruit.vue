<template>
  <div>
    <v-card class="ma-3">
      <v-card-title class="bg-primary">{{ $t('team.request.recruit') }}</v-card-title>
      <v-card-item>
        <v-form v-model="isValid" validate-on="blur" @submit.prevent @submit="submit()">
          <div>
            <label for="player">{{ $t('global.nickname') }}</label>
            <v-autocomplete
                :rules="[rules.required]"
                v-model="request.player"
                v-model:search="searchPlayer"
                :loading="loadingPlayer"
                :label="$t('global.player')"
                menu-icon=""
                :items="itemsPlayer"
                item-value="@id"
                item-title="pseudo"
                variant="outlined">
            </v-autocomplete>
          </div>
          <div>
            <v-btn type="submit">{{ $t('tag.submit') }}</v-btn>
          </div>
        </v-form>
      </v-card-item>
    </v-card>

    <v-card class="ma-3">
      <v-card-title class="bg-primary">{{ $t('team.requests') }}</v-card-title>
      <v-card-item>
        <v-table v-if="requests.length > 0">
          <thead>
          <tr>
            <th scope="col">{{ $t('global.player') }}</th>
            <th scope="col">{{ $t('global.createdAt') }}</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tfoot>
          </tfoot>
          <tbody>
          <tr v-for="request in requests" :data-position="request.position" :key="request.id">
            <td>{{ request.player.pseudo }}</td>
            <td>{{ request.createdAt }}</td>
            <td>
              <v-select v-model="request.status" :items="statuses"
                        item-title="name" item-value="value" />
            </td>
          </tr>
          </tbody>
        </v-table>
        <div v-else>
          <p>{{ $t('team.request.none') }}</p>
        </div>
      </v-card-item>
      <v-card-actions>
        <v-btn @click="update()">{{ $t('tag.submit') }}</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>


<script>
import Rules from "@/mixins/Rules.vue";
import Security from "@/mixins/Security.vue";
import {useFlashMessageStore} from "@/store/base/flashMessage";
import axios from "axios";

export default {
  mixins: [Rules, Security],
  name: 'TeamRecruit',
  computed: {
    getTeam() {
      return this.getAuthenticatedPlayer.team;
    },
  },
  data() {
    return {
      isValid: false,
      loadingPlayer: false,
      itemsPlayer: [],
      searchPlayer: null,
      request : {
        'team' : null,
        'player': null,
      },
      requests: [],
      statuses: [
        {value: 'ACTIVE', name: this.$t('team.request.status.ACTIVE')},
        {value: 'CANCELED' , name: this.$t('team.request.status.CANCELED') },
      ],
    };
  },
  watch: {
    searchPlayer(val) {
      val && val.length >= 3 && this.querySelections(val)
    },
  },
  created() {
    this.loadRequests();
  },
  methods: {
    querySelections (v) {
      this.loadingPlayer = true
      this.itemsPlayer = [];

      this.axios.get('/api/players/autocomplete',{params: {query: v}}).then(response => {
        this.itemsPlayer = response.data['hydra:member'];
        this.loadingPlayer = false;
      })
    },
    submit: function () {
      this.request.team = '/api/teams/' + this.getTeam.id;
      this.error = null;

      if (this.request.player != null) {
        this.axios.post('/api/team_requests', this.request)
            .then( () => {
              this.loadRequests();
            })
            .catch((error) => {
              console.log(error);
              useFlashMessageStore().error(error.response.data['hydra:description'])
            })
      }
    },
    loadRequests: function () {
      this.axios.get('/api/team_requests?pagination=false&status=ACTIVE&team=' + this.getTeam.id)
          .then(response => {
            this.requests = response.data['hydra:member'];
          });
    },
    update: function () {
      let promises = [];
      let api = this.axios;
      this.requests.forEach(function (request) {
        if (request.status === 'CANCELED') {
          promises.push(api.put('/api/team_requests/' + request.id, request));
        }
      });
      axios.all(promises)
          .then(() => {
            this.loadRequests()
          });
    }
  },
};
</script>
