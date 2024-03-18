<template>
  <div class="ma-3">
    <h3 class="ma-2">{{ $t('badge.type.master') }}</h3>
   <account-master-badges type="player" :id="this.getAuthenticatedPlayer.id" />
  </div>
</template>

<script>

import Security from "@/mixins/Security.vue";
import AccountMasterBadges from "@/components/vgr/account/MasterBadges.vue";

export default {
  mixins: [Security],
  name: 'AccountBadges',
  components: {
    AccountMasterBadges,
  },
  data() {
    return {}
  },
};
</script>
