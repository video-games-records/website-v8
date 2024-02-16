<template>
  <v-sheet>
    <h1 class="screen-reader-text">{{ $t('avatar.choose') }}</h1>
    <v-row class="ma-2">
      <v-col cols="12">
        <v-file-input
            v-model="files"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="pick an image"
            prepend-icon="mdi-camera"
            :label="$t('avatar.choose')"
            @update:modelValue="onChange()"
        ></v-file-input>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title class="bg-primary">resized image</v-card-title>
          <v-card-item>
            <img alt="" :src="resizedImg" />
          </v-card-item>
          <v-card-actions>
            <v-btn :disabled="resizedImg == ''" v-on:click="submitFile()">{{ $t('avatar.submit') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script>

import resizeImage from '@/plugins/image-resize.js';

export default {
  name: 'AccountAvatar',

  data() {
    return {
      files: [],
      resizedImg: '',
    };
  },

  methods: {
    onChange() {
      let file = this.files[0];
      // start: preview resized
      resizeImage({ file: file, maxSize: 100})
        .then((resizedimage) => {
          this.resizedImg = URL.createObjectURL(resizedimage);
        })
        .catch((err) => {
          console.error(err);
        });
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
