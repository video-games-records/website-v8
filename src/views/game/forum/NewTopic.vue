<template>
  <div>
    <topic-create v-bind:forum="getForum" route="GameForum"></topic-create>
  </div>
</template>

<script>
import TopicCreate from "@/components/forum/topic/Create";
import {useAppStore} from "@/store/app";
import {useBreadcrumbsStore} from "@/store/base/breadcrumbs";

export default {
  components: {TopicCreate},
  name: 'GameForumTopicNew',
  data() {
    return {};
  },
  computed: {
    getForum() {
      return useAppStore().getForum
    },
  },
  created() {
    useBreadcrumbsStore().setItem3({ text: this.$t('forum.newTopic.title')});
    useBreadcrumbsStore().setLevel(3);
  }
};
</script>
