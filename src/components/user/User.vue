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
                    <el-input placeholder="请输入姓名或者账户查询" v-model="queryData.username" clearable @clear="getUserPageList">
                        <el-button slot="append" icon="el-icon-search" @click="getUserPageList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addUserDialogVisible = true">添加用户</el-button>
                </el-col>
            </el-row>
            <!--  用户列表 表格 -->
            <el-table :data="userList" border stripe>
              <el-table-column type="index" ></el-table-column>
              <el-table-column label="姓名" prop="name"></el-table-column>
              <el-table-column label="账户" prop="username"></el-table-column>
              <el-table-column label="手机号码" prop="phone"></el-table-column>
              <el-table-column label="年龄" prop="age"></el-table-column>
              <el-table-column label="ip地址" prop="ip"></el-table-column>
              <el-table-column label="账户状态">
                <!-- 作用域插槽获取当前行 -->
                <template slot-scope="scope">
                  <el-switch :active-value="1" :inactive-value="0"
                    v-model="scope.row.status"
                    active-color="#13ce66"
                    inactive-color="#ff4949" @change="userStatusChange(scope.row)">
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-tooltip  effect="dark" content="修改" placement="top" :enterable="false">
                    <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="openUpdateUser(scope.row.id)"></el-button>
                  </el-tooltip>
                  <el-tooltip effect="dark" content="查看" placement="top" :enterable="false">
                    <el-button type="info" icon="el-icon-message" circle size="mini" @click="openQueryUser(scope.row)"></el-button>
                  </el-tooltip>
                  <el-tooltip  effect="dark" content="删除" placement="top" :enterable="false">
                    <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deleteUser(scope.row.id)"></el-button>
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

        <!-- 用户添加弹框 -->
        <el-dialog
          title="用户添加"
          :visible.sync="addUserDialogVisible"
          width="50%" @close="closeAddUser">
          <!-- 表单 -->
          <el-form ref="addUserFormRef" :model="addUserForm" :rules="addUserRules" label-width="100px">
            <el-form-item label="登录用户名" prop="username">
              <el-input v-model="addUserForm.username" clearable></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="addUserForm.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="addUserForm.phone" clearable></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input v-model.number="addUserForm.age" clearable></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addUserDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 用户修改弹框 -->
        <el-dialog
          title="用户修改"
          :visible.sync="updateUserDialogVisible"
          width="50%" @close="closeUpdateUser">
          <!-- 表单 -->
          <el-form ref="updateUserFormRef" :model="updateUserForm" :rules="addUserRules" label-width="100px">
            <el-form-item label="登录用户名" prop="username">
              <el-input v-model="updateUserForm.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="updateUserForm.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="updateUserForm.phone" clearable></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input v-model.number="updateUserForm.age" clearable></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="updateUserDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateUser">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 用户详情弹框 -->
        <el-dialog
          title="用户信息"
          :visible.sync="queryUserDialogVisible"
          width="50%" >
          <!-- 表单 -->
          <el-form  :model="queryUserForm" label-width="100px">
            <el-form-item label="登录用户名" prop="username">
              <el-input v-model="queryUserForm.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="queryUserForm.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="queryUserForm.phone" disabled></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input v-model.number="queryUserForm.age" disabled></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="queryUserDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data () {
    // 自定义校验规则
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      } else {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 1) {
            callback(new Error('年龄不能为0或负数'))
          } else {
            callback()
          }
        }
      }
    }
    // 手机号码正则验证
    var checkPhone = (rule, value, callback) => {
      const regPhone = /^1(3|4|5|6|7|8|9)\d{9}$/
      if (regPhone.test(value)) {
        callback()
      }
      return callback(new Error('请输入正确的手机号码'))
    }
    return {
      // 获取用户列表参数
      queryData: {
        username: '',
        pageNo: 1,
        pageSize: 10
      },
      userList: [],
      total: 0,
      // 默认隐藏添加用户弹框
      addUserDialogVisible: false,
      // 添加表单数据
      addUserForm: {
        username: '',
        name: '',
        age: 1,
        phone: ''
      },
      // 默认隐藏修改用户弹框
      updateUserDialogVisible: false,
      // 修改表单数据
      updateUserForm: {},
      // 默认隐藏查询用户弹框
      queryUserDialogVisible: false,
      queryUserForm: {},
      // 添加用户表单验证规则对象
      addUserRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 50, message: '用户名长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        // 验证姓名是否合法
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 50, message: '密码长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        // 验证年龄是否合法
        age: [
          { required: false, message: '请输入年龄', trigger: 'blur' },
          { validator: checkAge, trigger: 'blur' }
        ],
        // 验证手机是否合法phone
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ]
      }
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
    },

    // 监听每页大小变化
    handleSizeChange (newPageSize) {
      this.queryData.pageSize = newPageSize
      this.getUserPageList()
    },

    // 监听页码变化
    handleCurrentChange (newPageNo) {
      this.queryData.pageNo = newPageNo
      this.getUserPageList()
    },

    // 监听状态开关变化函数
    userStatusChange (user) {
      let updateStatusData = { 'id': user.id, 'status': user.status }
      this.$http.post('/demo/user/updateUserStatus', updateStatusData).then(result => {
        if (result.data.code !== 200) {
          user.status = !user.status
          return this.$message.error('改变状态失败')
        }
        this.$message.success('修改成功')
      })
    },
    // 关闭弹框重置表单
    closeAddUser () {
      this.$refs.addUserFormRef.resetFields()
    },
    // 关闭弹框重置表单
    closeUpdateUser () {
      this.$refs.updateUserFormRef.resetFields()
    },
    // 添加用户
    addUser () {
      // 表单预验证
      this.$refs.addUserFormRef.validate(valid => {
        if (!valid) return
        this.$http.post('/demo/user/addUser', this.addUserForm).then(result => {
          if (result.data.code !== 200) {
            return this.$message.error('添加用户异常')
          }
          this.$message.success('添加成功')
          this.addUserDialogVisible = false
          this.getUserPageList()
        })
      })
    },
    // 弹出修改对话框
    openUpdateUser (id) {
      this.updateUserDialogVisible = true
      // 根据id获取数据
      this.$http.get('/demo/user/' + id).then(result => {
        if (result.data.code !== 200) {
          return this.$message.error('获取用户异常')
        } else {
          this.updateUserForm = result.data.data
        }
      })
    },
    // 查询用户详情弹框
    openQueryUser (user) {
      this.queryUserDialogVisible = true
      this.queryUserForm = user
    },
    // 修改用户
    updateUser () {
      // 表单预验证
      this.$refs.updateUserFormRef.validate(valid => {
        if (!valid) return
        this.$http.post('/demo/user/updateUser', this.updateUserForm).then(result => {
          if (result.data.code !== 200) {
            return this.$message.error('修改用户异常')
          }
          this.$message.success('修改成功')
          this.updateUserDialogVisible = false
          this.getUserPageList()
        })
      })
    },
    // 删除用户
    deleteUser (id) {
      this.$confirm('正在删除用户, 是否继续?', '提示信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get('/demo/user/deleteUser?id=' + id).then(result => {
          if (result.data.code !== 200) {
            return this.$message.error('删除用户异常')
          } else {
            this.$message.success('删除成功')
            // 删除后刷新列表
            this.getUserPageList()
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
