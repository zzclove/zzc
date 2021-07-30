<template>
<div class="tab-bar-item" @click="click">
  <div v-if="!foo"><slot  name="item-icon"></slot></div>
  <div v-else><slot name="item-icon-active"></slot></div>
  <div :style="ActiveStyle"><slot name="item-text"></slot></div>
</div>
</template>

<script>
export default {
  props:{
    path:String,
    ActiveColor:{
      type:String,
      default:'red'
    }
  },
name: "Tabbar-item",
  data(){
  return{
    // foo:true,
  }
  },
  methods:{
  click(){
     this.$router.replace(this.path).catch(err=>err)
  }
  },
  computed:{
    foo(){
      return this.$route.path.indexOf(this.path) !==-1
    },
    ActiveStyle(){
      return this.foo?{color:this.ActiveColor}:{}
    }
  }
}
</script>

<style scoped>
.tab-bar-item{
  flex: 1;
  text-align: center;
  height: 49px;
  font-size:10px;
  vertical-align: middle;
}
.tab-bar-item img{
  width: 24px;
  height: 24px;
  margin-top: 3px;
}
</style>