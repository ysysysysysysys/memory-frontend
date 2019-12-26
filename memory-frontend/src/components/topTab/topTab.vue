<template>
    <div class="top-tab">
        <div class="left" >
            <slot name="left"></slot>
        </div>
        <div  class="center">
            <slot name="center"></slot>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "topTab"
    }
</script>

<style scoped>
    .top-tab{
        display: flex;
        line-height: 44px;
        height: auto;
    }

    .left,.right{
        width: 20px;
    }
    .center{
        flex: 1;
        text-align: center
    }
</style>