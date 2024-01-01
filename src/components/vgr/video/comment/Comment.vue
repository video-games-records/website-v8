<template>
    <div>
        <player v-bind:player="comment.player" v-bind:show-avatar="true"></player>
        <span v-html="comment.text"></span>
        <date v-bind:date="comment.createdAt" v-bind:options="{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }"></date>
    </div>
</template>

<script>
    import Player from '@/components/vgr/player/Player.vue';
    import Date from '@/components/tools/Date.vue';

    export default {
        name: 'Comment',
        components: {
            'player': Player,
            'date': Date,
        },
        props: {
            'comment': {
                type: Object,
                require: true,
            },
        },
    };
</script>
