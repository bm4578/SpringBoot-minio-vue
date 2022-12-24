<template>
  <div class="copy">
    <aplayer :audio="audio" :lrcType="3" />

    <el-button @click="test">默认按钮</el-button>
  </div>
</template>

<script>
export default {
  name: "upload",
  data() {
    return {
      audio: [
        {
          name: "听妈妈的话",
          artist: "周杰伦",
          url:
              "http://www.170mv.com/kw/antiserver.kuwo.cn/anti.s?rid=MUSIC_138243&response=res&format=mp3|aac&type=convert_url&br=128kmp3&agent=iPhone&callback=getlink&jpcallback=getlink.mp3",
          cover: 'http://img1.kuwo.cn/star/starheads/240/42/97/3914752958.jpg',
        }],
        url: 'http://192.168.99.102:9000/ests/%E8%BF%9F%E6%9D%A5%E7%9A%84%E6%83%85%E8%AF%9D%20%28%E5%A5%B3%E5%A3%B0%E7%89%88%29%20-%20Zkaaai.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=codetype%2F20221224%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20221224T084908Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=20ee362434e8dd87d64a680b9274c6b50a198b4740d17876a6f3c415a1415a57',
      }
    },
  methods:{
    test(){
      this.$refs.aplayer.play()
    }
}
}
</script>

<style scoped>

</style>