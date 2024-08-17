<template>
  <div class="ma-2">
    <div v-if="isLeader">
      <v-card class="ma-3">
        <v-card-title class="bg-primary">{{ $t('team.update.title') }}</v-card-title>
        <v-card-item>
          <v-form v-model="isValid" validate-on="blur" @submit.prevent @submit="update()">
            <v-text-field v-model="team.libTeam" :label="$t('team.name')" :rules="[rules.required, rules.minlength(2, team.libTeam), rules.maxlength(50, team.libTeam)]"></v-text-field>
            <v-text-field v-model="team.tag" :label="$t('team.tag')" :rules="[rules.required, rules.minlength(2, team.tag), rules.maxlength(4, team.tag)]"></v-text-field>
            <label for="presentation" class="font-weight-bold">{{ $t('team.presentation') }}</label>
            <ckeditor :editor="editor" v-model="team.presentation" :config="editorConfig"></ckeditor>
            <v-btn type="submit" class="mt-2">{{ $t('tag.submit') }}</v-btn>
          </v-form>
        </v-card-item>
      </v-card>

      <avatar-upload-form callback="api/teams/upload-avatar"/>
      <account-master-badges type="team" :id="team.id" />
      <leader-team-requests />
    </div>

    <div v-else>
      <div v-if="hasTeam">
        <dl>
          <dt>{{ $t('team.name') }}</dt>
          <dd>{{ team.libTeam }}</dd>

          <dt>{{ $t('team.tag') }}</dt>
          <dd>{{ team.tag }}</dd>

          <v-btn v-on:click="quit" append-icon="mdi-account-off">
            {{ $t('team.quit') }}
          </v-btn>
        </dl>
      </div>
      <div v-else>
        <h2>{{ $t('team.create') }}</h2>
        <v-form v-model="isValid" validate-on="blur" @submit.prevent @submit="add()">
          <v-text-field v-model="team.libTeam" :label="$t('team.name')" :rules="[rules.required, rules.minlength(5, team.libTeam)]"></v-text-field>
          <v-text-field v-model="team.tag" :label="$t('team.tag')" :rules="[rules.required, rules.minlength(2, team.tag), rules.maxlength(4, team.tag)]"></v-text-field>
          <v-btn type="submit" class="mt-2">{{ $t('tag.submit') }}</v-btn>
        </v-form>

        <player-team-requests />
      </div>
    </div>
  </div>
</template>

<script>
import Security from "@/mixins/Security.vue";
import Rules from "@/mixins/Rules.vue";
import Ckeditor from "@/mixins/Ckeditor.vue";
import {useFlashMessageStore} from "@/store/base/flashMessage";
import AvatarUploadForm from "@/components/avatar/UploadForm.vue";
import AccountMasterBadges from "@/components/vgr/account/MasterBadges.vue";
import LeaderTeamRequests from "@/components/vgr/account/LeaderTeamRequests.vue";
import PlayerTeamRequests from "@/components/vgr/account/PlayerTeamRequests.vue";

export default {
  mixins: [Security, Rules, Ckeditor],
  name: 'AccountTeam',
  props: [],
  components: {
    PlayerTeamRequests,
    LeaderTeamRequests,
    AccountMasterBadges,
    AvatarUploadForm
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
      this.axios.put('/api/players/' + player.id, player).then((response) => {
        this.team = null;
        let player = this.getAuthenticatedPlayer;
        player.team = null
        useFlashMessageStore().confirm('OK');
      });
    },
    add: function () {
      if (!this.isValid) return;
      this.axios.post('/api/teams', this.team).then((response) => {
        this.team = response.data;
        let player = this.getAuthenticatedPlayer;
        player.team = this.team;
      });
    },
    update: function () {
      if (!this.isValid) return;
      this.axios.put('/api/teams/' + this.team.id, this.team).then((response) => {
        this.team = response.data;
        useFlashMessageStore().confirm('OK');
      });
    },
  }
};
</script>
