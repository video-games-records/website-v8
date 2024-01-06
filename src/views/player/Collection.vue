<template>
    <div>
        <div v-html="getCollection"></div>
    </div>
</template>

<script>
    export default {
        name: 'PlayerPresentation',
        components: {

        },
        data() {
            return {

            };
        },
        computed: {
            getCollection() {
                return this.$parent.player.collection;
            },
        }
    };
</script>
