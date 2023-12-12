<template>
    <div>
        <vue-headful :title="title" :description="description" />

        <h1>{{ $t('game.next.title') }}</h1>

        <h2>{{ $t('game.next.status.created') }}</h2>
        <gameList
                v-bind:games=this.gamesCreated
                v-bind:show-link="false"
                v-bind:display-charts="false"
                v-bind:display-posts="false"
                v-bind:display-players="false">
        </gameList>

        <h2>{{ $t('game.next.status.addScore') }}</h2>
        <gameList
                v-bind:games=this.gamesAddScore
                v-bind:show-link="false"
                v-bind:display-charts="false"
                v-bind:display-posts="false"
                v-bind:display-players="false">
        </gameList>

        <h2>{{ $t('game.next.status.addPicture') }}</h2>
        <gameList
                v-bind:games=this.gamesAddPicture
                v-bind:show-link="false"
                v-bind:display-charts="false"
                v-bind:display-posts="false"
                v-bind:display-players="false">
        </gameList>

        <h2>{{ $t('game.next.status.completed') }}</h2>
        <gameList
                v-bind:games=this.gamesCompleted
                v-bind:show-link="false"
                v-bind:display-charts="false"
                v-bind:display-posts="false"
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
                return this.$i18n.t('game.next.title') + ' - ' + process.env.VUE_APP_TITLE;
            },
            description() {
                return this.$i18n.t('game.next.description');
            },
            getLanguage () {
                return i18n.locale;
            },
        },
        data() {
            return {
                gamesCreated : this.getList('CREATED'),
                gamesAddPicture : this.getList('ADD_PICTURE'),
                gamesAddScore : this.getList('ADD_SCORE'),
                gamesCompleted: this.getList('COMPLETED'),
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
                    { text: this.$i18n.t('game.next.title')},
                );
            },
            getList(status) {
                return GameApi.getList({
                    query :{
                        'pagination':false,
                        'status': status,
                        'order[id]': 'ASC',
                        'groups': ['game.list', 'game.platforms', 'platform.read']
                    },
                    cache : {useCache: true}
                })
                    .then((response) => response)
            }
        },
    }
</script>
