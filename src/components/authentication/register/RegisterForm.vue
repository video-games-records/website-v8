<template>
  <div>
    <span v-html="message.text"></span>

    <v-form v-model="isValid" @submit="submit" @submit.prevent>
      <v-text-field  v-model="email" type="email"
                     :label="$t('authentication.register.form.email')" :rules="[rules.required]" />

      <v-text-field type="text" v-model="username"
                    :label="$t('authentication.register.form.username')" :rules="[rules.required]" />

      <v-text-field type="password" v-model="password"
                    :label="$t('authentication.register.form.password')" :rules="[rules.required]" />

      <v-btn type="submit">{{ $t('authentication.register.form.submit') }}</v-btn>
    </v-form>
  </div>
</template>


<script>
import Rules from "@/mixins/Rules.vue";
import AuthService from "@/services/auth.service";
import {useFlashMessageStore} from "@/store/base/flashMessage";

export default {
  name: 'RegisterForm',
  mixins: [Rules],
  data() {
    return {
      isValid: null,
      email: '',
      username: '',
      password: '',
      rules_accepted: false,
      message: {},
    }
  },
  created() {
    this.axios.get('api/pages' + '?slug=register-message').then(response => {
      this.message = response.data['hydra:member'][0];
    })
  },
  methods: {
    submit() {
      if (!this.isValid) return;
      AuthService.register(this.email, this.username, this.password, this.rules_accepted)
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
