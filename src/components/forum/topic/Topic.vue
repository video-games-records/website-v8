<template>
    <span v-if="topic.forum.id">
        <router-link
            :to="{ name: this.route, params: { idForum: topic.forum.id, slugForum: topic.forum.slug, idTopic: topic.id, slugTopic: topic.slug }}">{{
            topic.libTopic
          }}</router-link>
    </span>
  <span v-else-if="topic.id">
        <router-link :to="{ name: this.route, params: { idTopic: topic.id, slugTopic: topic.slug }}">{{
            topic.libTopic
          }}</router-link>
    </span>
</template>

<script>
export default {
  name: 'Topic',
  props: {
    'topic': {
      type: Object,
      require: true,
    },
    'route': {
      type: String,
      require: false,
      default: 'TopicIndex',
    }
  },
};
</script>

