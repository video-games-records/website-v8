<template>
  <span class="platinum" :title="$t('global.platinum')">
    <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true"
       focusable="false">
      <use xlink:href="#cup"/>
    </svg>
    <span class="d-sr-only">{{ $t('global.platinum') }}</span>
  </span>
</template>

<script>
export default {
  name: 'ToolsCupPlatinum',
  data() {
    return {};
  },
};
</script>
