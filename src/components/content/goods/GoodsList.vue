<template>
<div class="goods">
  <GoodListItem v-for="(item,index) in goods" :key="index" :Goodsitem="item"></GoodListItem>
</div>
</template>

<script>
import GoodListItem from "components/content/goods/GoodListItem";
export default {
name: "GoodsList",
  props:{
  goods:{
    type:Array,
    default(){
      return[]
    }
  }
  },
  components:{
    GoodListItem
  }
}
</script>

<style scoped>
.goods{
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}
</style>