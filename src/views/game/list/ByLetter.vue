<template>
  <div>
    <h1>{{ $t('game.byLetter.title') }} - {{ getLetter }}</h1>

    <ul class="d-flex flex-wrap justify-center">
      <li v-for="letter in alphabet" :data-position="letter.position" :key="letter.id">
        <router-link :to="{ name: 'GameListByLetter', params: { letter }}">{{ letter }}</router-link>
      </li>
    </ul>

    <game-list ref="games" v-bind:callback=getCallBack></game-list>
  </div>
</template>

<script>
import { useAppStore } from '@/store/app';
import GameList from '@/components/vgr/game/List.vue';

export default {
  name: 'GameListByLetter',
  components: {GameList},
  data() {
    return {
      alphabet: ['0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      games: []
    };
  },
  computed: {
    getCallBack() {
      return '/api/games-list-by-letter?letter=' + this.getLetter
    },
    getLetter() {
      return this.$route.params.letter;
    }
  },
  created() {
    document.title = this.$t('game.byLetter.title') + ' - ' + import.meta.env.VITE_APP_TITLE;
    useAppStore().setLetter(this.getLetter);
  },
}
</script>

<style scoped>
lu {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  padding-left: 0;
  list-style: none
}

li {
  margin-bottom: .25em;
  display: inline-block;
}

li:not(:last-child) {
  margin-right: .25em
}

li a {
  padding: 0 .5em;
  border:1px solid #05194d;
  background-color: #fff;
  color: #05194d;
  -webkit-box-shadow: 0 0 0 0 #05194d, 1px 1px 0 0 #05194d, 2px 2px 0 0 #05194d, 3px 3px 0 0 #05194d;
  box-shadow: 0 0 0 0 #05194d, 1px 1px 0 0 #05194d, 2px 2px 0 0 #05194d, 3px 3px 0 0 #05194d;
  text-decoration: none
}

ul a.router-link-exact-active, ul a:focus, ul a:hover {
  border: 1px solid #f09719;
  -webkit-box-shadow: 0 0 0 0 #f09719, 1px 1px 0 0 #f09719, 2px 2px 0 0 #f09719, 3px 3px 0 0 #f09719;
  box-shadow: 0 0 0 0 #f09719, 1px 1px 0 0 #f09719, 2px 2px 0 0 #f09719, 3px 3px 0 0 #f09719;
}
</style>
