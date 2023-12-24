<template>
  <language-switcher />
  <account v-if="this.isAuthenticated" />
  <login v-if="!this.isAuthenticated" />
  <logout v-if="this.isAuthenticated" />
</template>

<script>
import Login from "@/components/security/btn/Login.vue";
import Logout from "@/components/security/btn/Logout.vue";
import Account from "@/components/security/btn/Account.vue";
import Security from "@/mixins/Security.vue";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";

export default {
  components: {LanguageSwitcher, Login, Logout, Account},
  mixins: [Security],
}
</script>
