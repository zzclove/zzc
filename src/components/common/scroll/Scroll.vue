<template>
<div class="wrapper" ref="a">
<div class="content">
  <slot></slot>
</div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
name: "Scroll",
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default: false
    }
  },
  data(){
  return{
    scroll:null,
  }
  },
  mounted() {
  // 1.创建BSscrll对象
  this.scroll=new BScroll(this.$refs.a,{
    probeType:this.probeType,
    click:true,
    pullUpLoad:this.pullUpLoad
  })
    //2.监听滚动的位置
    if(this.probeType==2||this.probeType==3){
      this.scroll.on('scroll',(proition)=>{
        // console.log(proition);
        this.$emit('scroll',proition)
      })
    }
    //3.监听scroll滚动到底部
    if(this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{
          this.$emit('pullingUp')
        })
    }
  },
  methods:{
  //封装返回顶部的方法
    scrollTo(x,y,time){
      this.scroll&&this.scroll.scrollTo(x,y,time)
    },
    //封装持续加载更多的方法
    finishPullUp(){
      this.scroll&&this.scroll.finishPullUp()
    },
    refresh(){
      // console.log('-----');
      this.scroll&&this.scroll.refresh()
    },
    finishPullUp(){
      this.scroll&&this.scroll.finishPullUp()
    }
  }
}
</script>

<style scoped>

</style>