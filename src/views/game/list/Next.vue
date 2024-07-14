<template>
  <div>
    <h1>{{ $t('game.next.title') }}</h1>

    <h2 class="ma-2">{{ $t('game.next.status.created') }}</h2>
    <gameList
        v-bind:callback="this.getCallBack('CREATED')"
        v-bind:show-link="false"
        v-bind:display-charts="false"
        v-bind:display-posts="false"
        v-bind:display-players="false">
    </gameList>

    <h2 class="ma-2">{{ $t('game.next.status.addScore') }}</h2>
    <gameList
        v-bind:callback="this.getCallBack('ADD_SCORE')"
        v-bind:show-link="false"
        v-bind:display-charts="false"
        v-bind:display-posts="false"
        v-bind:display-players="false">
    </gameList>

    <h2 class="ma-2">{{ $t('game.next.status.addPicture') }}</h2>
    <gameList
        v-bind:callback="this.getCallBack('ADD_PICTURE')"
        v-bind:show-link="false"
        v-bind:display-charts="false"
        v-bind:display-posts="false"
        v-bind:display-players="false">
    </gameList>

    <h2 class="ma-2">{{ $t('game.next.status.completed') }}</h2>
    <gameList
        v-bind:callback="this.getCallBack('COMPLETED')"
        v-bind:show-link="false"
        v-bind:display-charts="false"
        v-bind:display-posts="false"
        v-bind:display-players="false">
    </gameList>
  </div>
</template>

<script>
import GameList from '@/components/vgr/game/List.vue';

export default {
  name: 'GameListNext',
  components: {GameList},
  data() {
    return {
    };
  },
  created() {
    document.title = this.$t('game.next.title') + ' - ' + import.meta.env.VITE_APP_TITLE;
  },
  methods: {
    getCallBack(status) {
      return '/api/games?pagination=false&order[id]=ASC&groups[]=game:read&groups[]=game:platforms&groups[]=platform:read&status=' + status;
    }
  },
}
</script>
