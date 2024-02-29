<template>
  <div v-if="user.id">
    <avatar v-if="showAvatar" v-bind:user="user"></avatar>
    <div>{{ user.username }}</div>
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


