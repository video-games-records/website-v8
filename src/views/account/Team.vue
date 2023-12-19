<template>
    <div>
        <vue-headful :title="title" :description="description" />
        <team-admin-index v-if="isLeader"></team-admin-index>
        <team-player-index v-else></team-player-index>

        <div v-if="isLoading" aria-live="polite" aria-atomic="true">
            <loading></loading>
        </div>
    </div>
</template>

<script>
import TeamAdminIndex from '@/components/vgr/team/account/admin/Index.vue';
import TeamPlayerIndex from '@/components/vgr/team/account/player/Index.vue';

export default {
    name: 'AccountTeam',
    props: [],
    components: {
        'teamAdminIndex': TeamAdminIndex,
        'teamPlayerIndex': TeamPlayerIndex,
    },
    data() {
        return {
        };
    },
    created () {
        this.$store.dispatch('TeamAccount/init');
    },
    updated() {
        if (this.isInitialized === false) {
            this.$store.dispatch('TeamAccount/init');
        }
    },
    computed: {
        title() {
            return this.$i18n.t('account.team.title') + ' - ' + process.env.VUE_APP_TITLE;
        },
        description() {
            return this.$i18n.t('account.team.description');
        },
        isInitialized() {
            return this.$store.getters['TeamAccount/isInitialized'];
        },
        isLoading() {
            return this.$store.getters['TeamAccount/isLoading'];
        },
        getTeam() {
            return this.$store.getters['TeamAccount/team'];
        },
        getPlayer() {
            return this.$store.getters['TeamAccount/player'];
        },
        hasTeam() {
            return this.getTeam.id !== undefined;
        },
        isLeader() {
            if (this.isInitialized && this.hasTeam) {
                return this.getTeam.leader === this.getPlayer['@id'];
            } else {
                return false;
            }
        },
    },
};
</script>
