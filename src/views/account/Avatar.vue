<template>
  <v-sheet>
    <avatar-upload-form callback="api/users/upload-avatar"/>
  </v-sheet>
</template>
<script>

import AvatarUploadForm from "@/components/avatar/UploadForm.vue";

export default {
  name: 'AccountAvatar',
  components: {AvatarUploadForm},
  data() {
    return {
    };
  },
};
</script>
