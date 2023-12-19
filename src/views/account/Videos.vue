<template>
    <div>
        <vue-headful :title="title" :description="description" />
        <b>{{ getCount }} {{ $tc('video.count', getCount) }}</b>
        <video-list v-bind:videos=videos v-bind:is-editable="true"></video-list>
    </div>
</template>

<script>

import VideoList from "@/components/vgr/video/List.vue";
import VideoApi from "@/services/api/vgr/Video";
import Security from "@/mixins/Security.vue";


export default {
    mixins: [Security],
    name: 'AccountVideos',
    components: {
        'videoList' : VideoList,
    },
    data() {
        return {
            videos: [],
        };
    },
    created() {
        this.loadData();
    },
    computed: {
        title() {
            return this.$i18n.t('account.videos.title')+ ' - ' + process.env.VUE_APP_TITLE;
        },
        description() {
            return this.$i18n.t('account.videos.description');
        },
        getCount() {
            return this.videos.length;
        }
    },
    methods: {
        loadData(){
            VideoApi.getList({
                query :{
                    'pagination':false,
                    'player': this.getPlayer.id,
                },
            })
            .then(videos => {
                this.videos = videos['hydra:member'];
            });
        }
    },
};
</script>
