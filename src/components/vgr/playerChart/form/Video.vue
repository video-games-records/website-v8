<template>
    <div>
        <div v-if="isLoading" aria-live="polite" aria-atomic="true">
            <loading></loading>
        </div>

        <div v-if="showForm" class="container">
            <form class="vgr-form" @submit="submit" @submit.prevent>
                <div>
                    <label for="video-url">
                        URL
                        <span class="label-help">Exemple : https://youtu.be/iNSuKo8C5uk</span>
                    </label>
                    <input type="text" id="video-url" v-model="url" required="required">
                </div>
                <div>
                    <input type="submit" :value="$t('tag.submit')" />
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import PlayerChartApi from '@/services/api/vgr/PlayerChart';

    export default {
        name: 'PlayerChartVideoForm',
        components: {

        },
        props: {
            'playerChart': {
                type: Object,
                require: true,
            },
        },
        data() {
            return {
                url: '',
                isLoading: false,
                showForm: true,
            };
        },
        methods: {
            submit(){
                this.loading = true;
                this.success = null;
                PlayerChartApi.proveWithVideo(this.playerChart.id, this.url).then(response => {
                    this.loading = false;
                    if (response.status === 201) {
                        this.showForm = false;
                        this.$parent.maj();
                        this.$store.dispatch('flashMessage/confirm', this.$i18n.t('proof.form.success'));
                     } else {
                        this.success = false;
                        this.$store.dispatch('flashMessage/error', response.data['hydra:description']);
                    }
                })
                .catch(error => {
                    this.loading = false;
                    this.$store.dispatch('flashMessage/error', error.response.data['hydra:description']);
                });
            },
        },
    };
</script>
