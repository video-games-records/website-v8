<template>
  <div class="container-iframe">
    <iframe class="responsive-iframe" :src="getUrl" title="Video" allowFullScreen></iframe>
  </div>
</template>

<script>

export default {
  name: 'Video',
  props: {
    video: {
      type: Object,
      required: true
    },
    width: {
      type: String,
      required: false,
      default() {
        return '720'
      }
    },
    height: {
      type: String,
      required: false,
      default() {
        return '405'
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    getUrl() {
      if (this.video.type.value === 'Youtube' ) {
        return 'https://www.youtube.com/embed/' + this.video.externalId + '?rel=0'
      } else if (this.video.type.value === 'Twitch') {
        return 'https://player.twitch.tv/?video=' + this.video.externalId + '&parent=' + import.meta.env.VITE_DOMAIN
      }
    },
  },
};
</script>
