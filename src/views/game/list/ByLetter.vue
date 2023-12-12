<template>
    <div>
        <vue-headful :title="title" :description="description" />

        <h1>{{ $t('game.byLetter.title') }} - {{this.$route.params.letter}}</h1>

        <ul class="game-list--alphabet">
            <li v-for="letter in alphabet" :data-position="letter.position" :key="letter.id" :class="'game-list__item'">
                <router-link :to="{ name: 'GameListByLetter', params: { letter }}">{{letter}}</router-link>
            </li>
        </ul>

        <gameList v-bind:games=games></gameList>
    </div>
</template>

<script>
    import GameList from '@/components/vgr/game/List.vue';
    import GameApi from '@/services/api/vgr/Game';
    import BreadcrumbsManager from '@/mixins/BreadcrumbManager';
    import i18n from "@/i18n";

    export default {
        mixins: [BreadcrumbsManager],
        name: 'GameListByLetter',
        components: {
            'gameList' : GameList
        },
        data() {
            return {
                alphabet:['0','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
                games: null
            };
        },
        created() {
            this.loadData();
        },
        computed: {
            title() {
                return this.$i18n.t('game.byLetter.title') + ' - ' + process.env.VUE_APP_TITLE;
            },
            description() {
                return this.$i18n.t('game.byLetter.description');
            },
            getLanguage () {
                return i18n.locale;
            },
        },
        watch: {
            '$route' () {
                this.loadData();
            },
            getLanguage() {
                this.loadData();
            },
        },
        methods: {
            loadData() {
                this.$store.dispatch('navigation/setLetter', this.$route.params.letter);
                this.games = GameApi.getListByLetter(this.$route.params.letter)
                    .then((response) => response);
                this.setBreadcrumbOnlyItem1(
                    { text: this.$i18n.t('game.byLetter.title')},
                );
            }
        },
    }
</script>
