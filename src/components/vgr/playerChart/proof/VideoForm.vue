<template>
  <div>
    <div v-if="showForm">
      <v-form v-model="isValid" validate-on="blur" @submit.prevent @submit="submit()">
        <v-sheet class="d-flex">
          <v-text-field
              density="compact"
              label="URL"
              placeholder="https://youtu.be/iNSuKo8C5uk"
              v-model="url"
              required="required"
              :rules="[rules.required]" />
          <v-btn type="submit">{{ $t('tag.submit')}}</v-btn>
        </v-sheet>
      </v-form>
    </div>
  </div>
</template>

<script>

import App from "@/mixins/App.vue";
import {useFlashMessageStore} from "@/store/base/flashMessage";
import Rules from "@/mixins/Rules.vue";

export default {
  mixins:[App, Rules],
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
      isValid: null,
      url: '',
      showForm: true,
    };
  },
  methods: {
    submit() {
      const requestData = {
        method: 'post',
        url: "api/player-charts/" + this.playerChart.id +"/send-video",
        data: {
          url : this.url
        }
      }

      this.axios(requestData)
          .then(response => {
            this.showForm = false;
            this.hasSuccess = true;
            this.updatePlayerChart();
            useFlashMessageStore().confirm(this.$t('proof.form.success'));
          })
          .catch(error => {
            useFlashMessageStore().error('ERROR');
          });
    },
  },
};
</script>
