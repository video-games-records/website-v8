<template>
  <sprite></sprite>
  <router-view />
</template>


<script>
import Sprite from './components/Sprite';
export default {
  name: 'app',
  components: {
    Sprite,
  },
  mounted() {
    //setTimeout(() => this.scrollFix(this.$route.hash), 1);
  },
  computed: {

  },
  methods: {
    scrollFix: function(hashbang) {
      window.location.hash = hashbang;
    },
  },
};
</script>

<style src="./assets/sass/styles.scss" lang="scss"></style>
