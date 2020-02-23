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
        </el-card>

    </div>
</template>

<script>
export default {
  data () {
    return {
      userList: [],
      total: 0
    }
  },
  created () {

  },
  methods: {
    getUserPageList () {
    // POST传参json格式
      this.$http.post('/demo/user/getUserPageList', {
        username: this.loginForm.username,
        password: this.loginForm.password
      }).then(result => {
        console.log(result)
        console.log(result.data)
        if (result.status === 200) {
          if (result.data.code === 200) {
            // 登录成功，保存token到sessionStorage
            window.sessionStorage.setItem('token', result.data.data)
            // 通过编程式导航跳转到主页
            this.$router.push('/home')
            return this.$message.success('登录成功')
          } else {
            return this.$message.error('登录失败')
          }
        } else {
          return this.$message.error('登录失败')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
