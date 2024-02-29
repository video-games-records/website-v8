<template>
  <button type="button" class="button-as-link forum-notify" v-on:click="submit">
        <span v-if="topicUser.boolNotif === true" :title="$t('notifyOff')">
            <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
                <use xlink:href="#notification-on"/>
            </svg>
            <span class="screen-reader-text">{{ $t('forum.notify.off') }}</span>
        </span>
    <span v-else :title="$t('notifyOn')">
            <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
                <use xlink:href="#notification-off"/>
            </svg>
            <span class="screen-reader-text">{{ $t('forum.notify.on') }}</span>
        </span>
  </button>
</template>

<script>

export default {
  name: 'Notify',
  props: {
    topicUser: {
      type: Object,
      require: true,
    },
  },
  methods: {
    submit: function () {
      this.topicUser.boolNotif = this.topicUser.boolNotif !== true;
      this.axios.put('/api/forum_topic_users/' + this.topicUser.id, this.topicUser);
    },
  },
};
</script>


