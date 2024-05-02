<template>
  <span v-if="chart.id" style="position:relative">
    <img v-if="chart.isDlc" width="25" src="@/assets/img/dlc.gif" alt="DLC" style="position: absolute;top: 50%;transform: translateY(-50%);"/>
    <span v-if="chart.isDlc" style="margin-left: 22px">&nbsp;</span>
    <span v-if="chart.group">
        <router-link :to="{ name: 'ChartIndex',
        params: {
            idChart: chart.id,
            slugChart: chart.slug,
            idGroup: chart.group.id,
            slugGroup: chart.group.slug,
            idGame: chart.group.game.id,
            slugGame: chart.group.game.slug
        }
        }">{{ chart.group.game.name }} / {{ chart.group.name }} / {{ chart.name }}</router-link>
    </span>
    <span v-else-if="chart.id">
        <router-link :to="{ name: 'ChartIndex', params: { idChart: chart.id, slugChart: chart.slug }}">{{ chart.name }}</router-link>
    </span>
  </span>
</template>

<script>
    export default {
        name: 'Chart',
        props: ['chart'],
    };
</script>

