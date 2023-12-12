<template>
    <div>
        <paginate ref="paginate" :resource_url="getResourceUrl" @update="updateResource" class="pagination--top"></paginate>
        <div class="button-actions button-actions--top">
            <router-link v-if="isAuthenticated === true" :to="{ name: 'GameTopicNew'}" class="link-as-button">{{ $t('forum.newTopic.title') }}</router-link>
            <read-form v-if="isAuthenticated" v-bind:id-forum="this.$route.params.idForum"></read-form>
        </div>

        <topic-list v-bind:topics="topics" route="Game"></topic-list>

        <div class="button-actions button-actions--bottom">
             <router-link v-if="isAuthenticated === true" :to="{ name: 'GameTopicNew'}" class="link-as-button">{{ $t('forum.newTopic.title') }}</router-link>
             <read-form v-if="isAuthenticated" v-bind:id-forum="this.$route.params.idForum"></read-form>
        </div>
        <paginate ref="paginate" :resource_url="getResourceUrl" @update="updateResource" class="pagination--bottom"></paginate>
    </div>
</template>

<script>
import TopicList from '@/components/forum/topic/List.vue';
import Paginate from "@/components/Paginate";
import ReadForm from "@/components/forum/forum/ReadForm";
import Security from "@/mixins/Security.vue";

export default {
    mixins: [Security],
    name: 'GameForumIndex',
    components: {
        TopicList,
        Paginate,
        ReadForm,
    },
    computed: {
        getGame() {
            return this.$store.getters['navigation/game'];
        },
        getForum() {
            return this.$parent.getForum;
        },
        getResourceUrl() {
            return '/api/forum_topics?forum=' + this.$route.params.idForum  + '&itemsPerPage=' + this.itemsPerPage;
        }
    },
    data() {
        return {
            topics: [],
            itemsPerPage: 20,
        };
    },
    methods: {
        updateResource(data){
            this.topics = data
        }
    },
};
</script>
