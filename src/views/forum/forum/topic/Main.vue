<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import {useAppStore} from "@/store/app";
import {useBreadcrumbsStore} from "@/store/base/breadcrumbs";

export default {
  name: 'TopicMain',
  components: {},
  data() {
    return {
    };
  },
  computed: {
    getTopic() {
      return useAppStore().getTopic;
    },
    getForum() {
      return useAppStore().getForum;
    },
    hasParent() {
      return this.getForum.parent != null;
    },
    getBreadcrumbLevel() {
      if (this.hasParent) {
        return 4;
      }
      return 3;
    }
  },
  watch: {
    getTopic () {
      if (this.getBreadcrumbLevel === 4) {
        useBreadcrumbsStore().setItem4(
            { text: this.getTopic.libTopic, to: {name: 'TopicIndex',params: { idTopic: this.getTopic.id, slugTopic: this.getTopic.slug }}}
        );
      } else {
        useBreadcrumbsStore().setItem3(
            { text: this.getTopic.libTopic, to: {name: 'TopicIndex',params: { idTopic: this.getTopic.id, slugTopic: this.getTopic.slug }}}
        );
      }
      if (this.$route.name === 'TopicIndex') {
        useBreadcrumbsStore().setLevel(this.getBreadcrumbLevel);
      }
    }
  },
  created() {
    this.load();
  },
  updated() {
    if (this.$route.name === 'TopicIndex') {
      useBreadcrumbsStore().setLevel(this.getBreadcrumbLevel);
      if (this.getTopic.id !== this.$route.params.idTopic) {
        this.load();
      }
    }
  },
  methods: {
    load() {
      this.axios.get('/api/forum_topics/' + this.$route.params.idTopic)
          .then(response => {
            useAppStore().setTopic(response.data);
          })
    },
  },
};
</script>
