<template>
  <v-sheet>
    <v-progress-linear v-if="forums.length === 0" indeterminate color="yellow-darken-2"></v-progress-linear>
    <v-table>
      <caption class="screen-reader-text">{{ $t('forum.forum.list.caption') }}</caption>
      <thead>
      <tr>
        <th scope="col">{{ $t('forum.tag.libForum') }}</th>
        <th scope="col">{{ $t('forum.tag.nbTopic') }}</th>
        <th scope="col">{{ $t('forum.tag.nbMessage') }}</th>
        <th scope="col" class="hidden-sm-and-down">{{ $t('forum.tag.lastMessage') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="forum in forums" :data-position="forum.position" :key="forum.id">
        <td>
          <read v-if="isAuthenticated" v-bind:boolRead="forum.forumUser1.boolRead"></read>
          <forum v-bind:forum="forum"></forum>
        </td>
        <td>{{ number(forum.nbTopic) }}</td>
        <td>{{ number(forum.nbMessage) }}</td>
        <td class="hidden-sm-and-down">
          <last-message v-bind:message=forum.lastMessage></last-message>
        </td>
      </tr>
      </tbody>
    </v-table>
  </v-sheet>
</template>

<script>
import LastMessage from '@/components/forum/message/Last.vue';
import Forum from '@/components/forum/forum/Forum.vue';
import Read from "@/components/forum/Read";
import Security from "@/mixins/Security.vue";
import Filters from "@/mixins/Filters.vue";

export default {
  mixins: [Security, Filters],
  name: 'ForumList',
  components: {
    'lastMessage': LastMessage,
    'forum': Forum,
    'read': Read
  },
  props: {
    'forums': {
      type: Array,
      require: true,
    },
  },
};
</script>


