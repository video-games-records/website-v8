<template>
    <div>
        <message-list
            v-bind:id-player="this.$route.params.idPlayer"
        ></message-list>
    </div>
</template>

<script>

import MessageList from '@/components/forum/message/List';

export default {
    name: 'PlayerMessages',
    components: {
        MessageList,
    },
    data() {
        return {

        };
    },
};
</script>
