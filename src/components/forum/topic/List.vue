<template>
  <v-sheet>
    <v-progress-linear v-if="topics.length === 0" indeterminate color="yellow-darken-2"></v-progress-linear>
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

          <span v-if="topic.type.libType === 'POST IT'" class="topic-type" :title="$t('topic.postit')">
                            <svg width="16" height="16" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true"
                                 focusable="false">
                                <use xlink:href="#message-post-it"/>
                            </svg>
                            <span class="screen-reader-text">{{ $t('forum.tag.postit') }}</span>
                        </span>

          <read v-if="isAuthenticated" v-bind:boolRead="topic.topicUser1.boolRead"></read>

          <topic v-bind:topic="topic" v-bind:route="getRouteTopicIndex"></topic>
          <shortcut v-bind:topic="topic" v-bind:route="getRouteTopicIndex"></shortcut>
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
import LastMessage from '@/components/forum/message/Last.vue';
import Shortcut from '@/components/forum/topic/Shortcut.vue';
import Topic from '@/components/forum/topic/Topic.vue';
import Read from "@/components/forum/Read";
import Notify from "@/components/forum/topic-user/Notify";
import User from '@/components/user/User';
import Security from "@/mixins/Security.vue";
import Filters from "@/mixins/Filters.vue";

export default {
  mixins: [Security, Filters],
  name: 'TopicList',
  components: {Topic, LastMessage, Shortcut, Read, Notify, User},
  props: {
    'topics': {
      type: Array,
      require: true,
    },
    'route': {
      type: String,
      require: false,
      default: '',
    }
  },
  computed: {
    getRouteTopicIndex() {
      return this.route + 'TopicIndex';
    },
  },
};
</script>


