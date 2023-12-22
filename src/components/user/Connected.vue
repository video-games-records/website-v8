<template>
    <div>
        <footer class="connected-users">
            <div class="connected-users__title">{{ $t('user.connected', [this.nbUser.toLocaleString(this.$i18n.locale)]) }}</div>
            <VAsync :await="users">
                <template #pending>
                    <loading></loading>
                </template>
                <template #resolved="users">
                    <ul class="connected-users__list">
                        <li v-for="user in users['hydra:member']" :data-position="user.position" :key="user.id"><user v-bind:user="user"></user></li>
                    </ul>
                </template>
            </VAsync>
        </footer>
    </div>
</template>

<script>

import UserApi from '@/services/api/user/User';
import User from '@/components/user/User';

export default {
    name: 'UserConnected',
    components: {
        'user' : User,
    },
    data() {
        return {
            users: null,
            nbUser: 0,
            data: [],
        };
    },
    computed: {
        getUserRecordConnexionDate() {
            return this.data[0].value;
        },
        getUserRecordConnexionNb() {
            return this.data[1].value;
        },
        getNow: function() {
            function pad(s) { return (s < 10) ? '0' + s : s; }
            let d = new Date();
            return [d.getFullYear(), pad(d.getMonth()+1), pad(d.getDate())].join('-');
        }
    },
    created() {
        if (this.$store.getters['data/isLoaded'] === false) {
            this.$store.dispatch('data/load');
        }
        // User list
        this.users = UserApi.getList({
            query :{
                'pagination': false,
                'lastLogin[after]': this.getNow,
                'groups': ['user.read.mini']
            },
            cache : {useCache: true}
        })
            .then((response) => {
                this.nbUser = response['hydra:totalItems'];
                return response;
            });
    },
};
</script>