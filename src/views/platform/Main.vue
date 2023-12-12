<template>
    <div>
        <h1>{{ getPlatform.libPlatform }}</h1>
        <router-view></router-view>
    </div>
</template>

<script>
    import BreadcrumbsManager from '@/mixins/BreadcrumbManager';
    import PlatformApi from "@/services/api/vgr/Platform";

    export default {
        mixins: [BreadcrumbsManager],
        name: 'PlatformMain',
        components: {

        },
        data() {
            return {

            };
        },
        computed: {
            getPlatform() {
                return this.$store.getters['navigation/platform'];
            },
        },
        created() {
            this.$store.dispatch('aside/setPlatform');
            this.setBreadcrumbLevel(1);
            this.setBreadcrumbItem1(
                { text: this.getPlatform.libPlatform, to: {name: 'PlatformIndex',params: { idPlatform: this.getPlatform.id, slugPlatform: this.getPlatform.slug }}}
            );
            this.setPlatform();
        },
        updated() {
            this.setPlatform();
            if (this.$route.name  === 'PlatformIndex') {
                this.setBreadcrumbLevel(1);
             }
        },
        methods: {
            setPlatform () {
                if (this.getPlatform.id !== this.$route.params.id) {
                    PlatformApi.getPlatform(this.$route.params.id)
                        .then(platform => {
                            this.setBreadcrumbItem1(
                                { text: platform.libPlatform, to: {name: 'PlatformIndex',params: { idPlatform: platform.id, slugPlatform: platform.slug }}}
                            );
                            this.$store.dispatch('navigation/setPlatform', platform);
                        });
                }
            },
        },
    };
</script>
