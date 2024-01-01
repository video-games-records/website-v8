<template>
  <div class="video-wrapper">
    <!--<youtube ref="player-youtube" v-if="video.id && video.type.value === 'Youtube'" @play="play"
             :video-id="video.videoId" :player-width="width" :player-height="height"
             :player-vars="{autoplay: 0}"></youtube>-->
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
  methods: {
    play() {
    }
  },
};
</script>
