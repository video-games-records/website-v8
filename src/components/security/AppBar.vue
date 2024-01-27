<template>
  <proofs v-if="this.isAuthenticated" />
  <lost-position-box v-if="this.isAuthenticated" class="ma-3" />
  <message-box v-if="this.isAuthenticated" class="ma-3" />
  <account v-if="this.isAuthenticated" />
  <logout v-if="this.isAuthenticated" />
</template>

<script>
import Logout from "@/components/security/btn/Logout.vue";
import Account from "@/components/security/btn/Account.vue";
import Security from "@/mixins/Security.vue";
import MessageBox from "@/components/message/Box.vue";
import LostPositionBox from "@/components/vgr/lost-position/Box.vue";
import Proofs from "@/components/security/btn/Proofs.vue";

export default {
  components: {Proofs, LostPositionBox, MessageBox, Logout, Account},
  mixins: [Security],
}
</script>
