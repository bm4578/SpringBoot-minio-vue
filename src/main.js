import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//封装axios
import '@/utils/api'
// ElementUI
import './plugins/element.js'
// 一键复制 来源：https://juejin.cn/post/6872972228221206536
import './plugins/copy.js'
// 音乐播放器 来源：https://github.com/SevenOutman/vue-aplayer/blob/develop/docs/README.zh-CN.md
import VueAPlayer from 'vue-aplayer'
VueAPlayer.disableVersionBadge = true
// 视频播放器 https://core-player.github.io/vue-core-video-player/zh/
import './plugins/video.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
