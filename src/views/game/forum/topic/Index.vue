<template>
  <div>
    <h1>{{ getTopic.libTopic }}</h1>

    <div class="d-flex justify-center">
      <router-link v-if="isAuthenticated === true && getTopic.type && getTopic.type.libType !== 'ANNONCE'"
                   :to="{ name: 'GameForumTopicReply', params: { id: getTopic.id }}" class="link-as-button">
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
                   :to="{ name: 'GameForumTopicReply', params: { id: getTopic.id }}" class="link-as-button">
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
import {useAppStore} from "@/store/app";

export default {
  mixins: [Security],
  name: 'TopicIndex',
  components: {Message},
  data() {
    return {
      page: 1,
      length: 1,
      itemsPerPage: 20,
      messages: []
    };
  },
  computed: {
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
            this.length = Math.trunc((response.data['hydra:totalItems'] - 1) / this.itemsPerPage ) + 1;
            if (this.$route.hash) {
              let id = this.$route.hash.substring(1,this.$route.hash.length);
              setTimeout(function() {
                document.getElementById(id).scrollIntoView();
              }, 2);
            }
          })
    },
  },
};
</script>
