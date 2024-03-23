<template>
  <div>
    <h1>{{ $t('authentication.reset.title') }}</h1>
    <div v-if="hasToken">
      <reset-confirm />
    </div>
    <div v-else>
      <reset-send-email />
    </div>
  </div>
</template>


<script>
import Security from "@/mixins/Security.vue"
import Rules from "@/mixins/Rules.vue";
import ResetConfirm from "@/components/authentication/reset/ResetConfirm.vue";
import ResetSendEmail from "@/components/authentication/reset/ResetSendEmail.vue";

export default {
  mixins: [Security, Rules],
  components: {
    ResetSendEmail,
    ResetConfirm
  },
  created() {
    document.title = this.$t('authentication.reset.title') + ' - ' + import.meta.env.VITE_APP_TITLE;
    if (this.isAuthenticated) {
      this.$router.push({path: '/'});
    }
  },
  computed: {
    hasToken() {
      return !!this.$route.query.token;
    }
  },
}
</script>