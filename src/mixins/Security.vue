<script>
import {useSecurityStore} from "@/store/security";
export default {
  computed: {
    isAuthenticated() {
      return useSecurityStore().isAuthenticated;
    },
    getAuthenticatedUser() {
      return useSecurityStore().getUser;
    },
    getAuthenticatedPlayer() {
      return useSecurityStore().getPlayer;
    },
    hasRolePlayer() {
      if (this.isAuthenticated === false) {
        return false;
      }
      return role => {
        return this.getAuthenticatedUser().roles.indexOf(role) !== -1;
      }
    }
  },
}
</script>