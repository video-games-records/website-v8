<template>
  <div>
    <v-dialog width="500" transition="dialog-bottom-transition">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" append-icon="mdi-login">
          Login
        </v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="Login">
          <v-form v-model="isValid" validate-on="blur" @submit.prevent @submit="submit()">
            <v-text-field v-model="email" :label="$t('authentication.login.form.email')" :rules="[rules.required]"></v-text-field>
            <v-text-field v-model="password" type="password" :label="$t('authentication.login.form.password')" :rules="[rules.required]"></v-text-field>

            <div v-if="error" class="d-flex justify-center text-red">
              {{ $t('authentication.login.form.error') }}
            </div>

            <v-btn v-if="!this.loading" type="submit" block class="mt-2">{{ $t('authentication.login.form.submit') }}</v-btn>
            <div v-if="this.loading" class="d-flex justify-center">
              <v-progress-circular indeterminate model-value="20"></v-progress-circular>
            </div>
          </v-form>

          <v-divider />

          <div class="ma-2">
            <v-row>
              <v-col cols="12" class="d-flex justify-center"><router-link @click="isActive.value = false" :to="{ name: 'Register'}">{{ $t('authentication.register.title') }}</router-link> </v-col>
              <v-col cols="12" class="d-flex justify-center"><router-link @click="isActive.value = false" :to="{ name: 'AuthReset'}">{{ $t('authentication.login.forgotten_password') }}</router-link></v-col>
            </v-row>
          </div>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Close" @click="isActive.value = false"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>


<script>
import {useSecurityStore} from "@/store/security";
import Security from "@/mixins/Security.vue";
import Rules from "@/mixins/Rules.vue";

export default {
  mixins: [Security, Rules],
  data(){
    return {
      isValid: null,
      error: false,
      loading: false,
      email : '',
      password : ''
    }
  },
  methods: {
    submit () {
      if (!this.isValid) return;
      this.error = false;
      this.loading = true;
      let payload = {
        login: this.$data.email,
        password: this.$data.password
      }
      this.$gtag.event('login', { method: 'Google' })
      useSecurityStore().login(payload)
        .catch(() => {
          this.error = true
          this.loading = false;
        });
    },
  },
}
</script>
