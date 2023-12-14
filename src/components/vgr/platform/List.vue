<template>
  <span v-if="multi  && platforms.length > 1"><span class="platform-list__item">{{ $t('platform.multi') }}</span></span>
  <ul v-else class="platform-list">
    <li v-for="platform in platforms" :data-position="platform.position" :key="platform.id">
      <platform v-bind:platform="platform"></platform>
    </li>
  </ul>
</template>

<script>
import Platform from '@/components/vgr/platform/Platform.vue'
export default {
  name: 'PlatformList',
  props: {
    'platforms': {
      type: Array,
      require: true,
    },
    'multi': {
      default: false,
      type: Boolean,
      require: false,
    },
  },
  components: {
    'platform' : Platform
  },
};
</script>


