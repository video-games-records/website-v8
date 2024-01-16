<template>
  <div>
    <h1>{{ $t('proof.myProofs.title') }}</h1>
    <router-view></router-view>
  </div>
</template>

<script>


import Security from "@/mixins/Security.vue";

export default {
  mixins: [Security],
  name: 'ProofMain',
  components: {},
  data() {
    return {};
  },
  created() {
    document.title = this.$t('proof.myProofs.title') + ' - ' + import.meta.env.VITE_APP_TITLE;
  },
};
</script>
