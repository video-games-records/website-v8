<template>
  <div>
    <h2>{{ $t('global.proof') }}</h2>

    <div v-if="getPlayerChart && getPlayerChart.proof">
      <vgr-picture v-if="getPlayerChart && getPlayerChart.proof.picture" v-bind:picture="getPlayerChart.proof.picture"></vgr-picture>
      <vgr-video v-if="getPlayerChart && getPlayerChart.proof.video" v-bind:video="getPlayerChart.proof.video" width="720" height="405"></vgr-video>
    </div>

    <div v-if="showProofForm">
      <h3>{{ $t('proof.withPicture') }}</h3>
      <picture-form v-bind:player-chart="getPlayerChart"></picture-form>

      <h3>{{ $t('proof.withVideo') }}</h3>
      <video-form v-bind:player-chart="getPlayerChart"></video-form>
    </div>
  </div>
</template>

<script>

import PictureForm from "@/components/vgr/playerChart/proof/PictureForm.vue";
import VideoForm from "@/components/vgr/playerChart/proof/VideoForm.vue";
import Video from "@/components/vgr/video/Video.vue";
import Picture from "@/components/vgr/picture/Picture.vue";
import {useAppStore} from "@/store/app";
import Security from "@/mixins/Security.vue";

export default {
  mixins: [Security],
  name: 'PlayerChartProofForm',
  components: {
    PictureForm, VideoForm,
    'vgr-video' : Video,
    'vgr-picture' : Picture,
  },
  data() {
    return {

    };
  },
  computed: {
    getPlayerChart() {
      return useAppStore().getPlayerChart;
    },
    showProofForm() {
      return (
         this.getPlayerChart && (this.getPlayerChart.status.id === 1 || this.getPlayerChart.status.id === 3 || this.getPlayerChart.status.id === 7)
        && (this.getAuthenticatedPlayer['id'] === this.getPlayerChart.player.id)
      );
    },
  },
};
</script>
