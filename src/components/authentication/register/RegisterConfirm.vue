<template>
  <div>
    <div v-if="hasError" class="alert--error" role="alert">
      <p>{{ message }}</p>
    </div>

    <div v-else-if="hasSuccess" class="alert--sucess" role="alert">
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/auth.service'

export default {
  name: 'RegisterConfirm',
  props: [],
  components: {},
  data() {
    return {
      success: null,
      message: '',
    };
  },
  created() {
    if (this.$route.query.token) {
      this.performConfirm(this.$route.query.token);
    }
  },
  computed: {
    hasError() {
      return (this.success === false);
    },
    hasSuccess() {
      return (this.success === true);
    },
  },
  methods: {
    performConfirm($token) {
      AuthService.confirm($token).then(response => {
        if (response.status === 200) {
          this.success = response.data.success;
          this.message = response.data.message;
        } else {
          this.success = false;
          this.message = 'ERROR';
        }
      })
    },
  },
};
</script>
