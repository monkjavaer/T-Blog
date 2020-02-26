<template>
  <el-card shadow="always">
    <el-row :v-loading="loading">
      <el-col>
        <div>
          <h1 class="b-title">{{article.title}}</h1>
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
        <div class="article" v-html="article.content" v-highlight>
        </div>
      </el-col>
      <el-col>
        <div class="goback">
          <el-button type="text" icon="el-icon-back" @click="goBack" style="padding-bottom: 0px;">返回</el-button>
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
        return this.$message.error('获取异常')
      } else {
        this.article = result.data.data
        this.loading = true
      }
    })
  }
}
</script>

<style lang="less" scoped>
.userInfo {
    display: block;
    margin-top: -.5rem;
    margin-bottom: 1rem;
    color: #9a9a9a;
}
.b-title {
  color: #303030;
  margin-top: 0;
}
h1, h2, h3, h4, h5, h6 {
  margin-bottom: .5rem;
  font-weight: bold;
  line-height: 1.25;
  text-rendering: optimizeLegibility;
  font-family: "News Cycle", "lucida grande", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", Helvetica, sans-serif;
  font-style: normal;
  font-weight: normal;
}
h1 {
  font-size: 2rem;
  display: block;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
P, li {
    line-height: 1.8;
}
li {
    display: list-item;
    text-align: -webkit-match-parent;
}
ul {
    list-style-type: disc;
}
p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}
body {
    font-family: "lucida grande", "lucida sans unicode", lucida, helvetica, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    font-size: 18px;
    padding: 2% 8% 4% 8%;
}
html {
    color: -internal-root-color;
}
img {
    display: block;
    max-width: 100%;
    margin: 0 0 1rem;
    border-radius: 5px;
}
</style>
