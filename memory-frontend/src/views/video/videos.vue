<template>
    <div>
        <div>3</div>
        <div>3</div>
        <div>3</div>
        <div>3</div>
        <div>3</div>
        <div>3</div>
        <div>3</div>
        <div>3</div>
        <div>3</div>
        <div>3</div>
        <div>3</div>
        <div>3</div>
        <div>3</div>
        <div>3</div>
        <div>3</div>
        <div>3</div>
        <div>3</div>
        <div>3d</div>
    </div>
</template>

<script>
    export default {
        name: "videos",
        mounted() {
            //修改tabState
            this.$store.dispatch('changeTabState',true)
        }
    }
</script>

<style scoped>

</style>