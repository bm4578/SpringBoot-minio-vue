<template>
  <div class="app">
    <el-dialog
        :visible.sync="dialogVisible"
        title="提示"
        width="30%">
      <div class="span">
      <span v-if="mp3">
           <aplayer :music="audio"
                    autoplay
                    mini
           />
              <el-tooltip class="item" content="一键复制直链" effect="dark" placement="top-start">
           <el-link type="success" @click="doCopy(audio.src)">{{ audio.title }}</el-link>
              </el-tooltip>
      </span>

      <span v-if="img">
          <div class="block">
              <el-tooltip class="item" content="一键复制直链" effect="dark" placement="top-start">
                  <el-link type="success" @click="doCopy(url)">{{ this.fileName }}</el-link>
              </el-tooltip>
            <br>
            <el-image :src="url"></el-image>
          </div>
        </span>

      <span v-if="mp4">
      <div class="player-container">
      <vue-core-video-player :src="video.mp4Url" />
          <el-tooltip class="item" content="一键复制直链" effect="dark" placement="top-start">
           <el-link type="success" @click="doCopy(video.mp4Url)">{{ video.mp4Name }}</el-link>
              </el-tooltip>
      </div>
      </span>
      </div>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>

    <el-table
        :data="newData.filter(data => !search || data.fileName.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
      <el-table-column
          label="name"
          prop="fileName">
      </el-table-column>

      <el-table-column
          align="right">
        <template slot="header" slot-scope="scope">
          <el-input
              v-model="search"
              placeholder="输入关键字搜索"
              size="mini"/>
        </template>
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary" plain
              @click="editFile(scope.$index, scope.row)">详情
          </el-button>

          <el-button
              size="mini"
              type="success" plain
              @click="downloadFile(scope.$index, scope.row)">下载
          </el-button>


          <el-button
              class="delete"
              size="mini"
              type="danger" plain
              @click="deleteFile(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
import {Message} from "element-ui";
import Aplayer from 'vue-aplayer'

export default {
  name: 'minio',
  inject: ['reload'],
  components: {
    Aplayer
  },
  data() {
    return {
      newData: [],
      search: '',
      dialogVisible: false,
      mp3: false,
      img: false,
      mp4: false,
      video: {
        mp4Url:'',
        mp4Name:''
      },
      url: '',
      fileName: '',
      audio: {
        title: '',
        src: '',
      },
    }
  },
  watch: {
    dialogVisible(newVal) {
      if (!newVal) {
        this.reload();
      }
    }
  },
  methods: {
    editFile(index, row) {
      this.dialogVisible = true
      const type = String(row.fileName.split('.').slice(-1));
      if (type === undefined) {
        this.$message.error('错误的文件类型')
      }
      if (type === 'jpg' || type === 'jpeg' || type === 'gif' || type === 'png' || type === 'bmp' || type === 'JPG') {
        this.img = true
        this.url = row.url
        this.fileName = row.fileName
      } else if (type === 'mp3') {
        this.mp3 = true
        this.audio.src = row.url
        this.audio.title = row.fileName
      }else if(type === 'mp4' || type ==="MP4" || type === "mov" || type === "mpg" || type === "wmv" || type === "mpeg" || type === "avi" || type === "m3u8"){
        this.mp4 = true
        this.video.mp4Url = row.url
        this.video.mp4Name = row.fileName
      }
      else {
        this.dialogVisible = false
        this.$message.error('未为此类型文件配置解析器，请下载使用')
      }
    },
    //删除文件
    deleteFile(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.delete('/file', {
          params: {    // 请求参数拼接在url上
            fileName: row.fileName
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!'
            });
          }
          //刷新页面
          this.reload();
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //下载文件
    downloadFile(index,row){
      axios.get('/file/download',{
        params: {    // 请求参数拼接在url上
          fileName: row.fileName
        },responseType: "blob"
      }).then(res=>{
        const type = String(row.fileName.split('.').slice(-1));
        let blob = new Blob([res.data], {
          type: type //这里需要根据不同的文件格式写不同的参数
        });
        let eLink = document.createElement("a");
        eLink.download = row.fileName; //这里需要自己给下载的文件命名
        eLink.style.display = "none";
        eLink.href = URL.createObjectURL(blob);
        document.body.appendChild(eLink);
        eLink.click();
        URL.revokeObjectURL(eLink.href);
        document.body.removeChild(eLink);
      })
    },
    //一键复制
    doCopy: function (val) {
      this.$copyText(val).then(function (e) {
        Message.success("内容已复制到剪切板，即刻分享好友吧！！！")
      }, function (e) {
        Message.error("抱歉，复制失败！")
      })
    }
  },

  /**
   * 查询列表
   */
  mounted() {
    axios.get("/file").then(resp => {
      window.localStorage.setItem('data', JSON.stringify(resp.data.data.data))
      this.newData = JSON.parse(window.localStorage.getItem('data'))
    })
  },
}
</script>

<style scoped>
@media screen and (max-width: 960px) {
  .delete {
    display: none;
  }
}
</style>