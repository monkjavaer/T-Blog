<template>
  <el-container>
    <el-header>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>文章管理</el-breadcrumb-item>
            <el-breadcrumb-item>写文章</el-breadcrumb-item>
        </el-breadcrumb>
    </el-header>
    <el-main>
      <el-row :gutter="40">
        <el-col :span="18" ><el-input placeholder="请输入文章标题..." v-model="blog.title" clearable></el-input></el-col>
        <el-col :span="2" ><el-button type="primary" @click="publish">发布</el-button></el-col>
      </el-row>
        <!--
            @save: 按下 ctrl + s 时触发
            @change: 当值发生改变时 触发
        -->
        <div class="editor">
          <mavon-editor style="height: 100%;width: 100%;"
              @save="saveDoc"
              @change="updateDoc"
              ref="editor"
              v-model="blog.contentOld" placeholder="开始写文章...">
          </mavon-editor>
        </div>
    </el-main>
  </el-container>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  name: 'Create',
  components: { mavonEditor },
  data () {
    return {
      blog: {
        title: '',
        content: '',
        contentOld: ''
      }
    }
  },
  methods: {
    // 编辑区域内容变化触发
    updateDoc (markdown, html) {
      this.blog.content = html
      this.blog.contentOld = markdown
    },
    // CTRL+s触发
    saveDoc (markdown, html) {
      this.blog.content = html
      this.blog.contentOld = markdown
    },
    // 发布文章
    publish () {
      this.$http.post('/demo/article/addArticle', this.blog).then(result => {
        if (result.data.code !== 200) {
          return this.$message.error('发布异常')
        }
        this.$message.success('发布成功')
        this.$router.push('/blogList')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.editor {
    margin-top: 20px;
    width: 100%;
    height: 500px;
    text-align: left;
  }
</style>
