<template>
    <div>
        <vue-headful :title="title" :description="description" />
         <div class="profile-badges">
            <player-badge-master v-bind:player="getPlayer" v-bind:id-player="getPlayer.id" v-bind:active-order-by="true"/>
        </div>
    </div>
</template>

<script>
import PlayerBadgeMaster from "@/components/vgr/player/badge/Master";
import Security from "@/mixins/Security.vue";

export default {
    mixins: [Security],
    name: 'AccountBadges',
    components: {
        PlayerBadgeMaster
    },
    data() {
        return {}
    },
    computed: {
        title() {
            return this.$i18n.t('account.badges.title')+ ' - ' + process.env.VUE_APP_TITLE;
        },
        description() {
            return this.$i18n.t('account.badges.description');
        },
    },
};
</script>
