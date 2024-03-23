<template>
  <div>
    <v-form v-model="isValid" @submit="submit" @submit.prevent>
        <v-text-field v-model="password" type="password" :label="$t('authentication.reset.confirm.password')"
                      :rules="[rules.required]"/>

        <v-btn type="submit">{{ $t('authentication.reset.confirm.submit') }}</v-btn>
    </v-form>
  </div>
</template>


<script>
import Security from "@/mixins/Security.vue"
import AuthService from '@/services/auth.service'
import Rules from "@/mixins/Rules.vue";
import {useFlashMessageStore} from "@/store/base/flashMessage";

export default {
  name: 'ResetConfirm',
  mixins: [Security, Rules],
  data() {
    return {
      isValid: null,
      password: '',
      token: '',
    }
  },
  created() {
    this.token = this.$route.query.token;
  },
  methods: {
    submit () {
      if (!this.isValid) return;
      AuthService.resettingReset(this.token, this.password)
        .then((response) => {
          if (response.data.success) {
            useFlashMessageStore().confirm(response.data.message);
          } else {
            useFlashMessageStore().error(response.data.message);
          }
        })
    },
  },
}
</script>