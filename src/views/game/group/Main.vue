<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>


import {useAppStore} from "@/store/app";

export default {
  name: 'GroupMain',
  components: {},
  data() {
    return {
      selected: ''
    };
  },
  computed: {
    getGame() {
      return useAppStore().getGame;
    },
    getGroup() {
      return useAppStore().getGroup;
    },
  },
  created() {
    this.load();
  },
  updated() {
    if (this.$route.name  === 'GroupIndex') {
      if (this.getGroup.id !== this.$route.params.idGroup) {
        this.load();
      }
    }
  },
  methods: {
    load() {
      this.axios.get('/api/groups/' + this.$route.params.idGroup)
          .then(response => {
            useAppStore().setGroup(response.data);
            document.title = this.getGroup.name + ' - ' + this.getGame.name + ' - ' + import.meta.env.VITE_APP_TITLE;
          })
    },
  },
};
</script>
