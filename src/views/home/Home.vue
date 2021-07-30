<template>
<div id="home" class="wrapper">
  <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
   <scroll class="content" ref="scroll" :probe-type="3"
           @scroll="contentScroll"
           :pull-up-load="true"
           @pullingUp="loadMore"
   >
  <HomeSwiper :banners="banners"></HomeSwiper>
  <RecommendView :recommends="recommends"></RecommendView>
  <feature-view></feature-view>
  <tab-control  class="f" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
  <goods-list :goods="showgoods"></goods-list>
   </scroll>
  <back-top @click.native="backClick" v-show=" IsShowBackTop"></back-top>
</div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/Feature";

import TabControl from "components/content/tabControl/TabControl";

import {getHomeMultidata,getHomeGoods} from "network/home";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";
import {debounce} from "@/common/untills";
export default {
name: "Home",
  data(){
  return{
    banners:[],
    recommends:[],
    goods:{
      'pop':{page:0,list:[]},
      'new':{page:0,list:[]},
      'sell':{page:0,list:[]}
    },
    currentType:'pop',
    IsShowBackTop:false
  }
  },
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  created() {
    this.getHomeMultidata()
    //请求商品数据
     this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  //上面goods-list属性长用计算属性抽出来
  computed:{
  showgoods(){
    return this.goods[this.currentType].list
  }
  },
  methods:{
    tabClick(index){
    switch (index){
      case 0:
        this.currentType='pop'
        break
        case 1:
          this.currentType='new'
        break
        case 2:
          this.currentType='sell'
        break
    }
    },
    backClick(){
    this.$refs.scroll.scrollTo(0,0,300)
    },
    loadMore(){
      console.log('加载更多');
    },
    contentScroll(proition){
      this.IsShowBackTop=(-proition.y)>1000
    },
  //网络请求数据
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
        this.banners=res.data.banner.list;
        this.recommends=res.data.recommend.list
      })
    },

    //商品展示数据
    getHomeGoods(type){
      const page=this.goods[type].page+1
      getHomeGoods(type,page).then(res=>{
      this.goods[type].list.push(...res.data.list)
        this.goods[type].page+=1

        this.$refs.scroll.finishPullUp()
      })
    }
  },
  mounted() {
        const refresh=debounce( this.$refs.scroll.refresh,200)
    //监听item中图片加载完成要放到 mounted中因为放到create中数据可能为null
    this.$bus.$on('goodsItemLoad',()=>{
      refresh()
    })
  },
}
</script>

<style scoped>
#home{
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
/*.div{*/
/*  height: 3000px;*/
/*  width: 100%;*/
/*}*/
.f{
  position: sticky;
  top: 44px;
  z-index: 9;
}
.content{
  position: absolute;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
}
/*.content{*/
/*  height:300px;*/
/*  margin-top: 44px;*/
/*  overflow: hidden;*/
/*}*/
</style>