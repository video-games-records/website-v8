<template>
    <div>
        <vue-headful :title="title" :description="description" />

        <h1>{{ $t('menu.game.last') }}</h1>

        <gameList
            v-bind:games=games
            v-bind:display-charts="true"
            v-bind:display-posts="true"
            v-bind:display-players="false">
        </gameList>
    </div>
</template>

<script>
    import GameList from '@/components/vgr/game/List.vue';
    import GameApi from '@/services/api/vgr/Game';
    import BreadcrumbsManager from '@/mixins/BreadcrumbManager';
    import i18n from "@/i18n";

    export default {
        mixins: [BreadcrumbsManager],
        name: 'GameListNext',
        components: {
            'gameList' : GameList,
        },
        computed: {
            title() {
                return this.$i18n.t('menu.game.last') + ' - ' + process.env.VUE_APP_TITLE;
            },
            description() {
                return this.$i18n.t('game.last.description');
            },
            getLanguage () {
                return i18n.locale;
            },
        },
        data() {
            return {
                games : GameApi.getList({
                    query :{
                        'pagination': true,
                        'status': this.$GAME_STATUS_ACTIVE,
                        'order[publishedAt]': 'DESC',
                        'groups': ['game.list', 'game.platforms', 'platform.read']
                    },
                    cache : {useCache: true}
                })
                    .then((response) => response)
            };
        },
        watch: {
            getLanguage() {
                this.loadData();
            },
        },
        created() {
            this.loadData();
        },
        methods: {
            loadData() {
                this.setBreadcrumbOnlyItem1(
                    { text: this.$i18n.t('menu.game.last')},
                );
            }
        },
    }
</script>
