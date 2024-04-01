<template>
  <div>
    <breadcrumb />

    <div v-if="isAuthenticated" class="d-flex justify-center flex-wrap">
      <v-btn class="ma-2" v-on:click="readAll">{{ $t('forum.tag.markAllAsRead') }}</v-btn>
      <v-btn class="ma-2" :to="{ name: 'ForumNotify'}">{{ $t('forum.notify.title') }}</v-btn>
    </div>

    <v-progress-linear v-if="categories.length === 0" indeterminate color="yellow-darken-2"></v-progress-linear>
    <div v-for="category in categories" :data-position="category.position" :key="category.id" class="forum-list">
      <h2 class="ma-2">{{ category.libCategory }}</h2>
      <forum-list v-bind:forums=category.forums />
    </div>

    <player-list-connected />
  </div>

</template>

<script>
import ForumList from '@/components/forum/forum/List.vue';
import Security from "@/mixins/Security.vue";
import Breadcrumb from "@/components/base/Breadcrumb.vue";
import {useBreadcrumbsStore} from "@/store/base/breadcrumbs";
import {useFlashMessageStore} from "@/store/base/flashMessage";
import PlayerListConnected from "@/components/vgr/player/list/Connected.vue";

export default {
  mixins: [Security],
  name: 'ForumHome',
  components: {
    PlayerListConnected,
    Breadcrumb,
    ForumList
  },
  data() {
    return {
      categories: []
    };
  },
  computed: {
    getNow: function () {
      function pad(s) {
        return (s < 10) ? '0' + s : s;
      }

      let d = new Date();
      return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-');
    }
  },
  created() {
    document.title = 'Forum' + ' - ' + import.meta.env.VITE_APP_TITLE;
    this.load();
    useBreadcrumbsStore().setLevel(1);
    useBreadcrumbsStore().setItem1(
        { text: 'Forum', to: {name: 'ForumHome'}}
    );
  },
  methods: {
    load() {
      this.axios.get('/api/categorie/home')
          .then(response => {
            this.categories = response.data['hydra:member'];
          })
    },
    readAll: function () {
      this.axios.get('/api/forum_forums/read-all')
          .then(() => useFlashMessageStore().confirm('OK'))
    },
  },
};
</script>
