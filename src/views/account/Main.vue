<template>
    <div>
        <ul class="tabs">
            <li v-if="isRoute('Index')" class="tab__item tab__item--current"><span>{{ $t('account.tabs.account') }}</span></li>
            <li v-else class="tab__item"><router-link :to="{ name: 'AccountIndex' }">{{ $t('account.tabs.account') }}</router-link></li>

            <li v-if="isRoute('Avatar')" class="tab__item tab__item--current"><span>{{ $t('account.tabs.avatar') }}</span></li>
            <li v-else class="tab__item"><router-link :to="{ name: 'AccountAvatar' }">{{ $t('account.tabs.avatar') }}</router-link></li>

            <li v-if="isRoute('Badges')" class="tab__item tab__item--current"><span>{{ $t('account.tabs.badges') }}</span></li>
            <li v-else class="tab__item"><router-link :to="{ name: 'AccountBadges' }">{{ $t('account.tabs.badges') }}</router-link></li>

            <li v-if="isRoute('Team')" class="tab__item tab__item--current"><span>{{ $t('account.tabs.team') }}</span></li>
            <li v-else class="tab__item"><router-link :to="{ name: 'AccountTeam' }">{{ $t('account.tabs.team') }}</router-link></li>

            <li v-if="isRoute('Videos')" class="tab__item tab__item--current"><span>{{ $t('account.tabs.videos') }}</span></li>
            <li v-else class="tab__item"><router-link :to="{ name: 'AccountVideos' }">{{ $t('account.tabs.videos') }}</router-link></li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>

import i18n from "@/i18n";
import BreadcrumbsManager from "@/mixins/BreadcrumbManager";
import Security from "@/mixins/Security.vue";

export default {
    mixins: [BreadcrumbsManager, Security],
    name: 'AccountMain',
    components: {

    },
    data() {
        return {

        };
    },
    computed: {
        getLanguage () {
            return i18n.locale;
        },
    },
    watch : {
        getLanguage() {
            this.loadData();
        },
    },
    created() {
        this.loadData();
    },
    methods: {
        loadData() {
            this.setBreadcrumbOnlyItem1(
                { text: this.$i18n.t('account.index.title')}
            );
        },
        isRoute(name) {
            return this.$route.name.endsWith(name);
        },
    },
};
</script>
