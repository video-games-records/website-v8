<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import {useAppStore} from "@/store/app";
import {useBreadcrumbsStore} from "@/store/base/breadcrumbs";

export default {
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
  created() {
    useBreadcrumbsStore().setLevel(2);
    this.load();
  },
  updated() {
    if (this.$route.name  === 'GroupIndex') {
      useBreadcrumbsStore().setLevel(2);
      if (this.getGroup.id !== this.$route.params.idGroup) {
        this.load();
      }
    }
  },
  methods: {
    load() {
      this.axios.get('/api/groups/' + this.$route.params.idGroup)
          .then(response => {
            useAppStore().setGroup(response.data);
            useBreadcrumbsStore().setItem2(
                { text: this.getGroup.name, to: {name: 'GroupIndex',params: { idGame: this.getGroup.id, slugGame: this.getGroup.slug }}}
            );
            document.title = this.getGroup.name + ' - ' + this.getGame.name + ' - ' + import.meta.env.VITE_APP_TITLE;
          })
    },
  },
};
</script>
