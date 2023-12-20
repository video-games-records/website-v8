<template>
    <div v-if="player.id" class="avatar">
      <v-avatar :image="getAvatarUrl"></v-avatar>
    </div>
</template>

<script>
    export default {
        name: 'Avatar',
        props: ['player'],
        computed: {
            getAvatarUrl() {
                return import.meta.env.VITE_ROOT_API + '/users/' + this.player.id + '/avatar';
            },
        },
    };
</script>


