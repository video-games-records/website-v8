<template>
  <div v-if="user.id">
    <router-link :to="{ name: 'PlayerIndex', params: { idPlayer: user.id, slugPlayer: user.slug }}" :title="user.username">
      <avatar v-if="showAvatar" v-bind:user="user"></avatar>
      <div>{{ user.username }}</div>
    </router-link>
  </div>
</template>

<script>
import Avatar from '@/components/user/Avatar.vue';

export default {
  name: 'User',
  components: {
    'avatar': Avatar
  },
  props: {
    'user': {
      type: Object,
      require: true,
    },
    'showAvatar': {
      default: false,
      type: Boolean,
    },
  },
};
</script>


