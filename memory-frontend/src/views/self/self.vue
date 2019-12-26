<template>
    <div>
        <div>2</div>
        <div>2</div>
        <div>2</div>
        <div>2</div>
        <div>2</div>
        <div>2</div>
        <div>2</div>
        <div>2</div>
        <div>2</div>
        <div>2</div>
        <div>2</div>
        <div>2</div>
        <div>2</div>
        <div>2</div>
    </div>
</template>

<script>
    export default {
        name: "self",
        mounted() {
            //修改tabState
            this.$store.dispatch('changeTabState',true)
        }
    }
</script>

<style scoped>

</style>