<template>
    <div>
        <vue-headful :title="title" :description="description" />
        <h3>{{ $t('title') }} </h3>
        <video-list v-bind:videos=videos></video-list>
    </div>
</template>

<script>
    import VideoList from '@/components/vgr/video/List.vue';
    import BreadcrumbsManager from '@/mixins/BreadcrumbManager';
    import i18n from "@/i18n";
    import VideoApi from "@/services/api/vgr/Video";

    export default {
        mixins: [BreadcrumbsManager],
        name: 'VideoSubmit',
        components: {
            'videoList' : VideoList,
        },
        data() {
            return {
                videos: [],
                resource_url : '/api/videos?isActive=true&itemsPerPage=10',
            };
        },
        computed: {
            title() {
                return this.$i18n.t('game.video.list.title') + ' - ' + this.getGame.name + ' - ' + process.env.VUE_APP_TITLE;
            },
            description() {
                return this.$i18n.t('game.video.list.description') + this.getGame.name + ' ' + this.$store.getters['navigation/gamePlatformList'];
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
                    { text: this.$i18n.t('game.video.list.title')}
                );
                VideoApi.getList({
                    query :{
                        'pagination':false,
                        'game': this.$route.params.idGame,
                    },
                })
                .then(videos => {
                    this.videos = videos['hydra:member'];
                });
            }
        },
    };
</script>
