<template>
<div class="app">
  <el-divider content-position="center" style="font-size: 20em">Minio</el-divider>
  <el-link type="primary"><router-link :to="{name:'upload'}">上传</router-link></el-link>
  <el-divider direction="vertical"></el-divider>
  <el-link type="primary"><router-link :to="{name:'minio'}">所有文件</router-link></el-link>
<!--  <el-divider direction="vertical"></el-divider>-->
<!--  <el-link type="primary"><router-link :to="{name:'test'}">测试</router-link></el-link>-->
</div>

</template>

<script>
export default {
  name: "bar",
}
</script>

<style scoped>

</style>