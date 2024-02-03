<template>
  <div>
    <h1>{{ $t('score.player', [getPlayerChart.player.pseudo]) }}</h1>

    <v-table>
      <thead>
      <tr>
        <th v-for="lib in getChart.libs" :data-position="lib.position" :key="lib.id">{{ lib.name ?? 'Score' }}</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td v-for="lib in getPlayerChart.libs" :data-position="lib.position" :key="lib.id">{{ lib.formatValue }}</td>
      </tr>
      </tbody>
    </v-table>

    <v-table>
      <thead>
      <tr>
        <th colspan="2" class="text-center">Informations</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td class="font-weight-bold">{{ $t('score.lastUpdate') }}</td>
        <td>
          <last-update v-bind:player-chart=getPlayerChart v-bind:tooltip=false></last-update>
        </td>
      </tr>
      <tr>
        <td class="font-weight-bold">{{ $t('global.status') }}</td>
        <td>{{ getPlayerChart.status.name }}</td>
      </tr>
      <tr v-if="getPlayerChart.dateInvestigation">
        <td>{{ $t('score.dateInvestigation') }}</td>
        <td><date v-bind:date="getPlayerChart.dateInvestigation"></date></td>
      </tr>
      </tbody>
    </v-table>

    <proof-form/>

    <proof-request-form />
  </div>
</template>

<script>
import ProofForm from "@/components/vgr/playerChart/proof/ProofForm.vue";
import ProofRequestForm from "@/components/vgr/playerChart/proof/ProofRequestForm.vue";
import LastUpdate from '@/components/vgr/playerChart/LastUpdate';
import Date from '@/components/tools/Date.vue';
import Security from "@/mixins/Security.vue";
import {useAppStore} from "@/store/app";

export default {
  mixins: [Security],
  name: 'PayerChartIndex',
  components: {
    ProofRequestForm, ProofForm, LastUpdate, Date},
  data() {
    return {

    };
  },
  computed: {
    getGame() {
      return useAppStore().getGame;
    },
    getGroup() {
      return useAppStore().getGroup;
    },
    getChart() {
      return useAppStore().getChart;
    },
    getPlayerChart() {
      return useAppStore().getPlayerChart;
    },
  },
  methods: {
    close() {
      /*if (confirm(this.$i18n.t('proof.delete.confirm'))) {
        let proof = this.getPlayerChart.proof;
        proof.status = 'CLOSED';
        ProofApi.put(proof).then(response => {
          if (response.status === 200) {
            PlayerChartApi.getPlayerChart(this.$route.params.idPc)
                .then(playerChart => {
                  this.$store.dispatch('navigation/setPlayerChart', playerChart);
                });
          }
        });
      }*/
    },
  },
};
</script>
