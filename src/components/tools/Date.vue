<template>
    <time v-if="date" :datetime="dateTimeFormat(date)">{{ dateFormat(date) }}</time>
</template>

<script>
    export default {
        name: 'date',
        props: {
            date: {
                required: true
            },
            options: {
                type: Object,
                required: false,
                default () {
                    return { year: 'numeric', month: 'numeric', day: 'numeric' }
                }
            }
        },
        data() {
            return {
            };
        },
        computed: {
            getLanguage () {
                return this.$store.getters['language/getLanguage'];
            },
        },
        methods: {
            dateFormat(string) {
                let date = new Date(string);
                return date.toLocaleDateString(this.getLanguage, this.options);
            },
            dateTimeFormat(string) {
                let date = new Date(string);
                return date.toISOString();
            }
        },
    };
</script>
