<template>
  <div>
    <topic-reply v-if="getTopic.id" v-bind:topic="getTopic"></topic-reply>
  </div>
</template>


<script>
import TopicReply from "@/components/forum/topic/Reply";
import {useAppStore} from "@/store/app";
import {useBreadcrumbsStore} from "@/store/base/breadcrumbs";

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
    hasParent() {
      return this.getForum.parent != null;
    },
    getBreadcrumbLevel() {
      if (this.hasParent) {
        return 5;
      }
      return 4;
    },
  },
  created() {
    document.title = this.$t('forum.reply.title') + ' - ' + this.getTopic.libTopic + ' - ' + this.getForum.libForum  + ' - ' + import.meta.env.VITE_APP_TITLE;
    if (this.hasParent) {
      useBreadcrumbsStore().setItem5({ text: this.$t('forum.reply.title')});
    } else {
      useBreadcrumbsStore().setItem4({ text: this.$t('forum.reply.title')});
    }
    console.log(this.getBreadcrumbLevel);
    useBreadcrumbsStore().setLevel(this.getBreadcrumbLevel);
  },
};
</script>
