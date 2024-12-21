<template>
  <nav class="site-breadcrumb">
    <ul>
      <li v-if="getLevel >= 1">
        <span v-if="getLevel >= 2 && getItem1.to">
          <router-link :to="getItem1.to" @click="setLevel(1)">{{ getItem1.text }}</router-link>
        </span>
        <span v-else>{{ getItem1.text }}</span>
      </li>
      <li v-if="getLevel >= 2">
        <span v-if="getLevel >= 3 && getItem2.to">
          <router-link :to="getItem2.to" @click="setLevel(2)">{{ getItem2.text }}</router-link>
        </span>
        <span v-else>{{ getItem2.text }}</span>
      </li>
      <li v-if="getLevel >= 3">
        <span v-if="getLevel >= 4 && getItem3.to">
          <router-link :to="getItem3.to" @click="setLevel(3)">{{ getItem3.text }}</router-link>
        </span>
        <span v-else>{{ getItem3.text }}</span>
      </li>
      <li v-if="getLevel >= 4">
        <span v-if="getLevel >= 5 && getItem4.to">
          <router-link :to="getItem4.to" @click="setLevel(4)">{{ getItem4.text }}</router-link>
        </span>
        <span v-else>{{ getItem4.text }}</span>
      </li>
      <li v-if="getLevel >= 5">
        <span v-if="getLevel >= 6 && getItem5.to">
          <router-link :to="getItem5.to" @click="setLevel(5)">{{ getItem5.text }}</router-link>
        </span>
        <span v-else>{{ getItem5.text }}</span>
      </li>
    </ul>
  </nav>
</template>

<script>
import {useBreadcrumbsStore} from "@/store/base/breadcrumbs";

export default {
  name: 'BaseBreadcrumb',
  computed: {
    getLevel() {
      return useBreadcrumbsStore().getLevel;
    },
    getItem1() {
      return useBreadcrumbsStore().getItem1;
    },
    getItem2() {
      return useBreadcrumbsStore().getItem2;
    },
    getItem3() {
      return useBreadcrumbsStore().getItem3;
    },
    getItem4() {
      return useBreadcrumbsStore().getItem4;
    },
    getItem5() {
      return useBreadcrumbsStore().getItem5;
    },
  },
  methods: {
    setLevel(level) {
      useBreadcrumbsStore().setLevel(level);
    },
  },
};
</script>
