<template>
  <div>
    <h1>{{ getForum.libForum }}</h1>

    <sub-forums v-if="getForum.isParent" v-bind:id-forum="this.$route.params.idForum"></sub-forums>

    <div v-else>
      <div class="d-flex justify-center flex-wrap">
        <router-link v-if="isAuthenticated === true" :to="{ name: 'TopicNew'}" class="link-as-button">
          <v-btn class="ma-2">{{ $t('forum.newTopic.title') }}</v-btn>
        </router-link>
        <read-form class="ma-2" v-if="isAuthenticated" v-bind:id-forum="this.$route.params.idForum"></read-form>
      </div>

      <topic-list v-bind:topics="topics"></topic-list>

      <v-pagination
          :density="this.$vuetify.display.mobile ? 'compact' : 'default'"
          v-model="page"
          :length="length"
          total-visible=6
          @update:modelValue="updateResource()" />


      <div class="d-flex justify-center flex-wrap">
        <router-link v-if="isAuthenticated === true" :to="{ name: 'TopicNew'}" class="link-as-button">
          <v-btn class="ma-2">{{ $t('forum.newTopic.title') }}</v-btn>
        </router-link>
        <read-form class="ma-2" v-if="isAuthenticated" v-bind:id-forum="this.$route.params.idForum"></read-form>
      </div>
    </div>
  </div>
</template>

<script>
import TopicList from '@/components/forum/topic/List.vue';
import SubForums from '@/components/forum/forum/SubForums.vue';
import ReadForm from "@/components/forum/forum/ReadForm";
import Security from "@/mixins/Security.vue";
import {useAppStore} from "@/store/app";

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
      let url = '/api/forum_topics?forum=' + this.$route.params.idForum + '&boolArchive=false&itemsPerPage=' +
          '&groups[]=topic:read&groups[]=topic:type&groups[]=topic-type:read' +
          '&groups[]=topic:forum&groups[]=forum:read' +
          '&groups[]=topic:last-message&groups[]=message:read' +
          '&groups[]=topic:user&groups[]=message:user&groups[]=user:read' +
          '&itemsPerPage=' + this.itemsPerPage + '&page=' + this.page
      if (this.isAuthenticated) {
        url += '&groups[]=topic:topic-user-1&groups[]=topic-user:read';
      }
      return url;
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
  watch: {
    getForum () {
      this.updateResource()
    }
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
