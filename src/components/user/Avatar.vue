<template>
  <div v-if="user.id" class="avatar">
    <img :src="getAvatarUrl" alt="" width="100" height="100" aria-hidden="true" loading="lazy"/>
  </div>
</template>

<script>
export default {
  name: 'Avatar',
  props: ['user'],
  computed: {
    getAvatarUrl() {
      return import.meta.env.VITE_ROOT_API + '/users/' + this.user.id + '/avatar';
    },
  },
};
</script>
