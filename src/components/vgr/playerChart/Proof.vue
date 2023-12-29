<template>
    <div v-if="playerChart.proof">
        <vgr-picture v-if="playerChart.proof.picture" v-bind:picture="playerChart.proof.picture"></vgr-picture>
        <vgr-video v-if="playerChart.proof.video" v-bind:video="playerChart.proof.video" width="720" height="405"></vgr-video>
    </div>
</template>

<script>
    import Video from "@/components/vgr/video/Video";
    import Picture from "@/components/vgr/picture/Picture";

    export default {
        name: 'PlayerChartProof',
        components: {
            'vgr-video' : Video,
            'vgr-picture' : Picture,
        },
        props: {
            'playerChart': {
                type: Object,
                require: true,
            },
        },
        data() {
            return {
            };
        },
    };
</script>
