<template>
  <search-box />
  <lost-position-box v-if="this.isAuthenticated" class="ma-3" />
  <language-switcher />
  <account v-if="this.isAuthenticated" />
  <login v-if="!this.isAuthenticated" />
</template>

<script>
import Login from "@/components/security/btn/Login.vue";
import Account from "@/components/security/btn/Account.vue";
import Security from "@/mixins/Security.vue";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import LostPositionBox from "@/components/vgr/lost-position/Box.vue";
import SearchBox from "@/components/SearchBox.vue";

export default {
  components: {SearchBox, LostPositionBox, LanguageSwitcher, Login, Account},
  mixins: [Security],
}
</script>
