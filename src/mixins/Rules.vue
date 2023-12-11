<script>

import validator from 'validator';

export default {
  data: function () {
    return {
      rules: {
        required: value => !!value || 'Le champs est requis',
        email: value => {
          if (value === undefined) return true;
          return validator.isEmail(value) || 'Invalide email.';
        },
        minlength(min, value) {
          if ((value ===  null) || (value === '')) return true;
          return (value && value.length >= min) || 'Le champ doit contenir au moins ' + min +' caractères';
        },
        maxlength(max, value) {
          if ((value ===  null) || (value === '')) return true;
          return (value && value.length <= max) || 'Le champ doit contenir au plus ' + max +' caractères';
        }
      },
    }
  }
}
</script>
