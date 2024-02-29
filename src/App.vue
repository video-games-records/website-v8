<template>
  <sprite></sprite>
  <router-view />
</template>


<script>
import Sprite from './components/Sprite';
import {useMessageStore} from "@/store/message";
import Security from "@/mixins/Security.vue";
export default {
  mixins: [Security],
  name: 'app',
  components: {
    Sprite,
  },
  mounted() {
    //setTimeout(() => this.scrollFix(this.$route.hash), 1);
  },
  created() {
    if (this.isAuthenticated) {
      this.updateNbMessage();
      // Every 5 mins
      setInterval(() => this.updateNbMessage(), 300000);
    }
  },
  computed: {

  },
  methods: {
    scrollFix: function(hashbang) {
      window.location.hash = hashbang;
    },
    updateNbMessage: function () {
      this.axios.get('/api/messages/get-nb-new-message').then(response => {
        useMessageStore().setNbMessage(response.data);
      })
    },
  },
};
</script>

<style src="./assets/sass/styles.scss" lang="scss"></style>
