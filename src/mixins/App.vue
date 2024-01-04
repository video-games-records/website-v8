<script>
import {useAppStore} from "@/store/app";
export default {
  methods: {
    updatePlayerChart() {
      this.axios.get('/api/player_charts/' + useAppStore().getPlayerChart)
          .then(response => {
            useAppStore().setPlayerChart(response.data);
          })
    },
  },
}
</script>