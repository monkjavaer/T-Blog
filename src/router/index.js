import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Blog from '../components/blog/Blog.vue'
import BlogList from '../components/blog/BlogList.vue'
import BlogDetail from '../components/blog/BlogDetail.vue'
import User from '../components/user/User.vue'
import Article from '../components/front/Article.vue'
import FrontBlog from '../components/front/FrontBlog.vue'
import About from '../components/front/About.vue'
import FrontBlogDetail from '../components/front/FrontBlogDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    /* 斜线重定向 */
    redirect: '/article'
  },
  {
    path: '/article',
    component: Article,
    // 访问article时重定向到welcome
    redirect: '/frontBlog',
    // 子路由
    children: [
      {
        path: '/about',
        component: About
      },
      {
        path: '/frontBlog',
        component: FrontBlog
      },
      {
        path: '/frontBlogDetail',
        component: FrontBlogDetail
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    // 访问home时重定向到welcome
    redirect: '/welcome',
    // 子路由
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/user',
        component: User
      },
      {
        path: '/blog',
        component: Blog
      },
      {
        path: '/blogList',
        component: BlogList
      },
      {
        path: '/blogDetail',
        component: BlogDetail
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫(权限控制)
// to 将要访问的路径
// from 代表从哪个路径跳转而来
// next 是一个函数，表示放行
router.beforeEach((to, from, next) => {
  // next('/login')  强制跳转
  if (to.path === '/login' || to.path === '/article' ||
  to.path === '/test' || to.path === '/frontBlog' || to.path === '/frontBlogDetail' || to.path === '/about') {
    return next()
  }
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    return next('/login')
  }
  next()
})
export default router
