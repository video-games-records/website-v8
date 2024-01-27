<template>
   <span class="gold" :title="$t('global.gold')">
      <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
          <use xlink:href="#medal" />
      </svg>
      <span class="screen-reader-text">{{ $t('global.gold') }}</span>
  </span>
</template>

<script>
export default {
  name: 'ToolsMedalGold',
  data() {
    return {};
  },
};
</script>
