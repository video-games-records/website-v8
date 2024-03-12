<template>
  <div>
    <avatar-upload-form callback="api/users/upload-avatar"/>
  </div>
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
