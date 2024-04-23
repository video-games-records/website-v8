<template>
  <div>
    {{ $t('forum.tag.on') }}
    <date v-if="this.$vuetify.display.mobile" v-bind:date="message.createdAt"></date>
    <date v-else v-bind:date="message.createdAt"
          v-bind:options="{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }"></date>
    {{ $t('forum.tag.by') }}
    {{ message.user.username }}
  </div>
</template>

<script>
import Date from '@/components/tools/Date.vue';
import User from '@/components/user/User';

export default {
  name: 'LastMessage',
  components: {
    'date': Date,
    User,
  },
  props: {
    'message': {
      type: Object,
      require: true,
    },
  },
};
</script>


