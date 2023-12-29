<template>
  <div>
    <label for="group-switch">{{ $t('aside.switch.group') }}</label>

    <div class="game-switch__nav">
      <button v-if="this.selectedIndex > 0" v-on:click="goToPrev()">
        <span class="screen-reader-text">{{ $t('aside.switch.previousGroup') }}</span>
        <svg width="16" height="16" viewBox="0 0 50 50" class="svg-sprite svg-sprite__prev" aria-hidden="true"
             focusable="false">
          <use xlink:href="#arrow"/>
        </svg>
      </button>

      <select id="group-switch" v-on:change="onChange()" v-model="selected">
        <option v-for="group in groups" :key="group.id" v-bind:value="group['@id']">
          {{ group.name }}
        </option>
      </select>

      <button v-if="this.selectedIndex < this.groups.length - 1" v-on:click="goToNext()">
        <span class="screen-reader-text">{{ $t('aside.switch.nextGroup') }}</span>
        <svg width="16" height="16" viewBox="0 0 50 50" class="svg-sprite svg-sprite__next" aria-hidden="true"
             focusable="false">
          <use xlink:href="#arrow"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import {useAppStore} from "@/store/app";

export default {
  name: 'GroupSwitch',
  props: ['group'],
  components: {},
  data() {
    return {
      selected: '',
      selectedIndex: 0,
      groups: [],
    };
  },
  computed: {
    getGame() {
      return useAppStore().getGame;
    },
    getGroup() {
      return useAppStore().getGroup;
    },
    getLibGroup() {
      if (localStorage.lang === 'fr') {
        return 'libGroupFr';
      }
      return 'libGroupEn';
    },
  },
  methods: {
    onChange() {
      this.setSelectedIndex();
      this.goTo(this.groups[this.selectedIndex]);
    },
    goToPrev() {
      this.goTo(this.groups[this.selectedIndex - 1]);
    },
    goToNext() {
      this.goTo(this.groups[this.selectedIndex + 1]);
    },
    goTo(group) {
      this.setBreadcrumbItem2(
          {text: group.name, to: {name: 'GroupIndex', params: {idGroup: group.id, slugGroup: group.slug}}}
      );
      this.$store.dispatch('navigation/setGroup', group);
      this.$router.push({name: "GroupIndex", params: {idGroup: group.id, slugGroup: group.slug}});
    },
    loadData() {
      let params = {
        query: {
          pagination: false,
        }
      };
      params.query['order[' + this.getLibGroup + ']'] = 'ASC';
      GameApi.getGroups(this.getGame.id, params)
          .then(groups => {
            this.setSelectedIndex();
            this.groups = groups;
          });
    },
    setSelectedIndex() {
      let selected = this.selected;
      let selectedIndex = 0;

      this.groups.forEach(function (group, index) {
        if (group['@id'] === selected) {
          selectedIndex = index;
        }
      });
      this.selectedIndex = selectedIndex;
    },
  },
  watch: {
    getLanguage() {
      this.loadData();
    },
    getGame() {
      this.loadData();
    },
    getGroup() {
      this.selected = this.getGroup['@id'];
      this.setSelectedIndex();
    }
  },
  created() {
    this.loadData();
    this.selected = this.getGroup['@id'];
  },
};
</script>