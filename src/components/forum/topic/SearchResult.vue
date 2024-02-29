<template>
  <v-sheet>
    <h2>{{ nb }} {{ $t('global.topics_', nb) }}</h2>
    <div v-if="nb > 100" class="d-flex justify-center text-red-darken-3 ma-2">
      {{ $t('search.max') }}
    </div>
    <v-table>
      <caption class="screen-reader-text">{{ $t('forum.topic.list.caption') }}</caption>
      <thead>
      <tr>
        <th scope="col">{{ $t('forum.tag.libTopic') }}</th>
        <th scope="col">{{ $t('forum.tag.author') }}</th>
        <th scope="col">{{ $t('forum.tag.nbMessage') }}</th>
        <th scope="col">{{ $t('forum.tag.lastMessage') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="topic in topics" :data-position="topic.position" :key="topic.id">
        <td>
          <notify v-if="isAuthenticated" v-bind:topicUser="topic.topicUser1"></notify>

          <span v-if="topic.type.libType === 'ANNONCE'" class="topic-type" :title="$t('forum.tag.announcement')">
                            <svg width="16" height="16" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true"
                                 focusable="false">
                                <use xlink:href="#message-announcement"/>
                            </svg>
                            <span class="screen-reader-text">{{ $t('forum.tag.announcement') }}</span>
                        </span>

          <span v-if="topic.type.libType === 'POST IT'" class="topic-type" :title="$t('forum.tag.postit')">
                            <svg width="16" height="16" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true"
                                 focusable="false">
                                <use xlink:href="#message-post-it"/>
                            </svg>
                            <span class="screen-reader-text">{{ $t('forum.tag.postit') }}</span>
                        </span>

          <read v-if="isAuthenticated" v-bind:boolRead="topic.topicUser1.boolRead"></read>

          <topic v-bind:topic="topic" route="TopicIndex"></topic>
          <shortcut v-bind:topic="topic" route="TopicIndex"></shortcut>
        </td>
        <td>
          <user v-bind:user=topic.user></user>
        </td>
        <td>{{ number(topic.nbMessage) }}</td>
        <td>
          <last-message v-bind:message=topic.lastMessage></last-message>
        </td>
      </tr>
      </tbody>
    </v-table>
  </v-sheet>
</template>

<script>
import Shortcut from '@/components/forum/topic/Shortcut.vue';
import Topic from '@/components/forum/topic/Topic.vue';
import Read from "@/components/forum/Read";
import Notify from "@/components/forum/topic-user/Notify";
import User from '@/components/user/User';
import Security from "@/mixins/Security.vue";
import Filters from "@/mixins/Filters.vue";
import LastMessage from "@/components/forum/message/Last.vue";

export default {
  mixins: [Security, Filters],
  name: 'TopicSearchResult',
  components: {LastMessage, Topic, Shortcut, Read, Notify, User},
  props: {
    'callback': {
      require: true,
      type: String,
      default: '/api/forum_topics'
    },
  },
  data() {
    return {
      topics: [],
      nb: 0,
    };
  },
  computed: {
    getCallBack() {
      return this.callback;
    },
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.axios.get(this.getCallBack)
          .then(response => {
            this.topics = response.data['hydra:member'];
            this.nb = response.data['hydra:totalItems'];
          })
    },
  },
};
</script>


