<template>
  <v-sheet class="score pa-2 ma-2">
    <h3 class="h4">
      <router-link
          :to="{ name: 'ChartIndex', params: { idGroup:playerChart.chart.group.id, slugGroup:playerChart.chart.group.slug, idChart: playerChart.chart.id, slugChart: playerChart.chart.slug }}">
        {{ playerChart.chart.name }}
      </router-link>
    </h3>

    <div v-for="lib in playerChart.libs" :data-position="lib.position" :key="lib.id">
      <status v-bind:status=playerChart.status></status>
      <v-tooltip activator="parent" location="start">{{ playerChart.status.name }}</v-tooltip>
      <span class="ma-2"><strong>{{ lib.formatValue }}</strong></span>
    </div>

    <div v-if="getPlayerChart.proof">
      <vgr-picture v-if="getPlayerChart.proof.picture" v-bind:picture="getPlayerChart.proof.picture"></vgr-picture>

      <router-link v-else-if="getPlayerChart.proof.video"
                   :to="{ name: 'VideoIndex', params: { idVideo: getPlayerChart.proof.video.id, slugVideo: getPlayerChart.proof.video.slug }}">
        {{ playerChart.proof.video.libVideo }}
      </router-link>

      <div v-if="manage === true" class="text-center">
        <v-btn @click="close()" append-icon="mdi-delete">
          {{ $t('tag.delete') }}
        </v-btn>
      </div>
    </div>
    <div v-else>
      <div v-if="manage === true">
        <picture-drop-form ref="dropZone" :id-player-chart="playerChart.id"/>
      </div>
      <span v-else>{{ $t('score.notProoved') }}</span>
    </div>
  </v-sheet>
</template>

<script>
import Picture from "@/components/vgr/picture/Picture";
import Status from "@/components/vgr/playerChart/Status";
import PictureDropForm from "@/components/vgr/picture/Drop";
import {usePlayerProofStore} from "@/store/player/proof";

export default {
  name: 'PlayerProfileProofPlayerChart',
  components: {
    Status,
    'vgr-picture': Picture,
    PictureDropForm
  },
  props: {
    'playerChart': {
      type: Object,
      require: true,
    },
    'manage': {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  computed: {
    getPlayerChart() {
      if (this.data.id) {
        return this.data;
      } else {
        return this.playerChart;
      }
    },
    getPicture() {
      return usePlayerProofStore().getPicture;
    }
  },
  data() {
    return {
      data: {},
    };
  },
  created() {
    if (!this.data.id) {
      this.data = this.playerChart;
    }
  },
  watch: {
    getPicture() {
      if (this.getPicture !== null && usePlayerProofStore().getIdPlayerChart === this.data.id) {
        this.submitFile();
      }
    }
  },
  methods: {
    submitFile() {
      const requestData = {
        method: 'post',
        url: "api/player-charts/" + this.playerChart.id +"/send-picture",
        data: {
          file : this.getPicture
        }
      }

      this.axios.request(requestData).then(() => {
        this.reload();
        usePlayerProofStore().resetPicture();
      });

    },
    reload() {
      this.axios.get('api/player_charts/' + this.playerChart.id)
          .then(response => {
            this.data = response.data;
          })
    },
    close() {
      if (confirm(this.$t('proof.delete.confirm'))) {
        let proof = this.playerChart.proof;
        proof.status = 'CLOSED';
        this.axios.put('/api/proofs/' + proof.id, proof)
            .then(() => {
              this.reload();
            });
      }
    },
  },
};
</script>

<style scoped>
.score {
  background-color: #ededed;
}

</style>
