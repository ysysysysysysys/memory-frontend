<template>
    <div class="picture">
        <Search
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
            <div class="block">
                <div v-for="i in dataList">
                    <el-checkbox-group v-model="names" v-show="chooseState">
                        <el-checkbox :key="i.originalFilename" :label="i.originalFilename"></el-checkbox>
                    </el-checkbox-group>
                    <el-image
                            class="image"
                            :class="{chooseImage:chooseState}"
                            :src="i.url"
                            :fit="fit"
                            @click.native="showImage(i.url,i.name)"></el-image>
                </div>
            </div>
        </better-scroll>
        <div v-show="tip">
            <span>很遗憾,{{getYear}}没记住啥</span>
        </div>
        <div class="bigImagediv" v-show="bigImage && !chooseState" @click="backClick">
            <el-page-header @back="goBack" :content="bigImageName">
            </el-page-header>
            <img :src="image" class="bigImage" alt=""/>
        </div>
    </div>
</template>

<script>

    import {getList, UploadRequest, download, downloadRequest} from "@network/mainRequest";
    import BetterScroll from "@components/betterscroll/Scroll"
    import {Loading} from 'element-ui'
    import Search from "@components/search/Search";
    import {postDownLoadFile, debounce} from "@util/util"

    export default {
        name: "picture",
        components: {
            BetterScroll,
            Search
        },
        data() {
            return {
                pageNum: 1,
                pageSize: 32,
                dataList: [],
                totalPageNum: 0,
                fit: 'fill',
                bigImage: false,
                bigImageName: '',
                image: '',
                searchState: false,
                input: null,
                tip: false,
                chooseState: false,
                names: []

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
            }
        },
        created() {
            this.$store.dispatch('changeTabState', true)
            this.getMessage(this.pageNum, 'init')
        },
        mounted() {
            this.$bus.$on('chooseClick', req => {
                this.chooseState = req
                this.names = []
            })

            this.$bus.$on('downloadClick', () => {
                debounce(this.downloads(),300)
            })
        },
        methods: {
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
            showImage(url, name) {
                this.image = url
                this.bigImageName = name
                this.bigImage = true
            },
            pullDown() {
                //刷选初始化
                const options = {
                    spinner: 'el-icon-loading',
                    text: '刷新中'
                }
                let loadingInstance = Loading.service(options);
                setTimeout(() => {
                    this.pageNum = 1
                    this.getMessage(this.pageNum, 'init')
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
                    this.getMessage(this.pageNum++, 'add')
                    console.log('上拉加载');
                }
                setTimeout(() => {
                    this.$refs.scroll.refresh()
                    this.$refs.scroll.pullUpFinish()
                }, 500)
            },
            getMessage(pageNum, type) {
                const request = new UploadRequest(localStorage.getItem('account'), 'IMAGE', this.getYear
                    , pageNum, this.pageSize)
                getList(request)
                    .then(res => {
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
                    this.getMessage(this.pageNum, 'init')
                    this.$refs.scroll.pullDownFinish()
                }, 1000)
            },
            downloads() {
                let datas = []
                this.names.forEach(n => {
                    let request = new downloadRequest(n, this.$store.state.user.account, "IMAGE");
                    datas.push(request)
                })
                download(datas)
                    .then(res => {
                        console.log(res.data);
                        if (res.status == 200 && res.data != null && res.data.length != 0) {
                            let date = new Date();
                            postDownLoadFile(res.data, "IMAGE" + date.toLocaleString())
                            this.chooseState = false
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })

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
</style>