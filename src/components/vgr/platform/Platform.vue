<template>
  <span v-if="platform">
    <router-link @click.native="scrollToTop" :class="'platform-list__item platform-list__item--' + platform.id"
                 :to="{name: this.route, params: { id: platform.id, slugPlatform: platform.slug  }}">
      {{ platform.libPlatform }}
    </router-link>
  </span>
</template>

<script>
export default {
  name: 'Platform',
  props: {
    platform: {
      type: Object,
      require: true,
    },
    route: {
      type: String,
      default: 'PlatformIndex',
    },
    displayLink: {
      default: false,
      type: Boolean,
    },
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    }
  }
};
</script>


