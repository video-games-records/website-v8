<template>
    <span v-if="gender === 'H'">{{ $t('gender.male') }}</span>
    <span v-else-if="gender === 'F'">{{ $t('gender.female') }}</span>
    <span v-else-if="gender === 'I'">{{ $t('gender.unknown') }}</span>
    <span v-else></span>
</template>

<script>
    export default {
        name: 'gender',
        props: ['gender'],
    };
</script>


