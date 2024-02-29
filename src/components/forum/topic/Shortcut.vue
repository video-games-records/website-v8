<template>
    <span v-if="this.getNbPage > 1 && topic.forum.id">
        [<router-link
        :to="{ name: this.route, params: { idForum: topic.forum.id, slugForum: topic.forum.slug, idTopic: topic.id, slugTopic: topic.slug }, query: {page :getNbPage}}">{{
        number(getNbPage)
      }}</router-link>]
    </span>
  <span v-else-if="this.getNbPage > 1 && topic.id">
        [<router-link
      :to="{ name: this.route, params: { idTopic: topic.id, slugTopic: topic.slug }, query: {page :getNbPage}}">{{
      number(getNbPage)
    }}</router-link>]
    </span>
</template>

<script>
import Filters from "@/mixins/Filters.vue";

export default {
  mixins: [Filters],
  name: 'Shortcut',
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
  data() {
    return {
      itemsPerPage: 20,
    };
  },
  computed: {
    getNbPage() {
      return Math.floor((this.topic.nbMessage - 1) / this.itemsPerPage) + 1;
    },
  },
};
</script>


