<template>
    <master v-if="getMaster !== 0" v-bind:badges="getMaster" />
</template>

<script>
    import Master from '@/components/vgr/team/badge/Master';
    import TeamBadgeApi from "@/services/api/vgr/TeamBadge";

    export default {
        name: 'TeamProfileBadges',
        props: {
            'idTeam': {
                require: true,
            }
        },
        components: {
            'master': Master,
        },
        data() {
            return {
                badges: [],
            };
        },
        computed: {
            getNow: function() {
                function pad(s) { return (s < 10) ? '0' + s : s; }
                let d = new Date();
                return [d.getFullYear(), pad(d.getMonth()+1), pad(d.getDate())].join('-');
            },
            getMaster() {
                return this.getBadges('Master');
            },
        },
        created() {
            this.load();
        },
        methods: {
            load() {
                TeamBadgeApi.getList({
                    query: {
                        pagination: false,
                        team: this.idTeam,
                        'endedAt[after]' : this.getNow
                    }
                })
                    .then(badges => {
                        this.badges = badges['hydra:member'];
                    });
            },
            getBadges(type) {
                let data = [];
                this.badges.forEach(function(element) {
                        if (element.badge.type === type) {
                            data.push(element);
                        }
                    }
                );
                return data;
            },
        },
    };
</script>