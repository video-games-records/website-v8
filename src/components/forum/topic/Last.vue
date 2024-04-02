<template>
  <v-card variant="outlined">
    <v-card-title class="bg-primary">{{ $t('forum.tag.lastestMessages') }}</v-card-title>
    <v-progress-linear v-if="topics.length === 0" indeterminate color="yellow-darken-2"></v-progress-linear>
    <v-table density="compact">
      <thead>
      <tr>
        <th scope="col">Date</th>
        <th class="right" scope="col">{{ $t('global.title') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="topic in topics" :key="topic.id">
        <td class="pr-3">
          <date v-bind:date="topic.lastMessage.createdAt" v-bind:options="{ month: 'long', day: 'numeric' }"></date>
        </td>
        <td class="pr-3">
          <topic v-bind:topic="topic" route="TopicIndex"></topic>
        </td>
      </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script>
import Date from '@/components/tools/Date.vue';
import Topic from "@/components/forum/topic/Topic.vue";

export default {
  name: 'TopicLast',
  components: {
    Topic,
    'date': Date,
  },
  data() {
    return {
      topics: [],
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.axios.get('/api/forum_topics?forum.status=public&order[lastMessage.id]=DESC&itemsPerPage=6', {useCache: true})
          .then(response => {
            this.topics = response.data['hydra:member']
          })
    }
  },
};
</script>


