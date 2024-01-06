<template>
  <v-row>
    <v-col cols="12" md="1" lg="1" class="center">
      <avatar size="100px" v-bind:player="player"/>
    </v-col>
    <v-col cols="12" md="6" lg="6">
      <ul>
        <li>{{ $t('global.status') }}: {{ player.status.name }}</li>
        <li v-if="player.country">{{ $t('player.country') }}: {{ player.country.name }}
          <country v-bind:country="player.country"></country>
        </li>
        <li v-if="player.displayPersonalInfos && player.birthDate">{{ $t('player.age') }}: {{ getAge }}</li>
        <li v-if="player.displayPersonalInfos && player.gender">{{ $t('player.gender') }}:
          <gender v-bind:gender="player.gender"/>
        </li>
        <li>{{ $t('player.createdAt') }}:
          <date v-bind:date="player.createdAt"
                v-bind:options="{ month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }"></date>
        </li>
        <li>{{ $t('player.lastLogin') }}:
          <date v-bind:date="player.lastLogin"
                v-bind:options="{ month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }"></date>
        </li>
        <li>{{ $t('player.nbConnexion') }}: {{ number(player.nbConnexion) }}</li>
        <li v-if="player.team">{{ $t('player.team') }}:
          <team v-bind:team="player.team"/>
          [{{ player.team.tag }}]
        </li>
        <li v-if="player.youtube"><a :href="player.youtube">{{ $t('player.youtube') }}</a></li>
        <li v-if="player.twitch"><a :href="player.twitch">{{ $t('player.twitch') }}</a></li>
        <li v-if="player.website">{{ $t('player.website') }} <a :href="player.website">{{ player.website }}</a></li>
      </ul>
    </v-col>
  </v-row>
</template>

<script>

import Avatar from "@/components/vgr/player/Avatar";
import MyDate from "@/components/tools/Date";
import Gender from "@/components/tools/Gender";
import Team from "@/components/vgr/team/Team";
import Country from "@/components/country/Country";
import Security from "@/mixins/Security.vue";
import Filters from "@/mixins/Filters.vue";

export default {
  mixins: [Security, Filters],
  name: 'PlayerProfileCard',
  props: ['player'],
  components: {
    'avatar': Avatar,
    'date': MyDate,
    'gender': Gender,
    'team': Team,
    'country': Country,
  },
  data() {
    return {};
  },
  computed: {
    getAge() {
      if (this.player.birthDate) {
        let birthDate = new Date(this.player.birthDate);
        let diff = Date.now() - birthDate.getTime();
        let age = new Date(diff);
        return Math.abs(age.getUTCFullYear() - 1970);
      }
      return null;
    }
  },
};
</script>
