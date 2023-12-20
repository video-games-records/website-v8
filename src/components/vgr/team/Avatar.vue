<template>
  <div v-if="team.id" class="avatar">
    <v-avatar :image="getAvatarUrl"></v-avatar>
  </div>
</template>

<script>
export default {
  name: 'Avatar',
  props: ['team'],
  computed: {
    getAvatarUrl() {
      return import.meta.env.VITE_ROOT_API + '/teams/' + this.team.id + '/avatar';
    },
  },
};
</script>


