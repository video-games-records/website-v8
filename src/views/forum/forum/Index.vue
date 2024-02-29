<template>
  <v-sheet>
    <h1>{{ getForum.libForum }}</h1>

    <sub-forums v-if="getForum.isParent" v-bind:id-forum="this.$route.params.idForum"></sub-forums>

    <v-sheet v-else>
      <v-sheet class="d-flex justify-center">
        <router-link v-if="isAuthenticated === true" :to="{ name: 'TopicNew'}" class="link-as-button">
          <v-btn class="ma-2">{{ $t('forum.newTopic.title') }}</v-btn>
        </router-link>
        <read-form class="ma-2" v-if="isAuthenticated" v-bind:id-forum="this.$route.params.idForum"></read-form>
      </v-sheet>

      <topic-list v-bind:topics="topics"></topic-list>

      <v-sheet class="d-flex justify-center">
        <router-link v-if="isAuthenticated === true" :to="{ name: 'TopicNew'}" class="link-as-button">
          <v-btn class="ma-2">{{ $t('forum.newTopic.title') }}</v-btn>
        </router-link>
        <read-form class="ma-2" v-if="isAuthenticated" v-bind:id-forum="this.$route.params.idForum"></read-form>
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<script>
import TopicList from '@/components/forum/topic/List.vue';
import SubForums from '@/components/forum/forum/SubForums.vue';
import ReadForm from "@/components/forum/forum/ReadForm";
import Security from "@/mixins/Security.vue";
import {useAppStore} from "@/store/app";
import {useBreadcrumbsStore} from "@/store/base/breadcrumbs";

export default {
  mixins: [Security],
  name: 'ForumIndex',
  components: {
    TopicList,
    SubForums,
    ReadForm,
  },
  computed: {
    getForum() {
      return useAppStore().getForum
    },
    getResourceUrl() {
      return '/api/forum_topics?forum=' + this.$route.params.idForum + '&boolArchive=false&itemsPerPage=' + this.itemsPerPage;
    }
  },
  data() {
    return {
      page: 1,
      length: 1,
      itemsPerPage: 20,
      topics: [],
    };
  },
  created() {
    this.updateResource();
  },
  /*updated() {
      useBreadcrumbsStore().setLevel(this.getBreadcrumbLevel);
      if (this.getTopic.id !== this.$route.params.idTopic) {
        this.load();
      }
  },*/
  methods: {
    updateResource() {
      this.axios.get(this.getResourceUrl)
          .then(response => {
            this.topics = response.data['hydra:member'];
            this.length = Math.trunc(response.data['hydra:totalItems'] / this.itemsPerPage - 1) + 1;
          })
    },
  },
};
</script>
