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
      data: [5000,1600000,500000,6000]
    };
  },
  created() {
     this.load();
  },
  methods: {
    load() {
      this.axios.get('api/stats/website', { enableCache: true })
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
