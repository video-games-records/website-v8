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
    getGroup() {
      return useAppStore().getGroup;
    },
  },
  created() {
    this.load();
  },
  watch: {
    '$route.params.idGroup' () {
      this.load();
    },
  },
  methods: {
    load() {
      this.axios.get('/api/groups/' + this.$route.params.idGame)
          .then(response => {
            useAppStore().setGroup(response.data);
          })
    },
  },
};
</script>
