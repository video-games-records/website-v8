<template>
  <div>
    <h1>{{ getTopic.libTopic }}</h1>

    <div class="d-flex justify-center">
      <router-link v-if="isAuthenticated === true && getTopic.type && getTopic.type.libType !== 'ANNONCE'"
                   :to="{ name: 'TopicReply', params: { id: getTopic.id }}" class="link-as-button">
        <v-btn>{{ $t('forum.reply.title') }}</v-btn>
      </router-link>
    </div>

    <v-pagination
        :density="this.$vuetify.display.mobile ? 'compact' : 'default'"
        v-model="page"
        :length="length"
        total-visible=6
        @update:modelValue="updateResource()" />

    <message v-for="message in messages" :key="message.id" v-bind:message=message
             v-bind:readonly="false"></message>

    <div class="d-flex justify-center">
      <router-link v-if="isAuthenticated === true && getTopic.type && getTopic.type.libType !== 'ANNONCE'"
                   :to="{ name: 'TopicReply', params: { id: getTopic.id }}" class="link-as-button">
        <v-btn>{{ $t('forum.reply.title') }}</v-btn>
      </router-link>
    </div>

    <v-pagination
        :density="this.$vuetify.display.mobile ? 'compact' : 'default'"
        v-model="page"
        :length="length"
        total-visible=6
        @update:modelValue="updateResource()" />

  </div>
</template>

<script>
import Message from '@/components/forum/message/Message.vue';
import Security from "@/mixins/Security.vue";
import { useAppStore} from "@/store/app";

export default {
  mixins: [Security],
  name: 'TopicIndex',
  components: {
    Message,
  },
  computed: {
    title() {
      return this.getTopic.libTopic + ' - ' + this.getForum.libForum + ' - ' + import.meta.env.VITE_APP_TITLE;
    },
    getForum() {
      return useAppStore().getForum;
    },
    getTopic() {
      return useAppStore().getTopic
    },
    getResourceUrl() {
      let url = '/api/forum_messages?topic=' + this.$route.params.idTopic + '&itemsPerPage=' + this.itemsPerPage;
      url = url + '&page=' + this.page;
      return url;
    }
  },
  data() {
    return {
      page: 1,
      length: 1,
      itemsPerPage: 20,
      messages: []
    };
  },
  created() {
    if (this.$route.query.page !== undefined) {
      this.page = parseInt(this.$route.query.page);
    }
    this.updateResource();
  },
  methods: {
    updateResource() {
      this.axios.get(this.getResourceUrl)
          .then(response => {
            this.messages = response.data['hydra:member'];
            this.length = Math.trunc(response.data['hydra:totalItems'] / this.itemsPerPage - 1) + 1;
          })
    },
  },
};
</script>
