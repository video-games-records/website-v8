<template>
  <v-sheet class="pa-0">
    <v-row>
      <v-col v-if="!this.$vuetify.display.mobile" cols="12">
        <breadcrumb />
      </v-col>
      <v-col cols="12" order="2">
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>

import {useBreadcrumbsStore} from "@/store/base/breadcrumbs";
import {useAppStore} from "@/store/app";
import GameCard from "@/components/vgr/game/Card.vue";
import GameAside from "@/components/vgr/game/Aside.vue";
import Breadcrumb from "@/components/base/Breadcrumb.vue";

export default {
  name: 'ForumMain',
  components: {Breadcrumb, GameAside, GameCard},
  data() {
    return {
    };
  },
  computed: {
    getForum() {
      return useAppStore().getForum;
    },
    hasParent() {
      return this.getForum.parent != null;
    },
    getBreadcrumbLevel() {
      if (this.hasParent) {
        return 3;
      }
      return 2;
    },
    getLibForum() {
      if (localStorage.lang === 'fr') {
        return this.getForum.libForumFr;
      }
      return this.getForum.libForum;
    },
  },
  watch: {
    getForum () {
      if (this.hasParent) {
        useBreadcrumbsStore().setItem2(
            {
              text: this.getForum.parent.libForum,
              to: {name: 'ForumIndex', params: {idForum: this.getForum.parent.id, slugForum: this.getForum.parent.slug}}
            }
        );
        useBreadcrumbsStore().setItem3(
            {
              text: this.getLibForum,
              to: {name: 'ForumIndex', params: {idForum: this.getForum.id, slugForum: this.getForum.slug}}
            }
        );
      } else {
        useBreadcrumbsStore().setItem2(
            {
              text: this.getLibForum,
              to: {name: 'ForumIndex', params: {idForum: this.getForum.id, slugForum: this.getForum.slug}}
            }
        );
      }
      useBreadcrumbsStore().setLevel(this.getBreadcrumbLevel);
    }
  },
  created() {
    useBreadcrumbsStore().setItem1(
        { text: 'Forum', to: {name: 'ForumHome'}}
    );
    useBreadcrumbsStore().setLevel(this.getBreadcrumbLevel);
    this.load();
  },
  updated() {
    if (this.$route.name === 'ForumIndex') {
      useBreadcrumbsStore().setLevel(this.getBreadcrumbLevel);
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
          })
    },
  },
};
</script>
