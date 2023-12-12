<template>
    <div>
        <vue-headful :title="title" :description="description" />
        <h3>{{ $t('game.rules.specific') }}</h3>

        <div v-if="getGame.rules && getGame.rules.length > 0">
            <div v-for="rule in getGame.rules" :data-position="rule.position" :key="rule.id" v-html="rule.text" />
        </div>
        <div v-else>{{ $t('game.rules.no') }}</div>

        <h3>{{ $t('game.rules.general') }}</h3>
        <router-link :to="{ name: 'Rules'}">{{ $t('game.rules.seeGeneral') }}</router-link>
    </div>
</template>

<script>
    import BreadcrumbsManager from '@/mixins/BreadcrumbManager';
    import i18n from "@/i18n";

    export default {
        mixins: [BreadcrumbsManager],
        name: 'VideoSubmit',
        components: {
        },
        data() {
            return {
            };
        },
        computed: {
            title() {
                return this.$i18n.t('game.rules.title') + ' - ' + this.getGame.name + ' - ' + process.env.VUE_APP_TITLE;
            },
            description() {
                return this.$i18n.t('game.rules.description') + this.getGame.name + ' ' + this.$store.getters['navigation/gamePlatformList'];
            },
            getGame() {
                return this.$store.getters['navigation/game'];
            },
            getLanguage () {
                return i18n.locale;
            },
        },
        watch : {
            getLanguage() {
                this.loadData();
            },
        },
        created() {
            this.loadData();
        },
        methods: {
            loadData() {
                this.setBreadcrumbLevel(2);
                this.setBreadcrumbItem2(
                    { text: this.$i18n.t('game.rules.title')}
                );
            }
        },
    };
</script>
