<template>
<div class="app">
  <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
    <div class="span">
      <span v-if="mp3">
           <aplayer autoplay
                    mini
                    :music="audio"
           />
        <h1>{{this.audio.title}}</h1>
      </span>

      <span v-if="img">
          <div class="block">
              <el-tooltip class="item" effect="dark" content="一键复制直链" placement="top-start">
           <el-link type="success" @click="doCopy(url)">{{this.fileName}}</el-link>
    </el-tooltip>
            <br>
    <el-image :src="url"></el-image>
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
            size="mini"
            placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button
            size="mini"
            @click="editFile(scope.$index, scope.row)">详情</el-button>
        <el-button
            size="mini"
            type="danger"
            @click="deleteFile(scope.$index, scope.row)">删除</el-button>
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
  name:'minio',
  inject: ['reload'],
  components: {
    Aplayer
  },
  data() {
    return {
      newData:[],
      search: '',
      dialogVisible: false,
      mp3:false,
      img:false,
      url:'',
      fileName:'',
      audio:{
        title:'',
        src: '',
      },
    }
  },
  watch:{
    dialogVisible(newVal,oldVal){
      if(!newVal){
        this.reload();
      }
    }
  },
  methods: {
    editFile(index, row) {
      this.dialogVisible=true
      var type = String(row.fileName.split('.').slice(-1))
      if(type === undefined){
        this.$message.error('错误的文件类型')
      }
      if (type === 'jpg' || type === 'jpeg' || type === 'gif' || type === 'png' || type === 'bmp'|| type === 'JPG'){
        this.mp3= false
        this.img = true
        this.url = row.url
        this.fileName = row.fileName
      }else if (type === 'mp3'){
        this.img= false
        this.mp3 = true
        this.audio.src= row.url
        this.audio.title=row.fileName

      }else {
        this.$message.error('错误的文件类型')
      }
    },
    deleteFile(index, row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    // url复制
    doCopy: function (val) {
      this.$copyText(val).then(function (e) {
        Message.success("内容已复制到剪切板，即刻分享好友吧！！！")
      }, function (e) {
        Message.error("抱歉，复制失败！")
      })
    }
  },
  // 删除文件
  mounted() {
    axios.get("http://localhost:1266/file").then(resp=>{
      window.localStorage.setItem('data',JSON.stringify(resp.data.data.data))
      this.newData = JSON.parse(window.localStorage.getItem('data'))
    })
  },
}
</script>

<style scoped>

</style>