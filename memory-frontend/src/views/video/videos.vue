<template>
    <div class="video">
        <div class="video" v-for="i in dataList" >
            <el-checkbox-group v-model="names" v-show="chooseState">
                <el-checkbox :key="i.originalFilename" :label="i.originalFilename"></el-checkbox>
            </el-checkbox-group>
            <video id="video"  preload="auto" @click="showVideo(i.url,i.originalFilename)" class="videoSource"  :class="{chooseImage:chooseState} ">
                <source :src="i.url" type="	video/mp4" />
            </video>
        </div>
    </div>
</template>

<script>
    import {downloads} from '@util/util'
    export default {
        name: "videos",
        props: {
            dataList: {
                type: Array,
                default: [],
            },
            chooseState: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                names:[]
            }
        },
        mounted() {
            this.$bus.$on('chooseClick', req => {
                this.names = []
            })
        },
        methods: {
            download() {
                if (this.names.length > 0) {
                    downloads(this.names, 'VIDEO')
                    this.$bus.$emit('changeChooseState', false)
                    this.names = []
                } else {
                    this.$message.error('请选择要下载的视频')
                }
            },
            showVideo(url,name){
                const obj = {
                    videoUrl: url,
                    videoName: name,
                    show: true
                }
                this.$emit('video', obj)
            }
        }
    }
</script>

<style scoped>
    .video {
        display: flex;
        flex-wrap:wrap;
    }
    .videoSource{
        width: 117px;
        height: 168px;
        border-width: 2px;
        border-style: ridge;
        margin: 2px;
    }
    .test{
        width: 100px;
        height: 100px;
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
        margin-left: 105px;
    }
    /deep/ .el-checkbox__inner{
        border-color: rgba(177, 177, 181, 0.84);
        top:4px
    }
</style>