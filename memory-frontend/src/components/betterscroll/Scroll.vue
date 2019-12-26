<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name:"scroll",
    data(){
        return{
            scroll:null,
        }
    },
    props:{
        probeType:{
            Type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default: false
        },
        pullDownRefresh:{
            type: Boolean,
            default:false
        }
    },
    mounted(){
        this.scroll = new BScroll(this.$refs.wrapper,{
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad,
            click:true,
            pullDownRefresh:this.pullDownRefresh
        })

        this.scroll.on('scroll',position =>{
            this.$emit("backscroll",position)
        })

        this.scroll.on('pullingUp',() =>{
            this.$emit('pullingUp')
        })

        this.scroll.on('pullingDown',()=>{
            this.$emit('pullingDown')
        })
    },
    methods:{
        pullUpFinish(){
            this.scroll.finishPullUp()
        },
        pullDownFinish(){
            this.scroll.finishPullDown()
        },
        refresh(){
            console.log('刷新dom');
            this.scroll.refresh()
        }
    }
}
</script>

<style>

</style>