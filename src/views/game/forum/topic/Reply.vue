<template>
    <div>
        <topic-reply v-if="getTopic.id" v-bind:topic="getTopic" route="Game"></topic-reply>
    </div>
</template>


<script>
import BreadcrumbsManager from '@/mixins/BreadcrumbManager';
import TopicReply from '@/components/forum/topic/Reply';
import i18n from "@/i18n";

export default {
    mixins: [BreadcrumbsManager],
    name: 'GameTopicReply',
    components: {
        'topic-reply' : TopicReply,
    },
    data() {
        return {
        };
    },
    computed: {
        getTopic() {
            return this.$parent.topic;
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
            this.setBreadcrumbItem4(
                { text: this.$i18n.t('forum.reply.title')}
            );
            this.setBreadcrumbLevel(4);
        }
    },
};
</script>
