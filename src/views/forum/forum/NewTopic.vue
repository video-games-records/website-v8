<template>
  <div>
    <topic-create v-bind:forum="getForum"></topic-create>
  </div>
</template>

<script>
import TopicCreate from "@/components/forum/topic/Create";
import {useAppStore} from "@/store/app";

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
   /* getBreadcrumbLevel() {
      if (this.hasParent) {
        return 4;
      }
      return 3;
    },*/
  },
  created() {
    document.title = this.$t('forum.newTopic.title') + ' - ' + this.getForum.libForum + ' - ' + import.meta.env.VITE_APP_TITLE;
  }

};
</script>
