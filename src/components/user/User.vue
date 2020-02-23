<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户中心</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片 -->
        <el-card >
            <el-row :gutter="20">
                <el-col :span="7">
                    <!-- 搜索区 -->
                    <el-input placeholder="请输入内容">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary">添加用户</el-button>
                </el-col>
            </el-row>
            <!--  用户列表 表格 -->
            <el-table :data="userList" border stripe>
              <el-table-column type="index" ></el-table-column>
              <el-table-column label="姓名" prop="name"></el-table-column>
              <el-table-column label="账户" prop="username"></el-table-column>
              <el-table-column label="联系方式" prop="phone"></el-table-column>
              <el-table-column label="年龄" prop="age"></el-table-column>
              <el-table-column label="ip地址" prop="ip"></el-table-column>
              <el-table-column label="状态">
                <!-- 作用域插槽获取当前行 -->
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.status"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column label="操作"></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 获取用户列表参数
      queryData: {
        username: '',
        pageNo: 1,
        pageSize: 10
      },
      userList: [],
      total: 0
    }
  },
  created () {
    // 发起调用用户分页接口
    this.getUserPageList()
  },
  methods: {
    // 调用用户分页接口方法
    getUserPageList () {
    // POST传参json格式
      this.$http.post('/demo/user/getUserPageList', this.queryData).then(result => {
        console.log(result)
        console.log(result.data)
        if (result.status === 200) {
          if (result.data.code === 200) {
            this.userList = result.data.data.records
            this.total = result.data.data.total
          } else {
            return this.$message.error('获取用户列表失败')
          }
        } else {
          return this.$message.error('获取用户列表失败')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
