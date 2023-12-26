<template>
  <span v-if="multi  && platforms.length > 1"><span class="platform-list__item">{{ $t('platform.multi') }}</span></span>
  <ul v-else class="platform-list">
    <li v-for="platform in platforms" :data-position="platform.position" :key="platform.id">
      <platform v-bind:platform="platform" v-bind:route="this.route"></platform>
    </li>
  </ul>
</template>

<script>
import Platform from '@/components/vgr/platform/Platform.vue'
export default {
  name: 'PlatformList',
  props: {
    platforms: {
      type: Array,
      require: true,
    },
    route: {
      type: String,
      default: 'PlatformIndex',
    },
    multi: {
      default: false,
      type: Boolean,
      require: false,
    },
  },
  components: {Platform}
};
</script>

<style scoped>
.platform-list__item {
  padding: 0.1em 0.5em;
  background-color: #21252c;
  color: #fff;
  -webkit-box-shadow: 0 0 0 0 #000, 1px 1px 0 0 #000, 2px 2px 0 0 #000, 3px 3px 0 0 #000;
  box-shadow: 0 0 0 0 #000, 1px 1px 0 0 #000, 2px 2px 0 0 #000, 3px 3px 0 0 #000;
}
</style>


