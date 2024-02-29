<template>
  <div>
    <topic-reply v-if="getTopic.id" v-bind:topic="getTopic"></topic-reply>
  </div>
</template>


<script>
import TopicReply from "@/components/forum/topic/Reply";
import {useAppStore} from "@/store/app";

export default {
  name: 'ForumTopicReply',
  components: {
    TopicReply,
  },
  data() {
    return {};
  },
  computed: {
    title() {
      return this.$t('forum.reply.title') + ' - ' + this.getTopic.libTopic + ' - ' + this.getForum.libForum + ' - ' + import.meta.env.VITE_APP_TITLE;
    },
    getForum() {
      return useAppStore().getForum;
    },
    getTopic() {
      return useAppStore().getTopic;
    },
  },
  created() {

  },
  methods: {

  },
};
</script>
