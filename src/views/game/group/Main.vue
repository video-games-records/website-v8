<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import {useAppStore} from "@/store/app";
import {useBreadcrumbsStore} from "@/store/base/breadcrumbs";
import WatchLanguage from "@/mixins/WatchLanguage.vue";

export default {
  mixins: [WatchLanguage],
  name: 'GroupMain',
  components: {},
  data() {
    return {
    };
  },
  computed: {
    getGame() {
      return useAppStore().getGame;
    },
    getGroup() {
      return useAppStore().getGroup;
    },
  },
  watch: {
    '$route.params.idGroup' () {
      this.load();
    },
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      useBreadcrumbsStore().setLevel(2);
      this.axios.get('/api/groups/' + this.$route.params.idGroup)
          .then(response => {
            useAppStore().setGroup(response.data);
            useBreadcrumbsStore().setItem2(
                { text: this.getGroup.name, to: {name: 'GroupIndex',params: { idGroup: this.getGroup.id, slugGame: this.getGroup.slug }}}
            );
            document.title = this.getGroup.name + ' - ' + this.getGame.name + ' - ' + import.meta.env.VITE_APP_TITLE;
          })
    },
  },
};
</script>
