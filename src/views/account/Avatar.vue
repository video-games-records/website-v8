<template>
  <v-sheet>
    <h1 class="screen-reader-text">{{ $t('title') }}</h1>
    <div>
      <label for="fileInput">{{ $t('avatar.choose') }}</label>
      <image-uploader
          :debug="1"
          :maxWidth="100"
          :maxHeight="100"
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
    </div>

    <div>
      <button :disabled="!hasImage" v-on:click="submitFile()">{{ $t('avatar.submit') }}</button>
    </div>

    <div v-if="hasMessage" role="alert">
      {{ message }}
    </div>
  </v-sheet>
</template>

<script>
import ImageUploader from 'vue-image-upload-resize';

export default {
  name: 'AccountAvatar',
  components: {
    ImageUploader
  },
  data() {
    return {
      file: {},
      apiResult: null,
      message: null,
      hasImage: false,
    };
  },
  computed: {
    hasMessage() {
      return this.message != null;
    },
  },
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
      /*UserApi.updloadAvatar(this.file.dataUrl).then(response => {
        if (response.status === 200) {
          this.apiResult = response.data.success;
          this.message = response.data.message;
        } else {
          this.apiResult = false;
          this.message = 'ERROR';
        }
      });*/
    },
  },
};
</script>
