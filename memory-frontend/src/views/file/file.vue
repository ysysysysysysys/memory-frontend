<template>
    <div class="file">
        <el-checkbox-group v-model="names">
            <el-checkbox v-for="i in dataList"  :label="i.originalFilename">{{i.originalFilename}}</el-checkbox>
        </el-checkbox-group>
    </div>
</template>

<script>
    import {downloads} from '@util/util'
    export default {
        name: "file",
        props: {
            dataList: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                names: []
            }
        },
        methods:{
            download(){
                if(this.names.length > 0){
                    downloads(this.names, 'FILE')
                    this.$bus.$emit('changeChooseState', false)
                    this.names = []
                }else{
                    this.$message.error('请选择要下载的文件')
                }
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
        width: 90%;
        overflow: hidden;
    }
</style>