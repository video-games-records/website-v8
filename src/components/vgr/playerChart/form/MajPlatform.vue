<template>
    <div class="console-switch">
        <label for="maj-platform">{{ $t('platform.maj') }}</label>
        <select id="maj-platform" v-model="platform">
            <option v-for="(platform) in game.platforms" :data-position="platform.position" :key="platform.id" v-bind:value="platform">{{ platform.libPlatform }}</option>
        </select>
        <button v-on:click="submit">{{ $t('tag.submit') }}</button>
    </div>
</template>

<script>
    import PlayerChartApi from '@/services/api/vgr/PlayerChart'

    export default {
        name: 'MajPlatform',
        props: {
            'game': {
                type: Object,
                require: true,
            },
        },
        data() {
            return {
                platform: null
            };
        },
        methods: {
            submit: function () {
                PlayerChartApi.majPlatform(this.game.id, this.platform.id).then(response => {
                    if (response.status === 200) {
                        alert('ok');
                    }
                })
            }
        },
    };
</script>
