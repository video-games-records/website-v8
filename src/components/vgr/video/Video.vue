<template>
  <div class="container">
    <iframe class="responsive-iframe" :src="getUrl" title="YouTube video" allowFullScreen></iframe>
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
      return 'https://www.youtube.com/embed/' + this.video.videoId + '?rel=0'
    },
  },
};
</script>
