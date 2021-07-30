<template>
  <div class="tab-control">
    <!--因为需求上看这里只是字不一样所以并没有使用插槽-->
    <div v-for="(item, index) in titles"
         :key="index" class="tab-control-item"
         :class="{active: index===zzz}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles:{
        type:Array,
        default() {
            return []
        }
      }
    },
    data() {
      return {
        zzz:0
      }
    },
    methods:{
      itemClick(index){
        this.zzz=index
        this.$emit('tabClick',index)
      }
    }
    }
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    background-color: #fff;
  }

  .tab-control-item{
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 3px solid var(--color-tint);
    padding: 5px;
  }

</style>
