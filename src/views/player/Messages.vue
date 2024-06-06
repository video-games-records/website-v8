<template>
  <div>
    <message v-for="message in messages" :data-position="message.position" :key="message.id" v-bind:message=message
             v-bind:readonly="true"
             v-bind:display-author="true"
    >
    </message>
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

export default {
  name: 'PlayerMessages',
  components: {
    Message,
  },
  data() {
    return {
      page: 1,
      length: 1,
      itemsPerPage: 20,
      messages: []
    };
  },
  computed: {
    getResourceUrl() {
      return '/api/forum_messages?topic=' + this.$route.params.idTopic + '&itemsPerPage=' + this.itemsPerPage
        + '&groups[]=forum.user.read&groups[]=forum.user.status&groups[]=user.status.read&topic.forum.status=public'
        + '&groups[]=forum.message.read&groups[]=forum.message.topic&groups[]=forum.topic.read&groups[]=forum.topic.forum&groups[]=forum.forum.read'
        + '&page=' + this.page + '&order[createdAt]=DESC' + '&user=' + this.$route.params.idPlayer;
    }
  },
  created() {
    this.updateResource();
  },
  methods: {
    updateResource() {
      this.axios.get(this.getResourceUrl)
          .then(response => {
            this.messages = response.data['hydra:member'];
            this.length = Math.trunc((response.data['hydra:totalItems'] - 1) / this.itemsPerPage ) + 1;
          })
    },
  },
};
</script>
