<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import {useAppStore} from "@/store/app";
import {useBreadcrumbsStore} from "@/store/base/breadcrumbs";

export default {
  name: 'GameForumMain',
  data() {
    return {};
  },
  computed: {
    getForum() {
      return useAppStore().getForum;
    },
  },
  created() {
    useBreadcrumbsStore().setLevel(2);
    this.load();
  },
  updated() {
    if (this.$route.name  === 'GameForumIndex') {
      useBreadcrumbsStore().setLevel(2);
      if (this.getForum.id !== this.$route.params.idForum) {
        this.load();
      }
    }
  },
  methods: {
    load() {
      this.axios.get('/api/forum_forums/' + this.$route.params.idForum)
          .then(response => {
            useAppStore().setForum(response.data);
            useBreadcrumbsStore().setItem2(
                { text: 'Forum', to: {name: 'GameForumIndex',params: { idForum: this.getForum.id, slugForum: this.getForum.slug }}}
            );
          })
    },
  },
};
</script>
