<template>
    <div>
        <h1>{{ getTopic.libTopic }}</h1>

        <paginate :resource_url="getResourceUrl" @update="updateResource" class="pagination--top"></paginate>

        <div class="button-actions button-actions--top">
            <router-link v-if="isAuthenticated === true && getTopic.type.libType !== 'ANNONCE'" :to="{ name: 'GameTopicReply', params: { id: getTopic.id }}" class="link-as-button">{{ $t('forum.reply.title') }}</router-link>
        </div>

        <message v-for="message in messages" :data-position="message.position" :key="message.id" v-bind:message=message v-bind:readonly="false"></message>

        <div class="button-actions button-actions--bottom">
            <router-link v-if="isAuthenticated === true && getTopic.type.libType !== 'ANNONCE'" :to="{ name: 'GameTopicReply', params: { id: getTopic.id }}" class="link-as-button">{{ $t('forum.reply.title') }}</router-link>
        </div>
        <paginate :resource_url="getResourceUrl" @update="updateResource" class="pagination--bottom"></paginate>
    </div>
</template>

<script>
import Message from '@/components/forum/message/Message.vue';
import Paginate from '@/components/Paginate.vue';
import BreadcrumbsManager from '@/mixins/BreadcrumbManager';
import Security from "@/mixins/Security.vue";

export default {
    mixins: [BreadcrumbsManager, Security],
    name: 'TopicIndex',
    components: {
        'message' : Message,
        'paginate' : Paginate,
    },
    computed: {
        getForum() {
            return this.$parent.$parent.forum;
        },
        getTopic() {
            return this.$parent.topic;
        },
        getResourceUrl() {
            let url = this.resource_url + '&itemsPerPage=' + this.itemsPerPage;
            if (this.$route.query.page !== undefined) {
                url += '&page=' + this.$route.query.page;
            }
            return url;
        }
    },
    data() {
        return {
            messages: [],
            itemsPerPage: 20,
            resource_url : '/api/forum_messages?topic=' + this.$route.params.idTopic,
        };
    },
    methods: {
        updateResource(data){
            this.messages = data
        }
    },
};
</script>
