<template>
  <div>
    <v-form v-model="isValid" @submit="submit" @submit.prevent>
      <div>
        <div class="ma-5 d-flex justify-center">
          <span>{{ $t('authentication.reset.form.email_help') }}</span>
        </div>
        <v-text-field v-model="email" required="required" label="Email" :rules="[rules.required]"/>
      </div>

      <div class="ma-2">
        <v-btn type="submit">{{ $t('authentication.reset.form.submit') }} </v-btn>
      </div>
    </v-form>
  </div>
</template>


<script>
import Security from "@/mixins/Security.vue"
import AuthService from '@/services/auth.service'
import Rules from "@/mixins/Rules.vue";
import {useFlashMessageStore} from "@/store/base/flashMessage";

export default {
  name: 'ResetSendEmail',
  mixins: [Security, Rules],
  data() {
    return {
      isValid: null,
      email: '',
    }
  },
  methods: {
    submit() {
      if (!this.isValid) return;
      AuthService.resettingSendEmail(this.email)
        .then(() => {
          useFlashMessageStore().confirm(this.$t('authentication.reset.form.confirm'));
        })
        .catch(() => {
          useFlashMessageStore().confirm(this.$t('authentication.reset.form.confirm'));
        });
    },
  },
}
</script>