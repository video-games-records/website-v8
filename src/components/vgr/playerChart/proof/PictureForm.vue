<template>
  <div>
    <div v-if="showForm" class="container">
      <vue-base64-file-upload
          class="v1"
          accept="image/png,image/jpeg"
          image-class="v1-image"
          input-class="v1-image"
          @size-exceeded="onSizeExceeded"
          @file="onFile"
          @load="onLoad" />
      <v-btn :disabled="!hasImage" v-on:click="submitFile()">{{ $t('tag.submit') }}</v-btn>
    </div>
  </div>
</template>

<script>
import VueBase64FileUpload from 'vue-base64-file-upload';
import App from "@/mixins/App.vue";

export default {
  mixins:[App],
  name: 'PlayerChartPictureForm',
  components: {
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
      isLoading: false,
      showForm: true,
      hasSuccess: false,
      hasError: false,
      error: null,
      file: null,
      customImageMaxSize: 2,
    };
  },
  computed: {
    hasImage() {
      return this.file !== null;
    }
  },
  methods: {
    onFile(file) {
      console.log(file); // file object
    },

    onLoad(dataUri) {
      console.log(dataUri); // data-uri string
      this.file = dataUri;
    },

    onSizeExceeded(size) {
      alert(`Image ${size}Mb size exceeds limits of ${this.customImageMaxSize}Mb!`);
    },

    submitFile() {
      this.loading = true;
      console.log(this.file);

      const requestData = {
        method: 'post',
        url: "api/player-charts/" + this.playerChart.id +"/send-picture",
        data: {
          file : this.file
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
