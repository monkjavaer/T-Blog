<template>
    <div class="block">
      <el-timeline>
          <!-- <div class="block" :key="item.articleId"  data-scroll-reveal="enter bottom over 1s"> -->
              <el-timeline-item v-for="(item, index) in blogList"
              :key="index"
              :timestamp="item.createTime" placement="top">
              <el-card>
                  <h4>
                      <a href="javascript:void(0);"   @click="openQuery(item.articleId)">{{item.title}}</a>
                  </h4>
                  <p>{{item.summary}}</p>
                  <div class="more-link">
                      <p><a href="javascript:void(0);" rel="bookmark" @click="openQuery(item.articleId)">继续阅读全文 »</a></p>
                  </div>
              </el-card>
              </el-timeline-item>
          <!-- </div> -->
      </el-timeline>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 获取列表参数
      queryData: {
        title: '',
        pageNo: 1,
        pageSize: 10
      },
      blogList: [],
      total: 0
    }
  },
  created () {
    // 发起调用分页接口
    this.getBlogPageList()
  },
  methods: {
    // 调用分页接口方法
    getBlogPageList () {
      // POST传参json格式
      this.$http
        .post('/demo/article/getArticlePageList', this.queryData)
        .then(result => {
          if (result.status === 200) {
            if (result.data.code === 200) {
              this.blogList = result.data.data.records
              this.total = result.data.data.total
            } else {
              return this.$message.error('获取列表失败')
            }
          } else {
            return this.$message.error('获取列表失败')
          }
        })
    },
    // 监听每页大小变化
    handleSizeChange (newPageSize) {
      this.queryData.pageSize = newPageSize
      this.getBlogPageList()
    },

    // 监听页码变化
    handleCurrentChange (newPageNo) {
      this.queryData.pageNo = newPageNo
      this.getBlogPageList()
    },
    // 查看文章详情
    openQuery (id) {
      // 跳转至详情页面路由，并且携带参数
      this.$router.push({
        path: '/frontBlogDetail',
        query: { 'id': id }
      })
    }
  }
}
</script>

<style lang="less" scoped>
h4 a {
  color: #555;
  text-decoration: none;
  font-size: 20px;
}
.more-link a {
    color: #268bd2;
    text-decoration: none;
    font-size: 10px;
    margin: 0;
    padding: 0;
    list-style-type: none;
    text-align: left;
    text-decoration: none;
    border-bottom: none;
    font-weight: normal;
    font-style: normal;
    border: none;
}
.el-card {
  width: 90%;
}
</style>
