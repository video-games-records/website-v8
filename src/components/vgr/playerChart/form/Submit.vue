<template>
  <fieldset class="pa-0">
    <legend>
      <span v-if="displayGroupName">{{ chart.group.name }} - </span>
      <span v-if="displayChartName">{{ chart.name }}</span>
    </legend>

    <v-row>
      <v-col cols="12" :md="displayPlatform ? 6 : 12">
        <div v-for="(lib, z) in chart.libs" :data-position="lib.position" :key="lib.id" class="d-flex">
            <v-text-field v-for="(part, index) in lib.type.parseMask" :data-position="part.position" :key="part.id"
                          v-if="isInitialized" :label="lib.name" :readonly="isReadOnly"
                          v-model="chart.playerCharts[0].libs[z].parseValue[index].value"
                          :suffix="part['suffixe']" @update:modelValue="change"
                          class="d-inline" />
        </div>

      </v-col>
      <v-col v-if="displayPlatform" cols="12" md="6">
        <v-select
            label="Platform"
            :items="game.platforms"
            item-title="libPlatform"
            item-value="@id"
            v-if="isReadOnly === false"
            v-model="chart.playerCharts[0].platform"
            @update:modelValue="change"
        >
        </v-select>
      </v-col>
    </v-row>

    <!--<div v-if="showProofForm">
      <proof-form/>
    </div>-->

  </fieldset>
</template>

<script>

//import ProofForm from "@/components/vgr/playerChart/form/Proof";
import {useAppStore} from "@/store/app";
import {useScoreSubmitStore} from "@/store/score/submit";

export default {
  name: 'PlayerChartSubmit',
  //components: {ProofForm},
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
    'displayPlatform': {
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
    isInitialized() {
      return !!this.notEmptyObject(this.chart);
    },
    isReadOnly() {
      if ((this.isInitialized) && (this.chart.playerCharts[0].status != null)) {
        return !((this.chart.playerCharts[0].status.id === 1) || (this.chart.playerCharts[0].status.id === 6));
      }
      return false;
    },
    isNull() {
      let bool = true;
      this.chart.playerCharts[0].libs.forEach(function (lib) {
        lib.parseValue.forEach(function (element) {
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
    change() {
      if (this.isModified === false) {
        useScoreSubmitStore().addChartToUpdate();
        this.isModified = true;
      }
    },
    notEmptyObject(someObject) {
      return Object.keys(someObject).length
    },
    isNew: function () {
      return this.chart.playerCharts[0].id === -1;
    },
    submit: async function () {
      if (this.isModified) {
        // Replace libchart Object with URL
        let playerChart = JSON.parse(JSON.stringify(this.chart.playerCharts[0]));
        playerChart.libs.forEach(function (element) {
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
            await this.axios.post('/api/player_charts', playerChart)
                .then(response => {
                  this.chart.playerCharts[0] = response.data;
                  useAppStore().setPlayerChart(response.data);
                  useScoreSubmitStore().addChartUpdated();
                  this.isCreated = true;
                  return response.data;
                })
          } else {
            await this.axios.put('/api/player_charts/' + playerChart.id, playerChart)
                .then(response => {
                  this.chart.playerCharts[0] = response.data;
                  useScoreSubmitStore().addChartUpdated();
                  return response.data;
            });
          }
        }
      }
    },
  },
};
</script>

<style scoped>
fieldset {
  margin: 2rem 0;
  border: none;

  > legend {
    //margin-bottom: 1rem;
    font-weight: bold;
  }
}
</style>
