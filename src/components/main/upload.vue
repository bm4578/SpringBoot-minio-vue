<template>
  <div class="copy">
    <el-button @click="text">默认按钮</el-button>

  </div>
</template>

<script>
import Aplayer from 'vue-aplayer'
export default {
  name: "upload",
  data(){
    return{

  }
  },
  components: {
    Aplayer
  },
  methods:{
    text(){
      console.log("test")
    }
  }
}
</script>

<style scoped>

</style>