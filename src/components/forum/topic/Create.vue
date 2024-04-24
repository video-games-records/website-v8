<template>
  <div>
    <v-form id="app" @submit="submit" @submit.prevent>
      <v-row>
        <v-col cols="12">
          <v-text-field :label="$t('forum.tag.libTopic')" v-model="topic.libTopic" />
        </v-col>
        <v-col cols="12">
          <ckeditor :editor="editor" v-model="topic.messages[0].message" :config="getCkeditorToolBar" minlength="4" required></ckeditor>
        </v-col>
        <v-col cols="12">
          <v-btn type="submit">{{ $t('tag.submit') }}</v-btn>
        </v-col>
      </v-row>
    </v-form>

  </div>
</template>

<script>
import Ckeditor from "@/mixins/Ckeditor.vue";

export default {
  mixins: [Ckeditor],
  name: 'TopicCreate',
  props: {
    'forum': {
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
      topic: {
        libTopic: '',
        forum: null,
        type: '/api/forum_topic_types/3',
        user: null,
        messages: [
          {
            message: ''
          }
        ],
      },
    };
  },
  computed: {
    getRouteTopicIndex() {
      return this.route + 'TopicIndex';
    },
  },
  methods: {
    submit: function () {
      if (this.topic.messages[0].message === '') {
        this.dialog = true;
      } else {
        this.topic.forum = this.forum['@id'];
        this.axios.post('/api/forum_topics', this.topic)
            .then(response => {
                this.$router.push({
                  name: this.getRouteTopicIndex,
                  params: {idTopic: response.data.id, slugTopic: response.data.slug}
                });
            });
      }
    },
  },
};
</script>

