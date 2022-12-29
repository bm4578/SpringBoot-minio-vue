<template>
  <div>
    <el-empty description="程序员正在努力开发中...">
      <div>
        <span>仅仅活着是不够的，还需要有阳光、自由，和一点花的芬芳。</span>
        <el-divider></el-divider>
        <span>
          <el-link type="primary"><router-link :to="{name:'home'}">点击跳转首页</router-link></el-link>
        </span>
      </div>
    </el-empty>
  </div>
</template>

<script>
export default {
  name: "NotFound"
}
</script>

<style scoped>

</style>
