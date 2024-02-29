<template>
  <div>
    <topic-create v-bind:forum="getForum"></topic-create>
  </div>
</template>

<script>
import TopicCreate from "@/components/forum/topic/Create";
import {useAppStore} from "@/store/app";
import {useBreadcrumbsStore} from "@/store/base/breadcrumbs";

export default {
  components: {TopicCreate},
  name: 'TopicNew',
  data() {
    return {}
  },
  computed: {
    getForum() {
      return useAppStore().getForum
    },
    hasParent() {
      return this.getForum.parent != null;
    },
    getBreadcrumbLevel() {
      if (this.hasParent) {
        return 4;
      }
      return 3;
    },
  },
  created() {
    document.title = this.$t('forum.newTopic.title') + ' - ' + this.getForum.libForum + ' - ' + import.meta.env.VITE_APP_TITLE;
    if (this.hasParent) {
      useBreadcrumbsStore().setItem4({ text: this.$t('forum.newTopic.title')});
    } else {
      useBreadcrumbsStore().setItem3({ text: this.$t('forum.newTopic.title')});
    }
    useBreadcrumbsStore().setLevel(this.getBreadcrumbLevel);
  }

};
</script>
