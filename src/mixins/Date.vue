<script>

export default {
  data: function () {
    return {

    }
  },
  computed: {
    getNow: function () {
      function pad(s) {
        return (s < 10) ? '0' + s : s;
      }

      let d = new Date();
      return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-');
    },
  },
}
</script>
