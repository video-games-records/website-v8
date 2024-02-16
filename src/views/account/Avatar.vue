<template>
  <v-sheet>
    <avatar-upload-form callback="api/users/upload-avatar"/>
  </v-sheet>
</template>
<script>

import {resizeImage} from '@/plugins/image-resize.js';
import {useFlashMessageStore} from "@/store/base/flashMessage";
import AvatarUploadForm from "@/components/avatar/UploadForm.vue";

export default {
  name: 'AccountAvatar',
  components: {AvatarUploadForm},
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
        url: "api/users/upload-avatar",
        data: {
          file : this.base64String
        }
      }
      this.axios(requestData)
          .then(response => {
            useFlashMessageStore().confirm(response.data.message)
          })
          .catch(error => {
            useFlashMessageStore().error('ERR0R')
          });
    },
  },
};
</script>
