<template>
  <div>
    <v-card class="ma-3">
      <v-card-title class="bg-primary">{{ $t('avatar.choose') }}</v-card-title>
      <v-card-item>
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
              <v-card-title class="bg-primary pa-3">resized image</v-card-title>
              <v-card-item>
                <img v-if="base64String !== null" alt="##avatar##" :src="base64String" />
              </v-card-item>
              <v-card-actions>
                <v-btn :disabled="base64String === null" v-on:click="submit()">{{ $t('avatar.submit') }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-item>
    </v-card>
  </div>
</template>
<script>

import {resizeImage} from '@/plugins/image-resize.js';
import {useFlashMessageStore} from "@/store/base/flashMessage";

export default {
  name: 'AvatarUploadForm',
  props: {
    'callback': {
      require: true,
      type: String,
      default: 'api/users/upload-avatar'
    },
  },
  data() {
    return {
      files: [],
      base64String: null,
    };
  },
  methods: {
    onChange() {
      let file = this.files[0];
      // start: preview resized
      resizeImage({ file: file, maxSize: 100})
        .then((resizedimage) => {
          this.base64String = resizedimage;
        })
        .catch((err) => {
          console.error(err);
        });
    },

    submit() {
      const requestData = {
        method: 'post',
        url: this.callback,
        data: {
          file : this.base64String
        }
      }
      this.axios.request(requestData)
          .then(response => {
            useFlashMessageStore().confirm('OK')
          })
          .catch(() => {
            useFlashMessageStore().error('ERR0R')
          });
    },
  },
};
</script>
