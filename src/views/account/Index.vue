<template>
    <div>
        <vue-headful :title="title" :description="description" />
        <h1 class="screen-reader-text">{{ $t('account.index.title') }}</h1>

        <form class="vgr-form" @submit="submit" @submit.prevent>
            <div>
                <label for="username">{{ $t('user.username') }}</label>
                <input id="username" v-model="getUser.username" type="text" readonly="readonly" />
            </div>

            <div>
                <label for="birthDay">{{ $t('player.birthDay') }}</label>
                <datepicker id="birthDay" v-model="getPlayer.birthDate"></datepicker>
            </div>

            <div>
                <label for="gender">{{ $t('player.gender') }}</label>
                <select id="gender" v-model="getPlayer.gender">
                    <option value="I">{{ $t('gender.unknown') }}</option>
                    <option value="H">{{ $t('gender.male') }}</option>
                    <option value="F">{{ $t('gender.female') }}</option>
                </select>
            </div>

            <div>
                <label for="displayPersonalInfos">{{ $t('player.displayPersonalInfos') }}</label>
                <select id="displayPersonalInfos" v-model="getPlayer.displayPersonalInfos">
                    <option :value="true">{{ $t('global.yes') }}</option>
                    <option :value="false">{{ $t('global.no') }}</option>
                </select>
            </div>

            <div>
                <label for="country">{{ $t('player.country') }}</label>
                <select id="country" v-model="getPlayer.country">
                    <option disabled value="">{{ $t('player.countryChoice') }}</option>
                    <option v-for="(country) in countries" :data-position="country.position" :key="country.id" v-bind:value="country['@id']">{{ country.name }}</option>
                </select>
            </div>

            <div>
                <label for="language">{{ $t('user.language') }}</label>
                <select id="language" v-model="getUser.locale">
                    <option value="en">{{ $t('language.english') }}</option>
                    <option value="fr">{{ $t('language.french') }}</option>
                </select>
            </div>

            <div>
                <label for="personalWebSite">{{ $t('player.website') }}</label>
                <input id="personalWebSite" v-model="getPlayer.website" type="text" :maxlength="255" />
            </div>

            <div>
                <label for="youtube">{{ $t('player.youtube') }}</label>
                <input id="youtube" v-model="getPlayer.youtube" type="text" :maxlength="255" />
            </div>

            <div>
                <label for="twitch">{{ $t('player.twitch') }}</label>
                <input id="twitch" v-model="getPlayer.twitch" type="text" :maxlength="255" />
            </div>

            <div>
                <label for="presentation">{{ $t('player.presentation') }}</label>
                <ckeditor id="presentation" :editor="editor" v-model="getPlayer.presentation" :config="editorConfig"></ckeditor>
            </div>

            <div>
                <label for="collection">{{ $t('player.collection') }}</label>
                <ckeditor id="collection" :editor="editor" v-model="getPlayer.collection" :config="editorConfig"></ckeditor>
            </div>

            <div>
                <input type="submit" :value="$t('tag.submit')" />
                <button v-on:click="cancel">{{ $t('tag.cancel') }}</button>
            </div>
        </form>

        <div v-if="isLoading" aria-live="polite" aria-atomic="true">
            <loading></loading>
        </div>
    </div>
</template>

<script>
import UserApi from '@/services/api/user/User';
import PlayerApi from "@/services/api/vgr/Player";
import CountryApi from '@/services/api/country/Country';
import Datepicker from 'vuejs-datepicker';
import NormandieEditor from 'ckeditor5-build-normandie';
import 'ckeditor5-build-normandie/build/translations/fr';
import ApiService from "@/services/api.service";

export default {
    name: 'AccountIndex',
    props: [],
    components: {
        Datepicker,
    },
    data() {
        return {
            countries: [],
            success: false,
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
                        'insertImage',
                        'specialCharacters',
                        'mediaEmbed',
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
                height: 100,
                language: this.$i18n.locale,
            }
        };
    },
    created () {
        CountryApi.getAll()
            .then(items => {
                this.countries = items
            });
    },
    updated() {
        if (this.isInitialized === false) {
            this.init();
        }
    },
    computed: {
        title() {
            return this.$i18n.t('account.index.title') + ' - ' + process.env.VUE_APP_TITLE;
        },
        description() {
            return this.$i18n.t('account.index.description');
        },
        isInitialized() {
            return this.$store.getters['UserAccount/isInitialized'];
        },
        isLoading() {
            return this.$store.getters['UserAccount/isLoading'];
        },
        hasError() {
            return this.$store.getters['UserAccount/hasError'];
        },
        hasSuccess() {
            return this.$store.getters['UserAccount/hasSuccess'];
        },
        getUser() {
            return this.$store.getters['UserAccount/user'];
        },
        getPlayer() {
            return this.$store.getters['UserAccount/player'];
        },
    },
    methods: {
        init: async function () {
            let promises = [];
            promises.push(await UserApi.getUser(this.$store.getters['security/getUser'].id)
                .then(user => {
                    this.$store.dispatch('UserAccount/setUser', user);
                })
            );
            promises.push(await PlayerApi.getPlayer(this.$store.getters['security/getPlayer'].id, {
                    query :{
                        'groups': ['player.read', 'player.country'],
                    }
                })
                    .then(player => {
                        this.$store.dispatch('UserAccount/setPlayer', player);
                    })
            );
            ApiService.all(promises).then(() => {
                this.$store.dispatch('UserAccount/init');
            });
        },
        submit: function () {
            let payload = {
                user: this.getUser,
                player: this.getPlayer,
            }
            this.$store.dispatch('UserAccount/update', payload).then(() => {
                this.$store.dispatch('flashMessage/confirm', this.$i18n.t('tag.success'));
            });
        },
        cancel: function () {
            this.$store.dispatch('UserAccount/cancel');
            this.$forceUpdate();
        },
    },
};
</script>
