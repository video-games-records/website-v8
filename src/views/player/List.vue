<template>
    <div>
        <vue-headful :title="title" :description="description" />

        <h1>{{ $t('player.list.title') }}</h1>

        <table class="members-list">
            <caption class="screen-reader-text">{{ $t('player.list.caption') }}</caption>
            <thead>
                <tr>
                    <th scope="col" class="members-list__position">
                        <abbr :title="$t('player.position')">#</abbr>
                    </th>
                    <th scope="col" class="members-list__pseudo">
                        <button class="table-order" @click="orderBy('pseudo')">{{ $t('player.pseudo') }}</button>
                    </th>
                    <th scope="col" class="members-list__country">
                        {{ $t('player.country') }}
                    </th>
                    <th scope="col" class="members-list__registration">
                        <button class="table-order" @click="orderBy('createdAt')">{{ $t('global.createdAt') }}</button>
                    </th>
                    <th scope="col" class="members-list__connections">
                        <button class="table-order" @click="orderBy('nbConnexion')">{{ $t('player.nbConnexion') }}</button>
                    </th>
                    <th scope="col" class="members-list__last">
                        <button class="table-order" @click="orderBy('lastLogin')">{{ $t('player.lastLogin') }}</button>
                    </th>
                    <th scope="col" class="members-list__charts">
                        <button class="table-order" @click="orderBy('nbChart')">{{ $t('global.charts') }}</button>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(player, index) in players" :data-position="player.position" :key="player.id">
                    <td class="members-list__position">
                        {{ itemsPerPage * (getPage-1)  + index + 1 | number }}
                    </td>
                    <td class="members-list__pseudo">
                        <player v-bind:player="player" />
                        <span v-if="player.status.name !== $t('player.status.member')">
                            (<em>{{ player.status.name }}</em>)
                        </span>
                    </td>
                    <td class="members-list__country" :data-header="$t('player.country')">
                        <country v-bind:country="player.country"></country>
                        <span v-if="player.country">{{ player.country.name }}</span>
                    </td>
                    <td class="members-list__registration" :data-header="$t('player.createdAt')">
                        <date v-bind:date="player.createdAt" v-bind:options="{ month: 'long', day: 'numeric', year: 'numeric' }"></date>
                    </td>
                    <td class="members-list__connections" :data-header="$t('player.nbConnexion')">
                        {{ player.nbConnexion | number }}
                    </td>
                    <td class="members-list__last" :data-header="$t('player.lastLogin')">
                        <date v-bind:date="player.lastLogin" v-bind:options="{ month: 'long', day: 'numeric', year: 'numeric' }"></date>
                    </td>
                    <td class="members-list__last" :data-header="$t('global.charts')">
                        {{ player.nbChart | number }}
                    </td>
                </tr>
            </tbody>
            
        </table>
        <paginate ref="paginate" :resource_url="getResourceUrl" @update="updateResource" class="pagination--bottom"></paginate>
    </div>
</template>

<script>
import BreadcrumbsManager from '@/mixins/BreadcrumbManager';
import Paginate from '@/components/Paginate.vue';
import Date from '@/components/tools/Date.vue';
import Player from '@/components/vgr/player/Player';
import Country from "@/components/country/Country";
import i18n from "@/i18n";

export default {
    mixins: [BreadcrumbsManager],
    name: 'PlayerList',
    components: {
        Player,
        Country,
        'paginate' : Paginate,
        'date': Date,
    },
    data() {
        return {
            players: [],
            itemsPerPage: 20,
            resource_url : '/api/players',
            order: {
                column: 'user.createdAt',
                direction: 'DESC',
            }
        };
    },
    computed: {
        title() {
            return this.$i18n.t('player.list.title') + ' - ' + process.env.VUE_APP_TITLE;
        },
        description() {
            return this.$i18n.t('player.list.description');
        },
        getPage() {
            return this.$refs.paginate.current_page;
        },
        getLanguage () {
            return i18n.locale;
        },
        getResourceUrl() {
            let url = this.resource_url + '?itemsPerPage=' + this.itemsPerPage;
            // Add filter
            url += '&user.enabled=1';
            // Add group player + team
            url += '&groups[]=player.read&groups[]=player.pointChart&groups[]=player.medal'
            // Add group team
            url += '&groups[]=player.team&groups[]=team.read.mini';
            // Add group country
            url += '&groups[]=player.country&groups[]=country.read';
            // Add group user
            url += '&groups[]=player.status&groups[]=player.status.read';
            // Add order by
            url += '&order[' + this.order.column + ']=' + this.order.direction;
            return url;
        }
    },
    watch : {
        getLanguage() {
            this.setBreadcrumb();
        },
    },
    created() {
        this.setBreadcrumb();
    },
    methods: {
        setBreadcrumb() {
            this.setBreadcrumbOnlyItem1(
                { text: this.$i18n.t('player.list.title') }
            );
        },
        updateResource(data){
            this.players = data
        },
        orderBy(column) {
            if (column !== this.order.column) {
                this.order.column = column;
            } else if (this.order.direction === 'ASC') {
                this.order.direction = 'DESC';
            } else {
                this.order.direction = 'ASC';
            }
        }
    },
};
</script>
