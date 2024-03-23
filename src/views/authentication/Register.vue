<template>
  <div>
    <h1>{{ $t('authentication.register.title') }}</h1>
    <register-confirm v-if="hasToken"></register-confirm>
    <register-form v-else></register-form>
  </div>
</template>


<script>
import RegisterConfirm from '@/components/authentication/register/RegisterConfirm.vue'
import RegisterForm from '@/components/authentication/register/RegisterForm.vue'
import Security from "@/mixins/Security.vue";

export default {
  mixins: [Security],
  name: 'RegisterIndex',
  components: {
    'register-confirm': RegisterConfirm,
    'register-form': RegisterForm
  },
  data() {
    return {}
  },
  created() {
    document.title = this.$t('authentication.register.title') + ' - ' + import.meta.env.VITE_APP_TITLE;
    let redirect = this.$route.query.redirect;
    if (this.isAuthenticated) {
      if (typeof redirect !== 'undefined') {
        this.$router.push({path: redirect});
      } else {
        this.$router.push({path: '/'});
      }
    }
  },
  computed: {
    hasToken() {
      return !!this.$route.query.token;
    }
  },
}
</script>
