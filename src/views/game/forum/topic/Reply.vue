<template>
  <div>
    <topic-reply v-if="getTopic.id" v-bind:topic="getTopic" route="GameForum"></topic-reply>
  </div>
</template>


<script>
import TopicReply from '@/components/forum/topic/Reply';
import {useAppStore} from "@/store/app";
import {useBreadcrumbsStore} from "@/store/base/breadcrumbs";

export default {
  name: 'GameForumTopicReply',
  components: {TopicReply},
  data() {
    return {};
  },
  computed: {
    getForum() {
      return useAppStore().getForum;
    },
    getTopic() {
      return useAppStore().getTopic;
    },
  },
  created() {
    document.title = this.$t('forum.reply.title') + ' - ' + this.getTopic.libTopic + ' - ' + this.getForum.libForum  + ' - ' + import.meta.env.VITE_APP_TITLE;
    useBreadcrumbsStore().setItem4({ text: this.$t('forum.reply.title')});
    useBreadcrumbsStore().setLevel(4);
  },
};
</script>
