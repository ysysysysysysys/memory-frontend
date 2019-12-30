<template>
    <div class="content">
        <Search
                class="search"
                :searchState="searchState"
                @change="change"></Search>
        <better-scroll
                ref="scroll"
                :pullUpLoad="true"
                :probeType=3
                :pullDownRefresh="true"
                :class="{wrapperSearch:searchState}"
                @pullingUp="pullUp"
                @pullingDown="pullDown"
                @backscroll="backscroll">
            <Picture ref="picture"
                     :data-list="dataList"
                     :chooseState="chooseState"
                     @showImage="showImages"
                     v-show="getContentState('IMAGE')"
            ></Picture>
            <File   ref="file"
                    :data-list="dataList"
                    v-show="getContentState('FILE')"></File>
            <Video  ref="video"
                    :data-list="dataList"
                    :chooseState="chooseState"
                    @video="video"
                    v-show="getContentState('VIDEO')"></Video>
            <Self
                    v-show="getContentState('SELF')"></Self>
        </better-scroll>
        <div v-show="tip">
            <span>很遗憾,{{getYear}}没记住啥</span>
        </div>
        <div class="bigImagediv" v-show="bigImage && !chooseState" @click="backClick">
            <el-page-header @back="goBack" :content="bigImageName">
            </el-page-header>
            <div class="real_image">
                <img :src="image" class="bigImage" alt=""/>
            </div>
        </div>
        <div class="showVideo" v-show="showVideo && !chooseState">
            <el-page-header @back="backVideo" :content="videoName">
            </el-page-header>
            <video class="real_video" :src="videoUrl" controls></video>
        </div>
    </div>
</template>

<script>

    import {getList, UploadRequest} from "@network/mainRequest";
    import BetterScroll from "@components/betterscroll/Scroll"
    import {Loading} from 'element-ui'
    import Search from "@components/search/Search";
    import Picture from "@views/image/picture"
    import File from "@views/file/file"
    import Video from "@views/video/videos"
    import Self from "@views/self/self"

    export default {
        name: "content",
        components: {
            BetterScroll,
            Search,
            Picture,
            File,
            Video,
            Self
        },
        data() {
            return {
                pageNum: 1,
                pageSize: 32,
                dataList: [],
                totalPageNum: 0,
                bigImage: false,
                bigImageName: '',
                image: '',
                searchState: false,
                input: null,
                tip: false,
                chooseState: false,
                showVideo:false,
                videoUrl:'',
                videoName:''
            }
        },
        computed: {
            getYear() {
                if (this.input == null) {
                    let date = new Date();
                    return date.getFullYear();
                } else {
                    return parseInt(this.input)
                }
            },

        },
        created() {
            this.$store.dispatch('changeTabState', true)
            this.getMessage(this.pageNum, 'init', 'FILE')
        },
        mounted() {
            this.$bus.$on('chooseClick', req => {
                this.chooseState = req
            })
            this.$bus.$on('refresh', res => {
                console.log('refresh' + res);
                this.input = null
                this.getMessage(1, 'init', res)
            })
            this.$bus.$on('changeChooseState', res => {
                this.chooseState = res
            })
            this.$bus.$on('downloadClick', () => {

                this.download()
            })
        },
        methods: {
            video(obj){
                console.log(obj);
                this.videoUrl = obj.videoUrl;
                this.videoName= obj.videoName;
                this.showVideo = obj.show;
            },
            backVideo(){
                console.log("false");
                this.showVideo = false
            },
            getContentState(contentType) {
                let type = this.$store.state.contentType
                console.log(type);
                return type == contentType
            },
            backscroll(posistion) {
                if (posistion.y >= 0) {
                    this.searchState = true
                }
            },
            backClick() {
                this.bigImage = false
            },
            goBack() {
                this.bigImage = false
            },
            showImages(res) {
                console.log(res);
                this.image = res.image
                this.bigImageName = res.bigImageName
                this.bigImage = res.bigImage
            },
            pullDown() {
                console.log('pullDown');
                //刷选初始化
                const options = {
                    spinner: 'el-icon-loading',
                    text: '刷新中'
                }
                let loadingInstance = Loading.service(options);
                setTimeout(() => {
                    this.pageNum = 1
                    this.getMessage(this.pageNum, 'init', this.$store.state.contentType)
                    this.$refs.scroll.pullDownFinish()
                    this.$nextTick(() => {
                        loadingInstance.close();
                    });
                }, 1000)

            },
            pullUp() {
                if (this.pageNum >= this.totalPageNum / this.pageSize) {
                    this.$message.info('今年的记忆,止步于此')
                } else {
                    this.getMessage(this.pageNum++, 'add', this.$store.state.contentType)
                    console.log('上拉加载');
                }
                setTimeout(() => {
                    this.$refs.scroll.refresh()
                    this.$refs.scroll.pullUpFinish()
                }, 500)
            },
            getMessage(pageNum, type, contentType) {
                if (contentType != 'SELF') {
                    if(contentType == 'VIDEO'){
                        this.pageSize=12
                    }else{
                        this.pageSize=32
                    }
                    const request = new UploadRequest(localStorage.getItem('account'), contentType, this.getYear
                        , pageNum, this.pageSize)
                    getList(request)
                        .then(res => {
                            console.log(res);
                            if (res.data.success) {
                                switch (type) {
                                    case 'init':
                                        this.dataList = res.data.body
                                        break;
                                    case 'add':
                                        res.data.body.forEach(n => {
                                            this.dataList.push(n)
                                        })
                                        break;
                                }
                            }
                            console.log(res.data.body.length);
                            if (res.data.body.length === 0) {
                                this.tip = true
                            } else {
                                this.tip = false
                                this.totalPageNum = res.data.body[0].total;
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
            },
            change(input) {
                this.input = input
                const options = {
                    spinner: 'el-icon-loading',
                    text: '正在搜寻您' + input + '年的回忆'
                }
                let loadingInstance = Loading.service(options);
                setTimeout(() => {
                    this.$nextTick(() => {
                        loadingInstance.close();
                    });
                    this.searchState = false
                    this.pageNum = 1
                    this.getMessage(this.pageNum, 'init', this.$store.state.contentType)
                    this.$refs.scroll.pullDownFinish()
                }, 1000)
            },
            changeState(res) {
                this.chooseState = res
            },
            download() {
                switch (this.$store.state.contentType) {
                    case 'IMAGE':
                        this.$refs.picture.download()
                        break;
                    case 'FILE':
                        this.$refs.file.download()
                        break;
                    case 'VIDEO':
                        this.$refs.video.download()
                        break;
                }
            }

        },
    }
</script>

<style scoped>
    .image {
        width: 91px;
        height: 91px;
        margin: 1px;
    }

    .content {
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
        display: flex;
        flex-direction: column;
        justify-content: center;

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

    .el-checkbox-group {
        position: fixed;
        z-index: 10;
        margin-left: 74px;
    }

    /deep/ .el-page-header__title {
        display: none;
    }

    .search {
        margin-top: -3px;
    }
    .el-page-header{
        position: absolute;
        top: 0;
    }

    .showVideo{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        /*opacity: .5;*/
        background: #000;
        z-index: 2000;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .real_video{
        height: 90%;
        width: 100vw;
    }
</style>