<template>
  <div v-if="player.id" class="avatar">
    <v-avatar :size="size" :image="getAvatarUrl"></v-avatar>
  </div>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    'player': {
      type: Object,
      require: true,
    },
    'size': {
      type: String,
      default: 'default',
      require: false,
    },
  },
  computed: {
    getAvatarUrl() {
      return import.meta.env.VITE_ROOT_API + '/users/' + this.player.id + '/avatar';
    },
  },
};
</script>


