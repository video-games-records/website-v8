<template>
    <div>
        <div v-if="isLoading" aria-live="polite" aria-atomic="true">
            <loading></loading>
        </div>

        <div v-if="showForm" class="container">
            <image-uploader
                :debug="1"
                :maxWidth="1920"
                :maxHeight="1080"
                :quality="0.9"
                :autoRotate=false
                outputFormat="verbose"
                :preview=true
                :className="['fileinput', { 'fileinput--loaded' : hasImage }]"
                :capture="false"
                accept="image/png,image/jpeg"
                @input="setImage"
                @onUpload="startImageResize"
                @onComplete="endImageResize"
            ></image-uploader>

            <button :disabled="!hasImage" v-on:click="submitFile()">{{ $t('tag.submit') }}</button>
        </div>
    </div>
</template>

<script>
    import PlayerChartApi from '@/services/api/vgr/PlayerChart';
    import ImageUploader from 'vue-image-upload-resize';

    export default {
        name: 'PlayerChartPictureForm',
        components: {
            ImageUploader
        },
        props: {
            'playerChart': {
                type: Object,
                require: true,
            },
        },
        data() {
            return {
                isLoading: false,
                showForm: true,
                hasSuccess:false,
                hasError: false,
                error: null,
                file: {},
                hasImage: false,
            };
        },
        computed: {
        },
        methods: {
            startImageResize() {

            },
            endImageResize() {

            },
            setImage(file) {
                this.hasImage = true;
                this.file = file;
            },
            submitFile(){
                this.loading = true;
                PlayerChartApi.proveWithPicture(this.playerChart.id, this.file.dataUrl).then(response => {
                    this.loading = false;
                    if (response.status === 200) {
                        this.showForm = false;
                        this.hasSuccess = true;
                        this.$parent.maj();
                        this.$store.dispatch('flashMessage/confirm', this.$i18n.t('proof.form.success'));
                    }
                })
                .catch(error => {
                    this.loading = false;
                    this.hasError = true;
                    if (error.response.status === 401) {
                        this.error = error.response.data['hydra:description'];
                        this.$store.dispatch('flashMessage/confirm', this.error);
                    }
                });
            },
        },
    };
</script>
