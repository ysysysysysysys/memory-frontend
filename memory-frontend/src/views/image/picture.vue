<template>
    <div class="block">
        <div v-for="(i,index) in dataList">
            <el-checkbox-group v-model="names" v-show="chooseState">
                <el-checkbox :key="i.originalFilename" :label="i.originalFilename"></el-checkbox>
            </el-checkbox-group>
            <el-image
                    class="image"
                    :class="{chooseImage:chooseState}"
                    :src="i.url"
                    :fit="fit"
                    @click.native="showImage(i.url,i.name,index)"></el-image>
        </div>
    </div>
</template>

<script>
    import {debounce, downloads} from "@util/util"

    export default {
        name: "picture",
        props: {
            dataList: {
                type: Array,
                default: []
            },
            chooseState: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                names: [],
                fit: 'fill',
            }
        },
        mounted() {
            this.$bus.$on('chooseClick', req => {
                this.names = []
            })
        },
        methods: {
            showImage(url, name,index) {
                const obj = {
                    image: url,
                    bigImageName: name,
                    bigImage: true,
                    index:index
                }
                console.log(obj);
                this.$emit('showImage', obj)
            },
            download() {
                if(this.names.length > 0){
                    downloads(this.names, 'IMAGE')
                    this.names = []
                    this.$bus.$emit('changeChooseState', false)
                }else{
                    this.$message.error('请选择要下载的图片')
                }
            }
        }
    }
</script>

<style scoped>
    .image {
        width: 91px;
        height: 91px;
        margin: 1px;
    }

    .picture {
        margin-top: 51px;
        margin-bottom: 40px;
    }

    .wrapper {
        position: fixed;
        top: 51px;
        bottom: 40px;
        left: 0;
        right: 0;
        z-index: -1;
    }

    .wrapperSearch {
        position: fixed;
        top: 91px;
        bottom: 40px;
        left: 0;
        right: 0;
        z-index: -1;
    }

    .block {
        display: flex;
        flex-wrap: wrap;
    }

    .bigImagediv {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        /*opacity: .5;*/
        background: #000;
        z-index: 2000;
        color: white;
    }

    .bigImage {
        height: auto;
        width: 100vw;
        opacity: 1.0;
    }

    /deep/ .el-page-header__content {
        color: white;
    }

    .chooseImage {
        opacity: .5
    }

    /deep/ .el-checkbox__label {
        display: none;
        padding-left: 10px;
        line-height: 19px;
        font-size: 14px;
    }

    .el-checkbox-group {
        position: fixed;
        z-index: 10;
        margin-left: 74px;
    }

    /deep/ .el-page-header__title {
        display: none;
    }

    /deep/ .el-checkbox__inner{
        border-color: rgba(177, 177, 181, 0.84);
        top:4px
    }
</style>