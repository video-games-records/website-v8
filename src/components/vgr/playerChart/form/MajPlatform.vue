<template>
  <div>
    <v-form v-model="isValid" validate-on="blur" @submit.prevent @submit="submit()" class="d-flex">
      <v-select
          :label="$t('platform.maj')"
          v-model="platform"
          :items="game.platforms"
          item-title="libPlatform"
          return-object
          :rules="[rules.required]"
          density="compact"
      >
      </v-select>
      <v-btn v-on:click="submit" density="default">{{ $t('tag.submit') }}</v-btn>
    </v-form>
  </div>
</template>

<script>
import {useFlashMessageStore} from "@/store/base/flashMessage";
import Rules from "@/mixins/Rules.vue";

export default {
  mixins: [Rules],
  name: 'MajPlatform',
  props: {
    'game': {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      isValid: false,
      platform: null
    };
  },
  methods: {
    submit: function () {
      if (!this.isValid) return;
      this.axios.request({
        method: 'post',
        url: "api/player-charts/maj-platform",
        data: {
          idGame : this.game.id,
          idPlatform : this.platform.id
        }
      }).then(() => {
        useFlashMessageStore().confirm('OK');
      });
    }
  },
};
</script>
