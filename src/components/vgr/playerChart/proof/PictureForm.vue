<template>
  <div>
    <div v-if="showForm" class="container">
      <image-uploader
          :debug="1"
          :maxWidth="1920"
          :maxHeight="1080"
          :quality="0.9"
          :autoRotate=false
          outputFormat="verbose"
          :preview=true
          :className="['fileinput', { 'fileinput--loaded' : hasImage }]"
          :capture="false"
          accept="image/png,image/jpeg"
          @input="setImage"
          @onUpload="startImageResize"
          @onComplete="endImageResize"
      ></image-uploader>

      <button :disabled="!hasImage" v-on:click="submitFile()">{{ $t('tag.submit') }}</button>
    </div>
  </div>
</template>

<script>
import ImageUploader from 'vue-image-upload-resize';
import App from "@/mixins/App.vue";

export default {
  mixins:[App],
  name: 'PlayerChartPictureForm',
  components: {
    ImageUploader
  },
  props: {
    'playerChart': {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      isLoading: false,
      showForm: true,
      hasSuccess: false,
      hasError: false,
      error: null,
      file: {},
      hasImage: false,
    };
  },
  computed: {},
  methods: {
    startImageResize() {

    },
    endImageResize() {

    },
    setImage(file) {
      this.hasImage = true;
      this.file = file;
    },
    submitFile() {
      this.loading = true;

      const requestData = {
        method: 'post',
        url: "api/player-charts/" + this.playerChart.id +"/send-picture",
        data: {
          file : this.file.dataUrl
        }
      }

      this.axios(requestData)
          .then(response => {
            this.loading = false;
            this.showForm = false;
            this.hasSuccess = true;
            this.updatePlayerChart();
          })
          .catch(error => {
            this.loading = false;
            this.hasError = true;
            //this.$store.dispatch('flashMessage/confirm', this.error);
          });
    },
  },
};
</script>
