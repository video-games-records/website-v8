<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>

import {useBreadcrumbsStore} from "@/store/base/breadcrumbs";
import {useAppStore} from "@/store/app";

export default {
  name: 'ForumMain',
  components: {},
  data() {
    return {
      forum: {
        id: null,
        isParent: false,
        parent: null,
        libForum: '',
        slug: '',
      },
    };
  },
  created() {
    useBreadcrumbsStore().setLevel(1);
    this.load();
  },
  methods: {
    load() {
      this.axios.get('/api/forum_forums/' + this.$route.params.idForum)
          .then(response => {
            useAppStore().setForum(response.data);
          })
    },
  },
};
</script>
