<template>
  <div v-if="tooltip">
    <button>
      <svg width="16" height="16" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
        <use xlink:href="#calendar"/>
      </svg>
      <span class="screen-reader-text">{{ $t('score.lastUpdate') }}</span>
      <v-tooltip
          activator="parent"
          location="start"
      ><time :datetime="getTimestamp">{{ getDate }}</time></v-tooltip>
    </button>
  </div>
  <span v-else>{{ getDate }}</span>
</template>

<script>
export default {
  name: 'LastUpdate',
  props: {
    'playerChart': {
      type: Object,
      require: true,
    },
    'tooltip': {
      type: Boolean,
      require: false,
      default: true,
    }
  },
  data() {
    return {
      options: {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}
    };
  },
  computed: {
    getDate() {
      let date = new Date(this.playerChart.lastUpdate);
      return date.toLocaleDateString(localStorage.lang, this.options);
    },
    getTimestamp() {
      let date = new Date(this.playerChart.lastUpdate);
      return date.toISOString();
    }
  },
};
</script>
