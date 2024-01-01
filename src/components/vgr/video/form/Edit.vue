<template>
    <div>
        <p>{{ $t('video.update.title') }}</p>

        <form class="vgr-form" @submit="submit" @submit.prevent>
            <div>
                <label for="libVideo">{{ $t('video.label') }}</label>
                <input id="libVideo" v-model="video.libVideo" type="text" :minlength="5" required/>
            </div>

            <div>
                <label for="tag">
                    {{ $t('video.tag') }}
                    <span class="label-help">{{ $t('video.tag_help') }}</span>
                </label>
                <input id="tag" v-model="video.tag" type="text"/>
            </div>

            <div>
                <label for="url">
                    URL
                    <span class="label-help">{{ $t('video.url_help') }}</span>
                </label>
                <input id="url" v-model="video.url" type="text" :maxlength="255" required readonly/>
            </div>

            <div>
                <input type="submit" :value="$t('tag.submit')">
            </div>
        </form>

        <div v-if="isLoading" aria-live="polite" aria-atomic="true">
            <loading></loading>
        </div>
    </div>
</template>

<script>

export default {
    name: 'VideoFormEdit',
    props: ['video'],
    components: {

    },
    data() {
        return {
            tags:['WorldRecord','Fun','Bug']
        };
    },
    computed: {
        isLoading() {
            return this.$store.getters['videoForm/isLoading'];
        },
        hasError() {
            return this.$store.getters['videoForm/hasError'];
        },
        hasSuccess() {
            return this.$store.getters['videoForm/hasSuccess'];
        },
        message() {
            return this.$store.getters['videoForm/message'];
        },
    },
    methods: {
        submit: function () {
            this.$store.dispatch('videoForm/put', this.video).then(() => {
                if (this.hasSuccess) {
                    this.$parent.$parent.dialog = false;
                    this.$store.dispatch('flashMessage/confirm', this.$i18n.t('video.edit.sucess'));
                } else {
                   this.$store.dispatch('flashMessage/error', this.message);
                }
            });
        },
    },
};
</script>
