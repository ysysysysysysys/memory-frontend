<template>
    <div id="app">
        <link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">

        <div v-show="this.$store.state.tabState">
            <home></home>
        </div>
            <router-view></router-view>

    </div>
</template>

<script>
    import home from '@views/home/home'

    export default {
        name: "App",
        data() {
            return {
                state: false
            }
        },
        components: {
            home
        },
        methods: {}
    }
</script>

<style>
    body {
        margin: 0px;
        border: 0px;
    }

</style>
