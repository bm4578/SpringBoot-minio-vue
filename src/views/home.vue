<template>
  <el-container>
    <br>
    <br>
    <el-header><Bar /></el-header>
    <br>
    <br>
    <el-main><router-view v-if="isRouterAlive" /></el-main>
  </el-container>
</template>

<script>
import Bar from "@/components/bar";
import Upload from "@/components/main/upload";
export default {
  name: "home",
  components: {Bar},
  comments:{
    Bar:()=>{import("@/components/bar")}
  },

  //刷新白屏
  provide (){
    return {
      reload:this.reload
    }
  },
  data(){
    return {
      isRouterAlive:true
    }
  },
  methods:{
    reload (){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style scoped>

</style>