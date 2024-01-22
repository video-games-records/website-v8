<template>
  <v-sheet class="ma-5">
    <v-sheet v-if="isLeader">
      <v-form v-model="isValid" validate-on="blur" @submit.prevent @submit="update()">
        <v-text-field v-model="team.libTeam" :label="$t('team.name')" :rules="[rules.required]"></v-text-field>
        <v-text-field v-model="team.tag" :label="$t('team.tag')" :rules="[rules.required]"></v-text-field>
        <label for="presentation" class="font-weight-bold">{{ $t('team.presentation') }}</label>
        <ckeditor :editor="editor" v-model="team.presentation" :config="editorConfig"></ckeditor>
        <v-btn type="submit" class="mt-2">{{ $t('tag.submit') }}</v-btn>
      </v-form>
    </v-sheet>
    <v-sheet v-else>
      <v-sheet v-if="hasTeam">
        <dl>
          <dt>{{ $t('team.name') }}</dt>
          <dd>{{ team.libTeam }}</dd>

          <dt>{{ $t('team.tag') }}</dt>
          <dd>{{ team.tag }}</dd>

          <v-btn v-on:click="quit" append-icon="mdi-account-off">
            {{ $t('team.quit') }}
          </v-btn>
        </dl>
      </v-sheet>
      <v-sheet v-else>
        <h2>{{ $t('team.create') }}</h2>
        <v-form v-model="isValid" validate-on="blur" @submit.prevent @submit="add()">
          <v-text-field v-model="team.libTeam" :label="$t('team.name')" :rules="[rules.required]"></v-text-field>
          <v-text-field v-model="team.tag" :label="$t('team.tag')" :rules="[rules.required]"></v-text-field>
          <v-btn type="submit" class="mt-2">{{ $t('tag.submit') }}</v-btn>
        </v-form>
      </v-sheet>
    </v-sheet>

  </v-sheet>
</template>

<script>
import Security from "@/mixins/Security.vue";
import Rules from "@/mixins/Rules.vue";
import Ckeditor from "@/mixins/Ckeditor.vue";
import {useFlashMessageStore} from "@/store/base/flashMessage";

export default {
  mixins: [Security, Rules, Ckeditor],
  name: 'AccountTeam',
  props: [],
  components: {

  },
  data() {
    return {
      isValid: false,
      team: {
        id: null,
        libTeam: '',
        tag: '',
        presentation: '',
      }
    };
  },
  created() {
    if (this.getAuthenticatedPlayer.team !== null) {
      this.load();
    }
  },
  computed: {
    hasTeam() {
      return this.team.id !== null;
    },
    isLeader() {
      return this.hasTeam && this.team.leader.id === this.getAuthenticatedPlayer.id;
    },
  },
  methods: {
    load() {
      this.axios.get(
          '/api/teams/' + this.getAuthenticatedPlayer.team.id
      )
          .then(response => {
            this.team = response.data;
          })
    },
    quit: function () {
      let player = this.getAuthenticatedPlayer;
      player.team = null;
      this.axios.put('/api/players/' + player.id, player);
    },
    add: function () {
      this.axios.post('/api/teams', this.team).then((response) => {
        this.team = response.data;
        let player = this.getAuthenticatedPlayer;
        player.team = this.team;
      });
    },
    update: function () {
      this.axios.put('/api/teams/' + this.team.id, this.team).then((response) => {
        this.team = response.data;
        useFlashMessageStore().confirm('OK');
      });
    },
  }
};
</script>
