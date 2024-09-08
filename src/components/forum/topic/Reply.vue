<template>
  <div>
    <h2>{{ $t('forum.topic.postReply') }}</h2>

    <v-form @submit="submit" @submit.prevent>
      <div>
        <label>{{ $t('forum.tag.message') }}</label>
      </div>

      <ckeditor :editor="editor" v-model="message.message" :config="getCkeditorToolBar" minlength="4" required></ckeditor>

      <div class="ma-2">
        <v-btn type="submit">{{ $t('tag.submit') }}</v-btn>
      </div>
    </v-form>

    <h2>{{ $t('forum.topic.review') }}</h2>

    <message v-for="message in messages" :key="message.id"
             v-bind:message=message></message>
  </div>
</template>

<script>
import Message from '@/components/forum/message/Message.vue';
import Ckeditor from "@/mixins/Ckeditor.vue";

export default {
  mixins: [Ckeditor],
  name: 'TopicReply',
  components: {
    'message': Message,
  },
  props: {
    'topic': {
      type: Object,
      require: true,
    },
    'route': {
      type: String,
      require: false,
      default: '',
    }
  },
  data() {
    return {
      messages: [],
      itemsPerPage: 20,
      message: {
        topic: null,
        message: "",
      },
    };
  },
  computed: {
    getRouteTopicIndex() {
      return this.route + 'TopicIndex';
    },
  },
  created() {
    this.axios.get('/api/forum_messages?topic=' + this.topic.id + '&order[id]=DESC')
        .then(response => {
          this.messages = response.data['hydra:member'];
        })
  },
  methods: {
    submit: function () {
      this.message.topic = this.topic['@id'];
      this.axios.post('/api/forum_messages', this.message)
          .then(response => {
              this.$router.push({
                name: this.getRouteTopicIndex,
                params: {idTopic: this.topic.id, slugTopic: this.topic.slug},
                query: {page: Math.trunc((this.topic.nbMessage) / this.itemsPerPage ) + 1},
                hash: '#' + response.data.id
              });
          });
    },
  },
};
</script>

