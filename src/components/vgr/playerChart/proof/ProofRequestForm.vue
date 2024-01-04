<template>
  <div v-if="showRequestForm" class="proof-request">
    <div v-if="this.canAskProof">
      <p class="ma-3">
        {{ $t('score.notProoved', [getPlayerChart.player.pseudo]) }}<br/>
        {{ $t('proof.ask') }}
      </p>
      <v-form v-model="isValid" @submit.prevent @submit="submit()">
        <v-textarea v-model="request.message"  :label="$t('proof.request.justify')" :rules="[rules.required]"></v-textarea>
        <v-btn type="submit" class="mt-2">{{ $t('tag.submit') }}</v-btn>
      </v-form>
    </div>
    <div v-else>{{ $t('proof.request.reachLimit') }}</div>
  </div>
</template>

<script>

import Security from "@/mixins/Security.vue";
import {useAppStore} from "@/store/app";
import {useFlashMessageStore} from "@/store/base/flashMessage";
import Rules from "@/mixins/Rules.vue";

export default {
  mixins: [Security, Rules],
  name: 'PlayerChartProofRequestForm',
  components: {

  },
  data() {
    return {
      isValid: null,
      canAskProof: true,
      request: {
        playerChart: '',
        playerRequesting: '',
        message: ''
      },
    };
  },
  computed: {
    getPlayerChart() {
      return useAppStore().getPlayerChart;
    },
    showRequestForm() {
      return (
          (this.getPlayerChart.status.id === 1)
          && this.hasRolePlayer
          && (this.getAuthenticatedPlayer['id'] !== this.getPlayerChart.player.id)
      );
    },
  },
  created() {
    this.majCanAskProof();
  },
  methods: {
    majCanAskProof: function () {
      this.axios.get('/api/players/' + this.getAuthenticatedPlayer.id + '/can-ask-proof')
      .then(response => {
        this.canAskProof = response.data;
      })
    },
    submit: function () {
      if (!this.isValid) return;
      this.request.playerChart = this.getPlayerChart['@id'];
      this.request.playerRequesting = this.getAuthenticatedPlayer['@id'];
      this.axios.post('/api/proof_requests', this.request)
          .then(response => {
            this.majCanAskProof();
            this.axios.get('/api/player_charts/' + this.getPlayerChart.id)
                .then(response => {
                  useAppStore().setPlayerChart(response.data);
                })
            useFlashMessageStore().confirm(this.$t('proof.form.success'));
      });
    },
  },

};
</script>
