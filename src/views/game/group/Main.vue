<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
    import GroupApi from '@/services/api/vgr/Group'
    import BreadcrumbsManager from '@/mixins/BreadcrumbManager';
    import i18n from "@/i18n";

    export default {
        mixins: [BreadcrumbsManager],
        name: 'GroupMain',
        components: {

        },
        data() {
            return {
                selected: ''
            };
        },
        computed: {
            getGroup() {
                return this.$store.getters['navigation/group'];
            },
            getLanguage () {
                return i18n.locale;
            },
        },
        methods: {
            setGroup () {
                GroupApi.getGroup(this.$route.params.idGroup)
                    .then(group => {
                        this.setBreadcrumbItem2(
                            { text: group.name, to: {name: 'GroupIndex',params: { idGroup: group.id, slugGroup: group.slug }}}
                        );
                        this.$store.dispatch('navigation/setGroup', group);
                    });
            },
        },
        watch : {
            getLanguage() {
                this.setGroup();
            },
        },
        created() {
            this.setBreadcrumbLevel(2);
            this.setGroup();
        },
        updated() {
            if (this.$route.name  === 'GroupIndex') {
                this.setBreadcrumbLevel(2);
                if (this.getGroup.id !== this.$route.params.idGroup) {
                    this.setGroup();
                }
            }
        },
    };
</script>
