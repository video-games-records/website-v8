<script>
import {useSecurityStore} from "@/store/security";
export default {
  computed: {
    isAuthenticated() {
      return useSecurityStore().isAuthenticated;
    },
    getUser() {
      return useSecurityStore().getUser;
    },
    getPlayer() {
      return useSecurityStore().getPlayer;
    },
    /*hasRolePlayer() {
     return this.$store.getters['security/hasRole']('ROLE_PLAYER')
    }*/
  },
}
</script>