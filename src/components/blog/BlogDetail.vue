<template>
  <el-card shadow="always">
    <el-row :v-loading="loading">
      <el-col :span="24">
        <div style="text-align: left;">
          <el-button type="text" icon="el-icon-back" @click="goBack" style="padding-bottom: 0px;">返回</el-button>
        </div>
      </el-col>
      <el-col :span="24" style="margin-top: 15px">
        <div>
          <h2 style="margin-top: 0px;margin-bottom: 0px">{{article.title}}</h2>
          <div class="userInfo">
            <p>
              <span>作者: {{article.author}}</span>
            </p>
            <p>
              <span>日期: {{article.createTime}}</span>
            </p>
          </div>
        </div>
      </el-col>
      <el-col>
        <div style="text-align: left" v-html="article.content" v-highlight>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      article: {},
      loading: false,
      activeName: ''
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  },
  mounted: function () {
    var id = this.$route.query.id
    // 根据id获取数据
    this.$http.get('/demo/article/' + id).then(result => {
      if (result.data.code !== 200) {
        return this.$message.error('获取用户异常')
      } else {
        this.article = result.data.data
        this.loading = true
      }
    })
  }
}
</script>

<style lang="less" scoped>
.blog {
  // font-family: Georgia,serif;
  // letter-spacing: -0.01em;
  // word-spacing: .2em;
  // line-height: 1.8em;
  // font-size: 80.5%;
}
.userInfo {
  color: #567;
}
</style>
