<template>
    <div class="video">
        <div class="video" v-for="i in dataList" >
            <div class="button">
                <el-button class="click_button" icon="el-icon-video-play"  @click="showVideo(i.url,i.originalFilename)" ></el-button>
                <el-button class="click_button" icon="el-icon-search"  @click="showName(i.originalFilename)" ></el-button>
            </div>
            <el-checkbox-group v-model="names" >
                <el-checkbox :key="i.originalFilename"
                             :label="i.originalFilename"
                >{{i.originalFilename}}</el-checkbox>
            </el-checkbox-group>
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
                this.names = [];
                this.$el.style.setProperty('')

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
            },
            showName(name){
                this.$message.info('视频的名字:'+name)
            }
        }
    }
</script>

<style scoped>






    /deep/.el-checkbox__label{
        font-size: 18px;
        padding: 5px;
    }
    /deep/.el-checkbox__inner{
        margin-left: 4px;
    }
    .el-checkbox {
        color: #606266;
        font-weight: 500;
        font-size: 14px;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        width: 70%;
        overflow: hidden;
    }

    .click_button{
        width: 10px;
        height: 29px;
        background-color: rgba(177, 177, 181, 0.28);

    }
    .button{
        position: absolute;
        left: 279px;

    }
    /deep/[class^=el-icon-] {
        margin: -10px;
        font-size: 20px;
    }
</style>