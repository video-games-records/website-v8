<template>
    <div>

        <h1>{{ player.pseudo }}</h1>

        <router-view></router-view>
    </div>
</template>

<script>
    import PlayerApi from '@/services/api/vgr/Player';
    import BreadcrumbsManager from '@/mixins/BreadcrumbManager';
    import PlayerProfileCard from "@/components/vgr/player/profile/Card";

    export default {
        mixins: [BreadcrumbsManager],
        name: 'PlayerMain',
        components: {
            PlayerProfileCard
        },
        data() {
            return {
                player: {
                    id: null,
                    pseudo: '',
                },
            };
        },
        created() {
            this.setData();
        },
        computed: {
            title() {
                return this.player.pseudo + ' - ' + process.env.VUE_APP_TITLE;
            },
            description() {
                return this.$i18n.t('player.profile.description', [this.player.pseudo]);
            },
        },
        watch: {
            '$route.params.idPlayer' () {
                this.setData();
                this.$forceUpdate();
            }
        },
        methods: {
            isRoute(name) {
                return this.$route.name.endsWith(name);
            },
            setData () {
                PlayerApi.getPlayer(this.$route.params.idPlayer)
                    .then(player => {
                        this.player = player;
                        this.setBreadcrumbOnlyItem1(
                            { text: player.pseudo, to: {name: 'PlayerIndex',params: { idPlayer: player.id, slugGame: player.slug }}}
                        );
                    });
            }
        },
    };
</script>
