<template>
    <div>
        <topic-create v-bind:forum="getForum" route="Game"></topic-create>
    </div>
</template>

<script>
import BreadcrumbsManager from '@/mixins/BreadcrumbManager';
import TopicCreate from "@/components/forum/topic/Create";
import i18n from "@/i18n";

export default {
    mixins: [BreadcrumbsManager],
    components: {TopicCreate},
    name: 'GameTopicNew',
    data() {
        return {

        };
    },
    computed: {
        getForum() {
            return this.$parent.getForum;
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
            this.setBreadcrumbItem3(
                { text: this.$i18n.t('title')}
            );
            this.setBreadcrumbLevel(3);
        }
    },
};
</script>
