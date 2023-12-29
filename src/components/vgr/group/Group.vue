<template>
  <div v-if="group.id" style="position:relative">
    <img v-if="group.isDlc" width="25" src="@/assets/img/dlc.gif" alt="DLC"
         style="position: absolute;top: 50%;transform: translateY(-50%);"/>
    <span v-if="group.isDlc" style="margin-left: 22px">&nbsp;</span>
    <router-link :to="{ name: 'GroupIndex', params: { idGroup: group.id, slugGroup: group.slug }}">
      {{ group.name }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Group',
  props: ['group'],
};
</script>

