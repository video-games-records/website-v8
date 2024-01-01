<template>
    <div>
        <div v-if="isEditable">
            <label>{{ $t('video.filter') }}:</label>
            <input class="form-control" v-model="filters.all.value"/>
        </div>

        <v-table
            :data="videos"
            :filters="filters"
            :currentPage.sync="currentPage"
            :pageSize="20"
            @totalPagesChanged="totalPages = $event"
            class="video-list"
        >
            <thead slot="head">
                <v-th scope="col" sortKey="libVideo">{{ $t('video.label') }}</v-th>
                <v-th v-if="isEditable" scope="col" sortKey="game.name" class="video-list__game">{{ $t('global.game') }}</v-th>
                <v-th v-if="!isEditable" scope="col" sortKey="player.pseudo" class="video-list__player">{{ $t('global.player') }}</v-th>
                <v-th scope="col" sortKey="createdAt" :customSort="dateSort" class="video-list__date">{{ $t('global.createdAt') }}</v-th>
                <v-th v-if="isEditable"  scope="col" class="video-list__action"></v-th>
            </thead>
            <tbody slot="body" slot-scope="{displayData}">
                <tr v-for="row in displayData" :key="row.id">
                    <td>
                        <router-link :to="{ name: 'VideoIndex', params: { idVideo: row.id, slugVideo: row.slug }}">
                            {{ row.libVideo }}
                        </router-link>
                    </td>
                    <td v-if="isEditable" class="video-list__game">
                        {{ row.game.name }}
                    </td>
                    <td v-if="!isEditable" class="video-list__player">
                        {{ row.player.pseudo }}
                    </td>
                    <td class="video-list__date">
                        <date v-bind:date="row.createdAt" v-bind:options="{ year:'numeric', month: 'numeric', day: 'numeric' }"></date>
                    </td>
                    <td v-if="isEditable"><button type="button" class="button-as-link" @click="edit(row)">
                        {{ $t('tag.edit') }}</button>
                    </td>
                </tr>
            </tbody>
        </v-table>

        <smart-pagination
            :currentPage.sync="currentPage"
            :totalPages="totalPages"
        />

        <VDialog v-if="isEditable" v-model="dialog" no-scroll bg-transition="fade">
            <video-form-edit v-bind:video="this.video"> </video-form-edit>
            <button :aria-label="$t('dialog.close')" class="vts-dialog__close" @click="dialog = false">&times;</button>
        </VDialog>
    </div>
</template>

<script>
import Date from '@/components/tools/Date.vue';
import VideoFormEdit from '@/components/vgr/video/form/Edit.vue';

export default {
    name: 'VideoList',
    props: {
        videos: {
            type: Array,
            require: true,
        },
        isEditable: {
            type: Boolean,
            require: false,
            default: false
        },
    },
    components: {
        Date,
        VideoFormEdit
    },
    data() {
        return {
            filters: {
                all: { value: '', keys: ['libVideo', 'game.name'] },
            },
            currentPage: 1,
            totalPages: 0,
            dialog: false,
            video: {
                libVideo: '',
            },
        };
    },
    computed: {

    },
    methods: {
        edit (video) {
            this.video = video;
            this.dialog = true;
        },
        dateSort(a, b) {
            return a.createdAt < b.createdAt;
        }
    },
};
</script>
