<template>
  <div>
    <breadcrumb />

    <h1>{{ $t('forum.notify.title') }}</h1>


    <div>
      <v-pagination
          :density="this.$vuetify.display.mobile ? 'compact' : 'default'"
          v-model="page"
          :length="length"
          total-visible=6
          @update:modelValue="updateResource()" />

      <topic-list v-bind:topics="topics"></topic-list>

      <v-pagination
          :density="this.$vuetify.display.mobile ? 'compact' : 'default'"
          v-model="page"
          :length="length"
          total-visible=6
          @update:modelValue="updateResource()" />
    </div>

  </div>
</template>

<script>
import TopicList from '@/components/forum/topic/List.vue';
import Security from "@/mixins/Security.vue";
import Breadcrumb from "@/components/base/Breadcrumb.vue";
import {useBreadcrumbsStore} from "@/store/base/breadcrumbs";

export default {
  mixins: [Security],
  name: 'ForumNotif',
  components: {
    Breadcrumb,
    TopicList
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
    title() {
      return this.$t('forum.notify.title') + ' - ' + import.meta.env.VITE_APP_TITLE;
    },
    getResourceUrl() {
      return '/api/forum_topics?topicUser.user=' + this.getAuthenticatedUser.id +
          '&groups[]=forum.topic.read&groups[]=forum.topic.lastMessage&groups[]=forum.message.last' +
          '&groups[]=forum.forum.read&groups[]=forum.topicUser.read&groups[]=forum.topic.topicUser1' +
          '&topicUser.boolNotif=1&itemsPerPage=' + this.itemsPerPage + '&page=' + this.page;
    }
  },
  created() {
    this.updateResource();
    useBreadcrumbsStore().setLevel(2);
    useBreadcrumbsStore().setItem1(
        { text: 'Forum', to: {name: 'ForumHome'}}
    );
    useBreadcrumbsStore().setItem2(
        { text: this.$t('forum.notify.title'), to: {name: 'ForumNotify'}}
    );
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
