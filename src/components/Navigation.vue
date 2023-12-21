<template>
  <v-list v-model:opened="open">
    <v-list-item title="My Application" subtitle="Vuetify"></v-list-item>
    <v-divider></v-divider>
    <v-list-group value="Rankings">
    <template v-slot:activator="{ props }">
      <v-list-item
          v-bind="props"
          prepend-icon="mdi-medal"
          :title="$t('menu.rankings')"
      ></v-list-item>
    </template>
    <v-list-item :to="{ name: 'LeaderboardPointGame'}" :title="$t('menu.ranking.pointGame')"></v-list-item>
    <v-list-item :to="{ name: 'LeaderboardCup'}" :title="$t('menu.ranking.cups')"></v-list-item>
    <v-list-item :to="{ name: 'LeaderboardPointChart'}" :title="$t('menu.ranking.pointChart')"></v-list-item>
    <v-list-item :to="{ name: 'LeaderboardMedal'}" :title="$t('menu.ranking.medals')"></v-list-item>
    <v-list-item :to="{ name: 'LeaderboardBadge'}" :title="$t('menu.ranking.badge')"></v-list-item>
    <v-list-item :to="{ name: 'LeaderboardProof'}" :title="$t('menu.ranking.proof')"></v-list-item>
    </v-list-group>

    <v-list-group value="TheSite">
    <template v-slot:activator="{ props }">
      <v-list-item
          v-bind="props"
          prepend-icon="mdi-information"
          :title="$t('menu.site')"
      ></v-list-item>
    </template>
    <v-list-item :to="{ name: 'Rules'}" :title="$t('menu.rules')"></v-list-item>
    <v-list-item :to="{ name: 'Faq'}" :title="$t('menu.faq')"></v-list-item>
    <v-list-item :to="{ name: 'Credits'}" :title="$t('menu.credits')"></v-list-item>
    <v-list-item :to="{ name: 'Donations'}" :title="$t('menu.donations')"></v-list-item>
    <v-list-item :to="{ name: 'Recruitment'}" :title="$t('menu.recruitments')"></v-list-item>
    <v-list-item :to="{ name: 'TheVgrTeam'}" :title="$t('menu.staff')"></v-list-item>
    </v-list-group>
  </v-list>
</template>


<script>
export default {
  data: () => ({
    open: [],
  }),
}
</script>