<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
import TopicApi from '@/services/api/forum/Topic';
import BreadcrumbsManager from '@/mixins/BreadcrumbManager';

export default {
    mixins: [BreadcrumbsManager],
    name: 'GameTopicMain',
    data() {
        return {
            topic: {
                id: null,
                type: {
                    libType: '',
                }
            },
        };
    },
    computed: {
        getTopic() {
            return this.topic;
        },
    },
    methods: {
        setTopic () {
            TopicApi.getTopic(this.$route.params.idTopic)
                .then(topic => {
                    this.topic = topic;
                    this.setBreadcrumbLevel(3);
                    this.setBreadcrumbItem3(
                        { text: topic.libTopic, to: {name: 'GameTopicIndex',params: { idTopic: topic.id, slugTopic: topic.slug }}}
                    );
                });
        },
    },
    created() {
        this.setTopic();
    },
    updated() {
        if (this.$route.name  === 'GameTopicIndex') {
            this.setBreadcrumbLevel(3);
        }
    },
};
</script>
