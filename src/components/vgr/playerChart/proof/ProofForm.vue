<template>
  <div>
    <h2 class="ma-2">{{ $t('global.proof') }}</h2>

    <div v-if="getPlayerChart && getPlayerChart.proof">
      <vgr-picture v-if="getPlayerChart && getPlayerChart.proof.picture" v-bind:picture="getPlayerChart.proof.picture"></vgr-picture>
      <vgr-video v-if="getPlayerChart && getPlayerChart.proof.video" v-bind:video="getPlayerChart.proof.video" width="720" height="405"></vgr-video>
    </div>

    <div v-if="showProofForm">
      <template v-if="!isProofVideoOnly">
        <h3>{{ $t('proof.withPicture') }}</h3>
        <picture-form v-bind:player-chart="getPlayerChart"></picture-form>
      </template>
      <template v-else>
        {{ $t('proof.onlyVideo') }}
      </template>


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
    getChart() {
      return useAppStore().getChart;
    },
    showProofForm() {
      return (
         this.getPlayerChart && (this.getPlayerChart.status.id === 1 || this.getPlayerChart.status.id === 3 || this.getPlayerChart.status.id === 7)
        && (this.getAuthenticatedPlayer['id'] === this.getPlayerChart.player.id)
      );
    },
    isProofVideoOnly() {
      return (
          this.getChart && this.getChart.isProofVideoOnly === true
      );
    },

  },
};
</script>
