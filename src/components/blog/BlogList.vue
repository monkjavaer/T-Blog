<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>文章管理</el-breadcrumb-item>
            <el-breadcrumb-item>文章列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片 -->
        <el-card >
            <el-row :gutter="20">
                <el-col :span="7">
                    <!-- 搜索区 -->
                    <el-input placeholder="请输入文章标题检索" v-model="queryData.title" clearable @clear="getBlogPageList">
                        <el-button slot="append" icon="el-icon-search" @click="getBlogPageList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="toEdit">写文章</el-button>
                </el-col>
            </el-row>
            <!--  列表 表格 -->
            <el-table :data="blogList" border stripe>
              <el-table-column type="index" ></el-table-column>
              <el-table-column label="作者" prop="author"></el-table-column>
              <el-table-column label="文章标题" prop="title"></el-table-column>
              <el-table-column label="发布时间" prop="createTime"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-tooltip  effect="dark" content="修改" placement="top" :enterable="false">
                    <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="openUpdateUser(scope.row.id)"></el-button>
                  </el-tooltip>
                  <el-tooltip effect="dark" content="查看" placement="top" :enterable="false">
                    <el-button type="info" icon="el-icon-message" circle size="mini" @click="openQuery(scope.row.articleId)"></el-button>
                  </el-tooltip>
                  <el-tooltip  effect="dark" content="删除" placement="top" :enterable="false">
                    <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deleteData(scope.row.articleId)"></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>

          <!-- 分页条 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryData.pageNo"
            :page-sizes="[10, 20, 40]"
            :page-size="queryData.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-card>
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
      this.$http.post('/demo/article/getArticlePageList', this.queryData).then(result => {
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
    // 写文章界面
    toEdit () {
      this.$router.push('/blog')
    },
    // 查看文章详情
    openQuery (id) {
      // 跳转至详情页面路由，并且携带参数
      this.$router.push({
        path: '/blogDetail',
        query: { 'id': id }
      })
    },
    // 删除
    deleteData (id) {
      this.$confirm('正在删除数据, 是否继续?', '提示信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get('/demo/article/deleteData?id=' + id).then(result => {
          if (result.data.code !== 200) {
            return this.$message.error('删除数据异常')
          } else {
            this.$message.success('删除成功')
            // 删除后刷新列表
            this.getBlogPageList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
