<template>
    <div>
        <p>
            {{ $t('stats.averageRank') }} : {{ getTeam.averageGameRank }}
        </p>
        <team-stats v-bind:team="getTeam" />
    </div>
</template>

<script>
    import TeamStats from '@/components/vgr/team/profile/Stats.vue';

    export default {

        name: 'TeamIndex',
        components: {
            'team-stats': TeamStats,
        },
        data() {
            return {

            };
        },
        computed: {
            getTeam() {
                return this.$parent.team;
            },
        },
    };
</script>
