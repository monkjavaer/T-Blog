<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img class="logo" src="../assets/logo.png" alt />
        <span>博客院后台管理系统</span>
      </div>
      <el-button type="info" @click="loginout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="iscollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggle">|||</div>
        <!-- 侧边栏菜单区 router表示开启路由模式； unique-opened表示只有一个菜单展开 -->
        <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
        unique-opened :collapse="iscollapse" :collapse-transition="false" router
        :default-active="activePath">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id" >
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="icons[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.menuName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/' + subItem.menuPath" v-for="subItem in item.childrenList" :key="subItem.id" @click="saveNavState('/' + subItem.menuPath)">
              <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-menu"></i>
              <!-- 文本 -->
              <span>{{subItem.menuName}}</span>
            </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menuList: [],
      icons: {
        '1': 'iconfont icon-set',
        '4': 'iconfont icon-integral-fill'
      },
      iscollapse: false,
      activePath: ''
    }
  },
  created () {
    this.getMenuList()
    // 从缓存中取高亮的path
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    // 退出
    loginout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取菜单树
    async getMenuList () {
      const { data: res } = await this.$http.get('/demo/menu/getMenu')
      if (res.code === 200) {
        this.menuList = res.data
      } else {
        return this.$message.error(res.message)
      }
    },
    // 菜单折叠展开
    toggle () {
      this.iscollapse = !this.iscollapse
    },
    // 保存链接的激活状态
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #283e5c;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 26px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
  img {
    height: 60px;
    width: 60px;
  }
}

.el-aside {
  background-color: #545c64;
  .el-menu {
    // 解决右侧边缘不齐问题
    border-right: none;
  }
}
.el-main {
  background-color: #F7F7F7;
}

.iconfont {
  margin: 10px
}

.toggle-button {
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  clear: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
