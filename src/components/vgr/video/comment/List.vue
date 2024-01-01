<template>
    <div>
        <VAsync :await="comments">
            <template #pending>
                <loading></loading>
            </template>
            <template #resolved="comments">
                <comment v-for="comment in comments" :key="comment.id" v-bind:comment="comment"></comment>
            </template>
        </VAsync>
    </div>
</template>

<script>
    import Comment from '@/components/vgr/video/comment/Comment.vue';

    export default {
        name: 'CommentList',
        components: {
            'comment': Comment,
        },
        props: {
            'comments': {
                type: Promise,
                require: true,
            },
        },
        data() {
            return {
                article: {},
            };
        },
    };
</script>
