<template>
    <div>
        <div class="button-actions button-actions--top">
            <button @click="search()">{{ $t('search.advanced') }}</button>
        </div>

        <player-chart-list
            v-bind:id-player="this.$route.params.idPlayer"
            v-bind:display-status="true"
            v-bind:active-order-by="true"
        >
        </player-chart-list>
    </div>
</template>

<script>
    import PlayerChartList from '@/components/vgr/playerChart/List';

    export default {
        name: 'PlayerGames',
        components: {
            PlayerChartList,
        },
        data() {
            return {

            };
        },
        methods: {
            isSearchable() {
                if (!this.$refs.players) return false;
                return (this.$refs.players.data.length > 0) || (this.$refs.games.data.length > 0);
            },
            search(){
                let data = [this.$parent.player];
                this.$store.dispatch('playerChartSearch/setPlayers', data);
                this.$router.push({ name: 'PlayerChartSearch'});
            },
        },
    };
</script>
