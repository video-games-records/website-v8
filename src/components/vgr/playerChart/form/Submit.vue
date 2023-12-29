<template>
    <fieldset class="submit-score">
        <legend v-if="displayGroupName">{{ chart.group.name }}</legend>
        <legend v-if="displayChartName">{{ chart.name }}</legend>

        <div class="submit-score__line">
            <div v-for="(lib, z) in chart.libs" :data-position="lib.position" :key="lib.id" class="submit-score__fields">
                <label :for="lib.idLibChart">{{ lib.name }}</label>
                <div v-for="(part, index) in lib.type.parseMask" :data-position="part.position" :key="part.id">
                    <input v-if="isInitialized" v-model="chart.playerCharts[0].libs[z].parseValue[index].value" type="text" :maxlength="part['size']" :readonly="isReadOnly" @change="change" />
                    <span class="submit-score__suffix">{{ part['suffixe'] }}</span>
                </div>
            </div>

            <div class="submit-score__platform">
                <label :for="chart.id">Platform</label>
                <select v-if="isReadOnly === false" v-model="chart.playerCharts[0].platform" :id="chart.id" @change="change">
                    <option v-for="(platform) in game.platforms" :data-position="platform.position" :key="platform.id" v-bind:value="platform['@id']">{{ platform.libPlatform }}</option>
                </select>
            </div>
        </div>

        <div v-if="showProofForm">
            <proof-form />
        </div>

    </fieldset>
</template>

<script>

import PlayerChartApi from '@/services/api/vgr/PlayerChart'
import ProofForm from "@/components/vgr/playerChart/form/Proof";

export default {
    name: 'PlayerChartSubmit',
    components: {
        ProofForm
    },
    props: {
        'game': {
            type: Object,
            require: true,
        },
        'chart': {
            type: Object,
            require: true,
        },
        'displayGroupName': {
            default: false,
            type: Boolean,
        },
        'displayChartName': {
            default: true,
            type: Boolean,
        },
    },
    data() {
        return {
            isModified: false,
            isCreated: false,
        };
    },
    computed: {
        isInitialized () {
            return !!this.notEmptyObject(this.chart);
        },
        isReadOnly () {
            if ((this.isInitialized) && (this.chart.playerCharts[0].status != null)) {
                return !((this.chart.playerCharts[0].status.id === 1) || (this.chart.playerCharts[0].status.id === 6));
            }
            return false;
        },
        isNull () {
            let bool = true;
            this.chart.playerCharts[0].libs.forEach(function(lib){
                lib.parseValue.forEach(function(element){
                    if (element.value !== '') {
                        bool = false;
                    }
                });
            });
            return bool;
        },
        showProofForm() {
            return this.$route.name === 'ChartSubmit' && this.isCreated;
        }
    },
    methods: {
        change(){
            if (this.isModified ===  false) {
                this.$store.dispatch('playerChartSubmit/addChartToUpdate');
                this.isModified = true;
            }
        },
        notEmptyObject(someObject){
            return Object.keys(someObject).length
        },
        isNew: function() {
            return this.chart.playerCharts[0].id === -1;
        },
        submit: async function () {
            if (this.isModified) {
                // Replace libchart Object with URL
                let playerChart = JSON.parse(JSON.stringify(this.chart.playerCharts[0]));
                playerChart.libs.forEach(function(element) {
                    element.libChart = element.libChart['@id'];
                });
                if (this.isNull === false) {
                    if (this.isNew()) {
                        delete playerChart.id;
                        delete playerChart['@id'];
                        playerChart.libs.forEach(function (element) {
                            delete element.id;
                            element.value = '0';
                            delete element['@id'];
                        });
                        await PlayerChartApi.post(playerChart)
                        .then(response => {
                            this.chart.playerCharts[0] = response.data;
                            this.$store.dispatch('navigation/setPlayerChart', response.data);
                            this.$store.dispatch('playerChartSubmit/addChartUpdated');
                            this.isCreated = true;
                            return response.data;
                        })
                        .catch(error => {
                            if (error.response.status === 400) {
                                alert(error.response.data['hydra:description']);
                            }
                        });
                    } else {
                        await PlayerChartApi.put(playerChart).then(response => {
                            if (response.status === 200) {
                                this.chart.playerCharts[0] = response.data;
                                this.$store.dispatch('playerChartSubmit/addChartUpdated')
                                return response.data;
                            }
                        });
                    }
                }
            }
        },
    },
};
</script>
