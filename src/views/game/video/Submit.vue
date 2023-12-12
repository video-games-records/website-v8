<template>
    <div>
        <vue-headful :title="title" :description="description" />
        <h3>{{ $t('video.submit.title') }} </h3>
        <video-form-insert v-if="hasRolePlayer" v-bind:game=getGame></video-form-insert>
    </div>
</template>

<script>
import VideoFormInsert from '@/components/vgr/video/form/Insert.vue';
import BreadcrumbsManager from '@/mixins/BreadcrumbManager';
import i18n from "@/i18n";
import Security from "@/mixins/Security.vue";

export default {
    mixins: [BreadcrumbsManager, Security],
    name: 'GameVideoSubmit',
    components: {
        VideoFormInsert
    },
    data() {
        return {
            video: {
                player: {},
                game: {},
            }
        };
    },
    computed: {
        title() {
            return this.$i18n.t('video.submit.title') + ' - ' + this.getGame.name + ' - ' + process.env.VUE_APP_TITLE;
        },
        description() {
            return this.$i18n.t('video.submit.description') + this.getGame.name + ' ' + this.$store.getters['navigation/gamePlatformList'];
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
                { text: this.$i18n.t('video.submit.title')}
            );
        }
    },
};
</script>
