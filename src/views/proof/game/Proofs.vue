<template>

  <v-sheet>
    <v-row>
      <v-col cols="12">
        <button type="button" onclick="history.back();" class="button-as-link">{{ $t('player.proof.goBack') }}</button>
      </v-col>
      <v-col cols="4" md="3" lg="2">
        <game-picture v-bind:game="getPlayerGame.game" />
      </v-col>
      <v-col cols="8" md="9" lg="10">
        <div>
          <h2 class="h3">{{ $t('player.proof.proofsOn') }} {{ getPlayerGame.game.name }}</h2>
          <platform-list v-bind:platforms="getPlayerGame.game.platforms"></platform-list>
        </div>
      </v-col>
      <v-col cols="12">
        <v-btn @click="toggle()">
          <span v-if="isOpened">{{ $t('player.proof.close') }}</span>
          <span v-else>{{ $t('player.proof.open') }}</span>
        </v-btn>
      </v-col>
      <v-col cols="12">
        <player-proof-group v-for="group in groups" :key="group.id" v-bind:group="group" v-bind:idPlayer="getAuthenticatedPlayer.id"
                            v-bind:manage="true"/>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>

import PlayerProofGroup from "@/components/vgr/player/proof/Group";
import GamePicture from "@/components/vgr/game/Picture";
import PlatformList from "@/components/vgr/platform/List";
import Security from "@/mixins/Security.vue";
import {usePlayerProofStore} from "@/store/player/proof";

export default {
  mixins: [Security],
  name: 'AccountGameProofs',
  props: {},
  components: {
    PlayerProofGroup,
    GamePicture,
    PlatformList,
  },
  data() {
    return {
      groups: [],
    };
  },
  computed: {
    isOpened() {
      return usePlayerProofStore().getIsOpened;
    },
    getPlayerGame() {
      return this.$parent.$parent.playerGame;
    },
    getLibGroup() {
      if (this.$i18n.locale === 'fr') {
        return 'libGroupFr';
      }
      return 'libGroupEn';
    },
  },
  created() {
    this.load();
  },
  watch: {
    '$route.params.idGame'() {
      this.load();
      this.$forceUpdate();
    }
  },
  methods: {
    load() {
      this.axios.get('api/games/' + this.$route.params.idGame + '/groups?pagination=false&order[' + this.getLibGroup + ']=ASC')
          .then(response => {
            this.groups = response.data['hydra:member'];
          });
    },
    toggle() {
      usePlayerProofStore().toogle()
    }
  },
};
</script>
