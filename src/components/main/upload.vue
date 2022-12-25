<template>
  <div class="app">
    <el-upload
        class="upload-demo"
        drag
        :action='this.urlImg'
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
        :on-success="handleAvatarSuccess">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">不可以上传视频</div>
    </el-upload>
  </div>

</template>

<script>
export default {
  name: "upload",
  data() {
    return {
      name:"",
      //上传路径
      urlImg:'/api',
    }
  },
  methods:{
    beforeAvatarUpload(file) {
      const isLt = file.size / 1024 / 1024 < 100;
      if (!isLt) {
        this.$message.error('上传大小不能超过 100MB!');
      }
      return isLt;
    },
    //成功之后
    handleAvatarSuccess(res, file) {
      this.$message.success("上传成功"+file.name)
      console.log(res)
      router.replace({name:'minio'})
    },
  }
}
</script>

<style scoped>

</style>