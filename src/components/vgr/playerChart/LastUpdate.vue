<template>
    <div v-if="tooltip" class="tooltip tooltip--top-right">
        <button type="button" class="button-as-link">
            <svg width="16" height="16" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
                <use xlink:href="#calendar" />
            </svg>
            <span class="screen-reader-text">{{ $t('score.lastUpdate') }}</span>
        </button>
        <div role="tooltip"><time :datetime="getTimestamp">{{ getDate }}</time></div>
    </div>
    <span v-else>{{ getDate }}</span>
</template>

<script>
export default {
    name: 'LastUpdate',
    props: {
        'playerChart': {
            type: Object,
            require: true,
        },
        'tooltip': {
            type: Boolean,
            require: false,
            default: true,
        }
    },
    data() {
        return {
            options: { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
        };
    },
    computed: {
        getLanguage () {
            return this.$store.getters['language/getLanguage'];
        },
        getDate() {
            let date = new Date(this.playerChart.lastUpdate);
            return date.toLocaleDateString(this.getLanguage, this.options);
        },
        getTimestamp() {
            let date = new Date(this.playerChart.lastUpdate);
            return date.toISOString();
        }
    },
};
</script>
