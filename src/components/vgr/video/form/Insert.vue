<template>
    <div>
        <p>{{ $t('video.insert.info') }}</p>

        <form class="vgr-form" @submit="submit" @submit.prevent>
            <div>
                <label for="libVideo">{{ $t('video.label') }}</label>
                <input id="libVideo" v-model="getVideo.libVideo" type="text" :minlength="5" required/>
            </div>

            <div>
                <label for="tag">{{ $t('video.tag') }}</label>
                <input id="tag" v-model="getVideo.tag" type="text"/>
            </div>

            <div>
                <label for="url">
                    URL
                    <span class="label-help">{{ $t('video.url_help') }}</span>
                </label>
                <input id="url" v-model="getVideo.url" type="text" :maxlength="255" required />
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
        name: 'VideoForm',
        props: ['game'],
        data() {
            return {
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
            getVideo() {
                return this.$store.getters['videoForm/video'];
            },
            message() {
                return this.$store.getters['videoForm/message'];
            },
        },
        methods: {
            submit: function () {
                this.getVideo.game = this.game['@id'];
                this.getVideo.player = this.$store.getters['security/getPlayer']['@id'];
                this.$store.dispatch('videoForm/post', this.getVideo).then(() => {
                    if (this.hasSuccess) {
                        this.$store.dispatch('flashMessage/confirm', this.$i18n.t('video.insert.success'));
                    } else {
                        this.$store.dispatch('flashMessage/error', this.message);
                    }
                });
            },
        },
    };
</script>
