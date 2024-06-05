<template>
  <div>
    <div class="d-flex justify-center flex-wrap">
      <router-link v-if="isAuthenticated === true" :to="{ name: 'GameForumTopicNew'}" class="link-as-button">
        <v-btn class="ma-2">{{ $t('forum.newTopic.title') }}</v-btn>
      </router-link>
      <read-form class="ma-2" v-if="isAuthenticated" v-bind:id-forum="this.$route.params.idForum"></read-form>
    </div>

    <topic-list v-bind:topics="topics" route="GameForum">></topic-list>

    <v-pagination
        :density="this.$vuetify.display.mobile ? 'compact' : 'default'"
        v-model="page"
        :length="length"
        total-visible=6
        @update:modelValue="updateResource()"/>


    <div class="d-flex justify-center flex-wrap">
      <router-link v-if="isAuthenticated === true" :to="{ name: 'GameForumTopicNew'}" class="link-as-button">
        <v-btn class="ma-2">{{ $t('forum.newTopic.title') }}</v-btn>
      </router-link>
      <read-form class="ma-2" v-if="isAuthenticated" v-bind:id-forum="this.$route.params.idForum"></read-form>
    </div>

  </div>
</template>

<script>
import TopicList from '@/components/forum/topic/List.vue';
import ReadForm from "@/components/forum/forum/ReadForm";
import Security from "@/mixins/Security.vue";
import {useAppStore} from "@/store/app";

export default {
  mixins: [Security],
  name: 'GameForumIndex',
  components: {
    TopicList,
    ReadForm,
  },
  data() {
    return {
      page: 1,
      length: 1,
      itemsPerPage: 20,
      topics: [],
    };
  },
  computed: {
    getForum() {
      return useAppStore().getForum
    },
    getResourceUrl() {
      let url = '/api/forum_topics?forum=' + this.$route.params.idForum + '&boolArchive=false&itemsPerPage=' + this.itemsPerPage + '&page=' + this.page
        + '&groups[]=forum.topic.read&groups[]=forum.topic.lastMessage&groups[]=forum.message.last';
      if (this.isAuthenticated) {
        url += '&groups[]=forum.topicUser.read&groups[]=forum.topic.topicUser1';
      }
      return url;
    }
  },
  created() {
    this.updateResource();
  },
  methods: {
    updateResource() {
      this.axios.get(this.getResourceUrl)
          .then(response => {
            this.topics = response.data['hydra:member'];
            this.length = Math.trunc((response.data['hydra:totalItems'] - 1) / this.itemsPerPage ) + 1;
          })
    },
  },
};
</script>
