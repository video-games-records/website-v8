<template>
  <v-sheet v-if="user.id">
    <avatar v-if="showAvatar" v-bind:user="user"></avatar>
    <v-sheet>{{ user.username }}</v-sheet>
   </v-sheet>
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


