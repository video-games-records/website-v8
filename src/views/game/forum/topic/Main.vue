<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>


import {useAppStore} from "@/store/app";
import {useBreadcrumbsStore} from "@/store/base/breadcrumbs";

export default {
  name: 'GameForumTopicMain',
  data() {
    return {
      topic: {
        id: null,
        type: {
          libType: '',
        }
      },
    };
  },
  computed: {
    getTopic() {
      return useAppStore().getTopic;
    },
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      useBreadcrumbsStore().setLevel(3);
      this.axios.get('/api/forum_topics/' + this.$route.params.idTopic)
          .then(response => {
            useAppStore().setTopic(response.data);
            useBreadcrumbsStore().setItem3(
                { text: this.getTopic.libTopic, to: {name: 'GameForumTopicIndex',params: { idTopic: this.getTopic.id, slugTopic: this.getTopic.slug }}}
            );
          })
    },
  },
};
</script>
