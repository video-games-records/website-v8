import { defineStore } from 'pinia'

export const useBreadcrumbsStore = defineStore('breadcrumbs', {
    state: () => ({
        level: 0,
        item1: {},
        item2: {},
        item3: {},
        item4: {},
        item5: {},
    }),
    getters: {
        getLevel: (state) => state.level,
        getItem1: (state) => state.item1,
        getItem2: (state) => state.item2,
        getItem3: (state) => state.item3,
        getItem4: (state) => state.item4,
        getItem5: (state) => state.item4,
    },
    actions: {
        setLevel(item) {
            this.level = item;
        },
        setItem1(item) {
            this.item1 = item;
        },
        setItem2(item) {
            this.item2 = item;
        },
        setItem3(item) {
            this.item3 = item;
        },
        setItem4(item) {
            this.item4 = item;
        },
        setItem5(item) {
            this.item5 = item;
        },
    },
})
