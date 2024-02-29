<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import {useAppStore} from "@/store/app";

export default {
  name: 'TopicMain',
  components: {},
  data() {
    return {
      topic: {
        id: null,
        libTopic: '',
        slug: '',
      },
    };
  },
  created() {
    this.load();
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
