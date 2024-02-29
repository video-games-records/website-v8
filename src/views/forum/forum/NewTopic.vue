<template>
  <div>
    <topic-create v-bind:forum="getForum"></topic-create>
  </div>
</template>

<script>
import TopicCreate from "@/components/forum/topic/Create";

export default {
  components: {TopicCreate},
  name: 'TopicNew',
  data() {
    return {}
  },
  computed: {
    title() {
      return this.$i18n.t('forum.newTopic.title') + ' - ' + this.getForum.libForum + ' - ' + process.env.VUE_APP_TITLE;
    },
    description() {
      return this.$i18n.t('forum.newTopic.description') + this.getForum.libForum;
    },
    getForum() {
      return this.$parent.forum;
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
    getLanguage() {
      return i18n.locale;
    },
  },
  watch: {
    getLanguage() {
      this.loadData();
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      if (this.hasParent) {
        this.setBreadcrumbItem4({text: this.$i18n.t('forum.newTopic.title')});
      } else {
        this.setBreadcrumbItem3({text: this.$i18n.t('forum.newTopic.title')});
      }
      this.setBreadcrumbLevel(this.getBreadcrumbLevel);
    }
  },
};
</script>
