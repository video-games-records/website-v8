<template>
    <div>
        <h3>{{ $t('article.comment.add') }}</h3>

        <form id="app" @submit="submit" @submit.prevent>
            <ckeditor :editor="editor" v-model="comment.text" :config="editorConfig" minlength="4" required></ckeditor>

            <div>
                <input type="submit" :value="$t('tag.submit')" />
            </div>
        </form>

        <div v-if="error != null" class="row col">
            <div class="alert alert-danger">
                {{ error }}
            </div>
        </div>
    </div>
</template>

<script>
    import NormandieEditor from 'ckeditor5-build-normandie';
    import 'ckeditor5-build-normandie/build/translations/fr';
    import CommentApi from "@/services/api/vgr/VideoComment";

    export default {
        name: 'CommentForm',
        components: {

        },
        props: {
            video: {
                type: Object,
                require: true,
            },
        },
        data() {
            return {
                comment: {
                    text: '',
                },
                error: null,
                editor: NormandieEditor,
                editorData: '',
                editorConfig: {
                    toolbar: {
                        items: [
                            'heading',
                            'bold',
                            'italic',
                            'strikethrough',
                            '|',
                            'bulletedList',
                            'numberedList',
                            'blockQuote',
                            '|',
                            'link',
                            'specialCharacters',
                            '|',
                            'removeFormat',
                            'undo',
                            'redo',
                        ]
                    },
                    image: {
                        toolbar: [
                            'imageTextAlternative',
                            'linkImage'
                        ]
                    },
                    language: this.$i18n.locale,
                }
            };
        },
        created() {

        },
        methods: {
            submit: function () {
                this.comment.video = this.video['@id'];
                this.error = null;
                if (this.comment.text !== '') {
                    CommentApi.post(this.comment)
                        .then(response => {
                            if (response.status === 201) {
                                this.comment.text = '';
                                this.$parent.loadComments();
                            }
                        })
                        .catch(error => {
                            this.error = this.$i18n.t('error');
                            if (error.response.status === 400) {
                                this.error = error.response.data['hydra:description'];
                            }
                        });
                } else {
                    this.error = this.$i18n.t('error');
                }
            },
        },
    };
</script>
