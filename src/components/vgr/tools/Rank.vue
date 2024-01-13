<template>
    <span v-if="rank === 1 && nbEqual === 1 && nbItem > 1" class="platinum">
        <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
            <use xlink:href="#cup"/>
        </svg>
        <span class="d-sr-only">{{ rank }}</span>
    </span>

  <span v-else-if="rank === 1" class="gold">
        <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
            <use xlink:href="#cup"/>
        </svg>
        <span class="d-sr-only">{{ rank }}</span>
    </span>

  <span v-else-if="rank === 2" class="silver">
        <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
            <use xlink:href="#cup"/>
        </svg>
        <span class="d-sr-only">{{ rank }}</span>
    </span>

  <span v-else-if="rank === 3" class="bronze">
        <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
            <use xlink:href="#cup"/>
        </svg>
        <span class="d-sr-only">{{ rank }}</span>
    </span>

  <span v-else>{{ rank }}</span>
</template>
<script>

export default {
  name: 'ToolsRank',
  props: {
    'rank': {
      type: Number,
      require: true,
    },
    'nbEqual': {
      type: Number,
      require: true,
    },
    'nbItem': {
      type: Number,
      require: true,
    }
  },
  data() {
    return {};
  },
};
</script>
