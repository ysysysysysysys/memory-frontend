<template>
    <div>
        <el-upload
                slot="title"
                multiple
                action=""
                accept='video/*'
                :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取视频</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip"></div>
        </el-upload>
    </div>
</template>

<script>
    export default {
        name: "videoLoad",
        methods: {
            submitUpload() {
                console.log(this.fileList);
            },

        }
    }
</script>

<style scoped>

</style>