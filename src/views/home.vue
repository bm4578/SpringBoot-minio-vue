<template>
  <el-container>
    <br>
    <br>
    <el-header><Bar /></el-header>
    <br>
    <br>
    <el-main><router-view /></el-main>
  </el-container>
</template>

<script>
import Bar from "@/components/bar";
export default {
  name: "home",
  components: {Bar},
  comments:{
    Bar:()=>{import("@/components/bar")}
  }
}
</script>

<style scoped>

</style>