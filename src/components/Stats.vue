<template>
  <div>
    <div>
      {{ $t('global.stats', format(this.data)) }}
    </div>
  </div>
</template>

<script>
import Filters from "@/mixins/Filters.vue";

export default {
  mixins: [Filters],
  name: 'Stats',
  data() {
    return {
      data: [0,0,0,0]
    };
  },
  created() {
     this.load();
  },
  methods: {
    load() {
      this.axios.get('api/players/stats')
        .then(response => {
          this.data = response.data['hydra:member'];
        })
    },
    format() {
      let stats = [];
      stats[0] = this.number(this.data[0]);
      stats[1] = this.number(this.data[1]);
      stats[2] = this.number(this.data[2]);
      stats[3] = this.number(this.data[3]);
      return stats;
    },
  },
};
</script>
