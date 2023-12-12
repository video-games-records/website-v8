<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
import BreadcrumbsManager from '@/mixins/BreadcrumbManager';

export default {
    mixins: [BreadcrumbsManager],
    name: 'GameForumMain',
    data() {
        return {
        };
    },
    computed: {
        getForum() {
            return this.$store.getters['navigation/game'].forum;
        },
    },
    methods: {
        loadData () {
            this.setBreadcrumbLevel(2);
            this.setBreadcrumbItem2(
                { text: 'Forum', to: {name: 'GameForumIndex', to: {name: 'GameForumIndex',params: { idForum: this.getForum.id, slugForum: this.getForum.slug }}}}
            );
        },
    },
    created() {
        this.loadData();
    },
    updated() {
        if (this.$route.name  === 'GameForumIndex') {
            this.setBreadcrumbLevel(2);
        }
    },
};
</script>
