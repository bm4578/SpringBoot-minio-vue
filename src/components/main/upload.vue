<template>
  <div class="app">
    <el-upload
        class="upload-demo"
        drag
        :action='this.urlImg'
        :show-file-list="false"
        :on-success="handleAvatarSuccess">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
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
      const isJPG = file.type === 'mp4';
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (isJPG) {
        this.$message.error('不能上传视频');
      }
      if (!isLt2M) {
        this.$message.error('上传大小不能超过 10MB!');
      }
      return  isLt2M;
    },
    //成功之后
    handleAvatarSuccess(res, file) {
      this.$message.success("上传成功"+res.name)
      console.log(res.errno)
    },
  }
}
</script>

<style scoped>

</style>