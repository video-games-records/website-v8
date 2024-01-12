<template>
  <div>
    <h2 class="h3">{{ title }}</h2>
    <div class="d-flex flex-wrap">
      <div v-for="item in badges" :data-position="item.position" :key="item['@id']" class="ma-1">
        <badge v-bind:badge="item.badge" class="d-inline"></badge>
      </div>
    </div>
  </div>
</template>

<script>
import Badge from '@/components/vgr/badge/Badge.vue';

export default {
  name: 'PlayerBadgeDefault',
  props: {
    'title': {
      require: true,
      type: String
    },
    'badges': {
      require: true,
      type: Array
    },
  },
  components: {
    'badge': Badge,
  },
  data() {
    return {};
  },
};
</script>
