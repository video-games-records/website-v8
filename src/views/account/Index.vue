<template>
  <div class="ma-2">
    <h1 class="screen-reader-text">{{ $t('account.index.title') }}</h1>
    <v-form  v-model="isValid" validate-on="blur" @submit.prevent @submit="submit()">
      <v-row>
        <v-col cols="12">
          <v-text-field :label="$t('user.username')" id="username" v-model="user.username" readonly="readonly"/>
        </v-col>
        <v-col cols="12" lg="6">
          <v-select density="comfortable" :label="$t('user.language')" v-model="user.locale" :items="languages"
                    item-title="name" item-value="value" />
        </v-col>
        <v-col cols="12" lg="6">
          <v-select density="comfortable" :label="$t('player.country')" v-model="player.country" :items="countries"
                    item-title="name" item-value="@id" />
        </v-col>
        <v-col cols="12" lg="6">
          <v-select density="comfortable" :label="$t('player.gender')" v-model="player.gender" :items="genders"
              item-title="name" item-value="value" />
        </v-col>
        <v-col cols="12" lg="6">
          <v-text-field :label="$t('player.birthDay')" v-model="player.birthDate" type="date"/>
        </v-col>
        <v-col cols="12">
          <v-checkbox :label="$t('player.displayPersonalInfos')" v-model="player.displayPersonalInfos" />
        </v-col>

        <v-col cols="12" lg="6">
          <v-text-field :label="$t('player.website')" v-model="player.website" />
        </v-col>
        <v-col cols="12" lg="6">
          <v-text-field :label="$t('player.discord')" v-model="player.discord" />
        </v-col>
        <v-col cols="12" lg="6">
          <v-text-field :label="$t('player.youtube')" v-model="player.youtube" />
        </v-col>
        <v-col cols="12" lg="6">
          <v-text-field :label="$t('player.twitch')" v-model="player.twitch" />
        </v-col>

        <v-col cols="12" lg="6">
          <label for="presentation" class="font-weight-bold">{{ $t('player.presentation') }}</label>
          <ckeditor :editor="editor" v-model="player.presentation" :config="getCkeditorToolBar"></ckeditor>
        </v-col>

        <v-col cols="12" lg="6">
          <label for="collection" class="font-weight-bold">{{ $t('player.collection') }}</label>
          <ckeditor :editor="editor" v-model="player.collection" :config="getCkeditorToolBar"></ckeditor>
        </v-col>

        <v-col cols="12">
          <v-btn type="submit" class="ma-2">{{ $t('tag.submit') }}</v-btn>
          <v-btn v-on:click="cancel" class="ma-2">{{ $t('tag.cancel') }}</v-btn>
        </v-col>
      </v-row>
    </v-form>

  </div>
</template>

<script>
import axios from 'axios';
import Security from "@/mixins/Security.vue";
import Ckeditor from "@/mixins/Ckeditor.vue";
import {useFlashMessageStore} from "@/store/base/flashMessage";

export default {
  mixins: [Security, Ckeditor],
  name: 'AccountIndex',
  props: [],
  data() {
    return {
      user: {},
      player: {},
      languages: [
        {value:'en', name: this.$t('language.english')},
        {value:'fr', name: this.$t('language.french')},
      ],
      genders: [
        {value:'I', name: this.$t('gender.unknown')},
        {value:'H', name: this.$t('gender.male')},
        {value:'F', name: this.$t('gender.female')},
      ],
      countries: [],
      isValid: false,
      success: false,
    };
  },
  created() {
    this.axios.get('/api/countries', {enableCache: true})
        .then(response => {
          this.countries = response.data['hydra:member']
        });
    this.load();
  },
  updated() {
    if (this.isInitialized === false) {
      this.init();
    }
  },

  methods: {
    load: function () {
      this.axios.get('/api/users/' + this.getAuthenticatedUser.id)
          .then(response => {
            this.user = response.data
          })
      this.axios.get('/api/players/' + this.getAuthenticatedPlayer.id + '?groups[]=player.read&groups[]=player.country')
          .then(response => {
            let player = response.data;
            if (player.birthDate !== null) {
              player.birthDate = player.birthDate.substr(0, 10);
            }
            this.player = player;
          })
    },
    submit: function () {
      let promises = [];
      promises.push(this.axios.put('/api/users/' + this.user.id, this.user));
      promises.push(this.axios.put('/api/players/' + this.player.id, this.player));

      axios.all(promises).then(() => {
        useFlashMessageStore().confirm(this.$t('tag.success'));
      });

    },
    cancel: function () {
      this.load();
    },
  },
};
</script>
