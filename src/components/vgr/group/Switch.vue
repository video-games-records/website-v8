<template>
  <v-sheet>
    <div v-if="isLoading" class="d-flex justify-center">
      <v-progress-circular indeterminate color="yellow-darken-2" />
    </div>
    <div v-else class="d-flex">
      <v-btn v-if="!isFirst" rounded="lg" icon="mdi-chevron-left" @click="goToPrev()" />
      <v-select
        v-model="group"
        density="comfortable"
        :label="$t('aside.switch.group')"
        :items="this.groups"
        item-title="name"
        return-object
        @update:mode-value="onChange()"
      />
      <v-btn v-if="!isLast" rounded="lg" icon="mdi-chevron-right" @click="goToNext()" />
    </div>
  </v-sheet>
</template>

<script>
import {useAppStore} from "@/store/app";
import WatchLanguage from "@/mixins/WatchLanguage.vue";

export default {
  name: 'GroupSwitch',
  mixins: [WatchLanguage],
  data() {
    return {
      isLoading: true,
      selectedIndex: 0,
      groups: [],
    };
  },
  computed: {
    getGame() {
      return useAppStore().getGame;
    },
    group: {
      get: function () {
        return useAppStore().getGroup;
      },
      set: function (group) {
        useAppStore().setGroup(group);
      }
    },
    isFirst() {
      if (this.groups.length === 0) return false;
      return this.group.id === this.groups[0].id;
    },
    isLast() {
      if (this.groups.length === 0) return false;
      return this.group.id === this.groups[this.groups.length - 1].id;
    },
    getLibGroup() {
      if (localStorage.lang === 'fr') {
        return 'libGroupFr';
      }
      return 'libGroupEn';
    },
  },
  created() {
    this.load();
  },
  methods: {
    onChange () {
      this.$router.push({ name: 'GroupIndex', params: {idGroup : this.group.id, slugGroup: this.group.slug}});
    },
    goToPrev() {
      this.goTo(this.groups[this.groups.map(g => g.id).indexOf(this.group.id) - 1]);
    },
    goToNext() {
      this.goTo(this.groups[this.groups.map(g => g.id).indexOf(this.group.id) + 1]);
    },
    goTo(group) {
      this.$router.push({name: "GroupIndex", params: {idGroup: group.id, slugGroup: group.slug}});
    },
    load() {
      this.isLoading = true;
      this.axios.get('/api/games/' + this.$route.params.idGame + '/groups?pagination=false&order[' + this.getLibGroup + ']=ASC')
          .then(response => {
            this.isLoading = false;
            this.groups = response.data['hydra:member']
          })
    },
  },
};
</script>