<template>
  <div>
    <div v-if="showForm">
      <picture-drop-form ref="dropZone" :id-player-chart="playerChart.id"/>
    </div>
  </div>
</template>

<script>
import VueBase64FileUpload from 'vue-base64-file-upload';
import App from "@/mixins/App.vue";
import PictureDropForm from "@/components/vgr/picture/Drop.vue";
import {usePlayerProofStore} from "@/store/player/proof";

export default {
  mixins:[App],
  name: 'PlayerChartPictureForm',
  components: {
    PictureDropForm,
    VueBase64FileUpload
  },
  props: {
    'playerChart': {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      showForm: true,
    };
  },
  computed: {
    getPicture() {
      return usePlayerProofStore().getPicture;
    }
  },
  watch: {
    getPicture() {
      if (this.getPicture !== null && usePlayerProofStore().getIdPlayerChart === this.playerChart.id) {
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
        this.showForm = false;
        this.updatePlayerChart();
      });
    },
  },
};
</script>
