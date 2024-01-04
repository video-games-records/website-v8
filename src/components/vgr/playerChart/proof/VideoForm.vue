<template>
  <div>
    <div v-if="showForm" class="container">
      <form class="vgr-form" @submit="submit" @submit.prevent>
        <div>
          <label for="video-url">
            URL
            <span class="label-help">Exemple : https://youtu.be/iNSuKo8C5uk</span>
          </label>
          <input type="text" id="video-url" v-model="url" required="required">
        </div>
        <div>
          <input type="submit" :value="$t('tag.submit')"/>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import App from "@/mixins/App.vue";
import {useFlashMessageStore} from "@/store/base/flashMessage";

export default {
  mixins:[App],
  name: 'PlayerChartVideoForm',
  components: {},
  props: {
    'playerChart': {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      url: '',
      isLoading: false,
      showForm: true,
    };
  },
  methods: {
    submit() {
      this.loading = true;
      this.success = null;

      const requestData = {
        method: 'post',
        url: "api/player-charts/" + this.playerChart.id +"/send-video",
        data: {
          url : this.url
        }
      }

      this.axios(requestData)
          .then(response => {
            this.loading = false;
            this.showForm = false;
            this.hasSuccess = true;
            this.updatePlayerChart()
          })
          .catch(error => {
            this.loading = false;
            this.hasError = true;
            useFlashMessageStore().confirm(this.$t('proof.form.success'));
          });
    },
  },
};
</script>
