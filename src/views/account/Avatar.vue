<template>
    <div class="vgr-form">
        <h1 class="screen-reader-text">{{ $t('title') }}</h1>
        <vue-headful :title="title" :description="description" />
        <div>
            <label for="fileInput">{{ $t('avatar.choose') }}</label>
            <image-uploader
                :debug="1"
                :maxWidth="100"
                :maxHeight="100"
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
        </div>

        <div>
            <button :disabled="!hasImage" v-on:click="submitFile()">{{ $t('avatar.submit') }}</button>
        </div>

        <div v-if="hasMessage" role="alert">
            {{ message }}
        </div>
    </div>
</template>

<script>
import ImageUploader from 'vue-image-upload-resize';
import UserApi from '@/services/api/user/User';

export default {
    name: 'AccountAvatar',
    components: {
        ImageUploader
    },
    data() {
        return {
            file: {},
            apiResult: null,
            message: null,
            hasImage: false,
        };
    },
    computed: {
        title() {
            return this.$i18n.t('account.avatar.title')+ ' - ' + process.env.VUE_APP_TITLE;
        },
        description() {
            return this.$i18n.t('account.avatar.description');
        },
        hasMessage () {
            return this.message != null;
        },
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
            UserApi.updloadAvatar(this.file.dataUrl).then(response => {
                if (response.status === 200) {
                    this.apiResult = response.data.success;
                    this.message = response.data.message;
                } else {
                    this.apiResult = false;
                    this.message = 'ERROR';
                }
            });
        },
    },
};
</script>
