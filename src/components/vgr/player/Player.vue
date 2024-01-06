<template>
    <span v-if="player.id">
        <avatar v-if="showAvatar" v-bind:player="player" class="mr-3"></avatar>
        <span v-if="player.team" class="mr-1">[{{ player.team.tag }}]</span>
        <router-link :to="{ name: 'PlayerIndex', params: { idPlayer: player.id, slugPlayer: player.slug }}" :title="player.pseudo">{{ player.pseudo }}</router-link>
    </span>
</template>

<script>
    import Avatar from '@/components/vgr/player/Avatar.vue';

    export default {
        name: 'Player',
        components: {
            'avatar': Avatar
        },
        props: {
            'player': {
                type: Object,
                require: true,
            },
            'showAvatar': {
                default: false,
                type: Boolean,
            },
        },
    };
</script>


