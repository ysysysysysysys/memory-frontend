<template>
    <el-page-header class="header">
        <el-button slot="title" icon="el-icon-arrow-left" @click="back" circle></el-button>
        <el-upload
                ref="uploads"
                multiple
                :action="url"
                :file-list="fileList"
                list-type="text"
                :auto-upload="false"
                :http-request="upload"
                slot="content"
                :on-preview="preview"
        >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submit">上传到服务器
            </el-button>
        </el-upload>
    </el-page-header>
</template>

<script>
    import {submitUpload,uploads} from "@network/ossRequest"

    export default {
        name: "fileLoad",
        data() {
            return {
                url: "http://localhost:8085/oss/upload",
                fileList: [],
                request: new FormData()
            }
        },
        methods: {
            submit(){
                this.request = new FormData()
                submitUpload(this.request,this.$refs.uploads,'FILE',this.fileList)
            },
            back(){
                this.$store.dispatch('changeTabState',true)
                this.$router.replace('/content')
                this.fileList = []
                this.$store.dispatch('changeContentType', this.$store.state.contentType)
                this.$bus.$emit('refresh', this.$store.state.contentType)

            },
            preview(file){
                this.$message.info('文件名称'+file.name)
            },
            upload(file){
                uploads(this.request,file)
            }
        }
    }
</script>

<style scoped>
    .el-upload__tip {
        font-size: 20px;
    }

    /deep/ .el-icon-back:before {
        content: none;
    }
    /deep/ .el-upload-list__item{
        width: 260px;
    }
    /deep/.el-page-header__left{
        height: 40px;
    }
</style>