<template>
    <div>
        <div class="choose">
            <button class="chooseButton" @click="chooseClick">{{chooseTip}}</button>
            <el-button v-show="chooseState" @click="downloadClick" icon="el-icon-download"></el-button>
        </div>
        <div class="button">
            <el-dropdown @command="choose">
            <span class="el-dropdown-link"><i class="el-icon-circle-plus-outline"></i>
            </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="picture">图片</el-dropdown-item>
                    <el-dropdown-item command="video">视频</el-dropdown-item>
                    <el-dropdown-item command="file">文件</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <el-tabs type="border-card" tab-position="bottom">
            <el-tab-pane>
                <span slot="label" @click="file"><i class="el-icon-folder"></i> 文件</span>
                文件
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label" @click="videos"><i class="el-icon-video-camera"></i> 视频</span>
                视频
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label" @click="picture"><i class="el-icon-picture-outline"></i> 图片</span>
                图片
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label" @click="self"><i class="el-icon-user"></i>个人</span>
                个人
            </el-tab-pane>
        </el-tabs>
    </div>

</template>

<script>
    import topTab from "@components/topTab/topTab";
    import {debounce} from "@util/util"


    export default {
        name: "home",
        data() {
            return {
                input: "",
                chooseState: false,
                chooseTip: '选择'
            }
        },
        components: {
            topTab
        },
        mounted() {
            this.$bus.$on('changeChooseState', res => {
                this.chooseState = res
                this.chooseTip = '选择'
            })
        },
        methods: {
            picture() {
                this.$store.dispatch('changeContentType', 'IMAGE')
                this.$bus.$emit('refresh', 'IMAGE')
                this.routerChangeChooseState()
            },
            videos() {
                this.$store.dispatch('changeContentType', 'VIDEO')
                this.$bus.$emit('refresh', 'VIDEO')
                this.routerChangeChooseState()
            },
            file() {
                this.$store.dispatch('changeContentType', 'FILE')
                this.$bus.$emit('refresh', 'FILE')
                this.routerChangeChooseState()
            },
            self() {
                this.$store.dispatch('changeContentType', 'SELF')
                this.$bus.$emit('refresh', 'SELF')
                this.routerChangeChooseState()
            },
            choose(command) {
                this.$store.dispatch('changeTabState', false)
                console.log(command);
                switch (command) {
                    case 'picture':
                        this.$router.replace('/pictureLoad')
                        break;
                    case 'video':
                        this.$router.replace('/videoLoad')
                        break;
                    case 'file':
                        this.$router.replace('/fileLoad')
                }
                // this.$store.dispatch('saveMemoryType', command)
                //     .then(res => {
                //         this.$router.replace('/load')
                //     })
            },
            chooseClick() {
                this.chooseState = !this.chooseState
                if (this.chooseState) {
                    this.chooseTip = '取消'
                } else {
                    this.chooseTip = '选择'
                }
                this.$bus.$emit("chooseClick", this.chooseState)
            },
            downloadClick() {
                debounce(this.$bus.$emit('downloadClick'),1000)
            },
            routerChangeChooseState(){
                this.chooseState = false
                this.$bus.$emit("chooseClick", false)
                this.chooseTip='选择'
            }
        },

    }
</script>

<style scoped>

    /deep/ .el-tabs__header {
        margin-bottom: 0;
        margin-top: 10px;
        position: fixed;
        bottom: 2px;
        background-color: oldlace;
        z-index: 1;
    }


    /deep/ .el-tabs__content {
        position: fixed;
        background: oldlace;
        height: 20px;
        width: 100%;
    }

    /deep/ .el-tab-pane {
        text-align: center;
        font-size: 20px;
        color: #909399;
    }


    /deep/ .el-tabs__nav {
        width: 100vh;
    }

    /deep/ .el-tabs__item {
        width: 96px;
        font-size: 15px;
    }

    .button {
        position: fixed;
        z-index: 9;
        right: 7px;
        top: 7px;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #b1b1b5;
    }

    .el-icon-arrow-down {
        font-size: 31px;
    }

    .el-dropdown {
        font-size: 31px;
    }

    .choose {
        position: fixed;
        z-index: 5;
    }

    .chooseButton {
        font-size: 16px;
        margin-top: 16px;
        margin-left: 15px;
        color: #909399;
        border: 2px;
        z-index: 10;
    }

    /deep/ .el-button {
        font-size: 21px;
        margin-top: 6px;
        margin-left: 12px;
        color: #909399;
        border: 0px;
        background-color: oldlace;
    }

    /deep/ .el-tabs--bottom.el-tabs--border-card .el-tabs__header.is-bottom {
        border-bottom: 0;
        border-top: 1px solid #DCDFE6;
        margin-bottom: -3px;
    }

    /deep/ .el-tabs__content {
        margin-left: -1px;
    }
</style>