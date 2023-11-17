<template>
  <div v-if="team.id" class="avatar">
    <img :src="getAvatarUrl" alt="" width="100" height="100" aria-hidden="true"/>
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


