<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 表单区域 -->
      <div>
        <el-form ref="loginRef" :model="loginForm" :rules="loginRules" label-width="0px" class="login_form">
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" prefix-icon="iconfont icon-bussiness-man"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" prefix-icon="iconfont icon-unlock" type="password"></el-input>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item class="btns">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 数据绑定对象
      loginForm: {
        username: '',
        password: ''
      },
      // 表单验证规则对象
      loginRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '用户名长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '密码长度在 6 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 重置函数
    resetLoginForm () {
      this.$refs.loginRef.resetFields()
    },
    // 登录函数
    login () {
      // 表单提交预验证
      this.$refs.loginRef.validate(valid => {
        if (valid) {
          // 校验通过发起后台请求
          // const { data: res } = await this.$http.post('login', this.loginForm)
          // if (res.meta.status === 200) {
          //   console.log('登录成功')
          // }

          // GET 方式
          // 路径拼接参数
          // this.$http.get('/loginGet?username=' + this.loginForm.username).then(function (result) {
          //   console.log(result)
          //   console.log(result.data)
          // })

          // params传参数
          // this.$http.get('/loginGet', {
          //   params: {
          //     username: this.loginForm.username
          //   }
          // }).then(function (result) {
          //   console.log(result)
          //   console.log(result.data)
          // })

          // post 表单提交
          // var params = new URLSearchParams()
          // params.append('username', this.loginForm.username)
          // params.append('password', this.loginForm.password)
          // this.$http.post('/loginPostForm', params).then(function (result) {
          //   console.log(result)
          //   console.log(result.data)
          // })

          // POST传参json格式
          this.$http.post('/login/in', {
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
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
