<template>
    <div>
        <vue-headful :title="title" :description="description" />
        <h1>{{ $t('score.player', [getPlayerChart.player.pseudo]) }}</h1>

        <dl>
            <dt v-for="lib in getChart.libs" :data-position="lib.position" :key="lib.id">{{ lib.name }}</dt>
            <dd v-for="lib in getPlayerChart.libs" :data-position="lib.position" :key="lib.id">{{ lib.formatValue }}</dd>
            <dt>{{ $t('score.lastUpdate') }}</dt>
            <dd><last-update v-bind:player-chart=getPlayerChart v-bind:tooltip=false></last-update></dd>

            <dt>{{ $t('global.status') }}</dt>
            <dd>{{ getPlayerChart.status.name}}</dd>
            <dt v-if="getPlayerChart.dateInvestigation">{{ $t('score.dateInvestigation') }}</dt>
            <dd v-if="getPlayerChart.dateInvestigation"><date v-bind:date="getPlayerChart.dateInvestigation"></date> </dd>
        </dl>

        <proof-form />

        <div v-if="showRequestForm" class="proof-request">
            <div v-if="this.canAskProof">
                <p>
                    {{ $t('score.notProoved', [getPlayerChart.player.pseudo]) }}<br />
                    {{ $t('proof.ask') }}
                </p>
                <form @submit="submitRequest" @submit.prevent class="vgr-form">
                    <div>
                        <label for="ask-for-proof">{{ $t('proof.request.justify') }}</label>
                        <textarea v-model="request.message" id="ask-for-proof" required></textarea>
                    </div>

                    <div>
                        <input type="submit" :value="$t('tag.submit')">
                    </div>
                </form>
            </div>
            <div v-else>{{ $t('proof.request.reachLimit') }}</div>
        </div>
    </div>
</template>

<script>
import ProofRequestApi from '@/services/api/vgr/ProofRequest';
import ProofForm from "@/components/vgr/playerChart/form/Proof";
import PlayerChartApi from '@/services/api/vgr/PlayerChart';
import PlayerApi from '@/services/api/vgr/Player';
import BreadcrumbsManager from '@/mixins/BreadcrumbManager';
import ProofApi from "@/services/api/vgr/Proof";
import LastUpdate from '@/components/vgr/playerChart/LastUpdate';
import Date from '@/components/tools/Date.vue';
import Security from "@/mixins/Security.vue";

export default {
    mixins: [BreadcrumbsManager, Security],
    name: 'PayerChartIndex',
    components: {
        'proof-form' : ProofForm,
        'last-update': LastUpdate,
        'date': Date,
    },
    data() {
        return {
            request: {
                playerChart: '',
                playerRequesting: '',
                message: ''
            },
            canAskProof: true,
        };
    },
    computed: {
        title() {
            return this.getPlayerChart.player.pseudo + ' - ' + this.getChart.name + ' - ' + this.getGroup.name + ' - ' + this.getGame.name + ' - ' + process.env.VUE_APP_TITLE;
        },
        description() {
            return this.$i18n.t(
                'score.index.description',
                [
                    this.getPlayerChart.player.pseudo,
                    this.getGame.name + ' ' + this.$store.getters['navigation/gamePlatformList'] + ' / ' + this.getGroup.name + ' / ' + this.getChart.name
                ]
            );
        },
        getGame() {
            return this.$store.getters['navigation/game'];
        },
        getGroup() {
            return this.$store.getters['navigation/group'];
        },
        getChart() {
            return this.$store.getters['navigation/chart'];
        },
        getPlayerChart() {
            return this.$store.getters['navigation/playerChart'];
        },
        showRequestForm() {
            return (
                (this.getPlayerChart.status.id === 1)
                && this.hasRolePlayer
                && (this.$store.getters['security/getPlayer']['id'] !== this.getPlayerChart.player.id)
            );
        },
    },
    methods: {
        submitRequest: function () {
            this.request.playerChart = this.getPlayerChart['@id'];
            this.request.playerRequesting = this.$store.getters['security/getPlayer']['@id'];
            ProofRequestApi.post(this.request).then(response => {
                if (response.status === 201) {
                    this.majCanAskProof();
                    PlayerChartApi.getPlayerChart(this.$route.params.idPc)
                        .then(playerChart => {
                            this.$store.dispatch('navigation/setPlayerChart', playerChart);
                        });
                }
            }).catch(error => {
                if (error.response.status === 400) {
                    alert(error.response.data['hydra:description']);
                }
            });
        },
        close () {
            if (confirm(this.$i18n.t('proof.delete.confirm'))) {
                let proof = this.getPlayerChart.proof;
                proof.status = 'CLOSED';
                ProofApi.put(proof).then(response => {
                    if (response.status === 200) {
                        PlayerChartApi.getPlayerChart(this.$route.params.idPc)
                            .then(playerChart => {
                                this.$store.dispatch('navigation/setPlayerChart', playerChart);
                            });
                    }
                });
            }
        },
        majCanAskProof: function () {
            PlayerApi.canAskProof(this.$store.getters['security/getPlayer']['id'])
            .then((response) => {
                this.canAskProof = response.data;
            });
        },
    },
    created() {
        this.majCanAskProof();
    },
};
</script>
