<template>
  <div>
    <div v-if="isGameForum" class="message-info">
      <p v-html="$t('forum.subForum.warning')"></p>
    </div>
    <forum-list v-bind:forums=forums></forum-list>
  </div>
</template>

<script>
import ForumList from '@/components/forum/forum/List.vue';

import Security from "@/mixins/Security.vue";

export default {
  mixins: [Security],
  name: 'SubForumList',
  components: {
    ForumList
  },
  props: {
    'idForum': {
      require: true,
    },
  },
  data() {
    return {
      itemsPerPage: 25,
      nbDay: 90,
      forums: [],
      resource_url: 'api/forum_forums?groups[]=forum.forum.read&groups[]=forum.lastMessage' +
          '&groups[]=forum.message.last&groups[]=forum.forum.forumUser1&groups[]=forum.forumUser.read',
      order: {
        column: 'lastMessage.id',
        direction: 'DESC',
      },
    };
  },
  computed: {
    isGameForum() {
      return this.idForum === 10953;
    },
    getResourceUrl() {
      let url = this.resource_url;
      url = url + '&itemsPerPage=' + this.itemsPerPage;
      let date = new Date();
      date.setDate(date.getDate() - this.nbDay);
      if (this.isGameForum) {
        url = url + '&lastMessage.createdAt[after]=' + date.toISOString();
      }
      url = url + '&order[' + this.order.column + ']=' + this.order.direction;
      // Filter
      url = url + '&parent=' + this.idForum;
      return url;
    }
  },
  methods: {
    updateResource(data) {
      this.forums = data
    },
  }
};
</script>


