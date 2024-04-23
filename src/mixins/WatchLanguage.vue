<script>
export default {
  data: function () {
    return {

    }
  },
  computed: {
    getLanguage () {
      return this.$route.params.lang;
    },
  },
  watch : {
    getLanguage() {
      this.load();
    },
  },
}
</script>
