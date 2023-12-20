<template>
    <span v-if="country" :class="'fflag ff-sm fflag-' + country.codeIso2" :title="country.name">
        <span class="screen-reader-text">{{ country.name }}</span>
    </span>
</template>

<script>
    export default {
        name: 'Country',
        props: {
            'country': {
                type: Object,
                require: true,
            },
        }
    };
</script>

