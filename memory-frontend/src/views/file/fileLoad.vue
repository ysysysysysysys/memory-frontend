<template>
    <el-upload
            multiple
            action=""
            :auto-upload="false"
            :http-request="upload">
        <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" >上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip"></div>
    </el-upload>
</template>

<script>
    export default {
        name: "fileLoad",
        methods: {
            upload(file){
                console.log(file);
            }
        }
    }
</script>

<style scoped>

</style>