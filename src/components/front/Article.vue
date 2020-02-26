<template>
  <el-container>
      <el-header height="0">Header</el-header>
      <el-container >
            <el-aside width="18%" >
                <div class="aside">
                    <div class="logo">
                        <a href="http://127.0.0.1:8080" title="阿汤哥的技术博客" rel="home">
                        <img src="../../assets/me.jpeg" class="logo-img" alt="logo" />
                        </a>
                    </div>
                    <div class="myName">
                        <h1>monkjavaer</h1>
                        <h3 class="description">乐观 ，自省， 皮实 <br/> <br/>
                        希望自己成为一个有钱且有趣的人，实在不行，光有钱也行。<br/>
                        The future is scary, but you can’t just run to the past cause it’s familiar.
                        </h3>
                    </div>
                    <ul class="side-nav">
                        <li class="side-nav-item">
                            <el-link icon="iconfont icon-shouye" :underline="false"><a href="/">Home</a></el-link>
                        </li>
                        <li class="side-nav-item">
                            <el-link icon="iconfont icon-wode" :underline="false"><a href="javascript:void(0);"   @click="aboutMe">关于我</a></el-link>
                        </li>
                    </ul>
                </div>
            </el-aside>
            <el-main >
                <!-- 路由占位符 -->
                <router-view></router-view>
            </el-main>
        </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    aboutMe () {
      this.$router.push('/about')
    }
  }
}
</script>

<style lang="less" scoped>
* {
        box-sizing: border-box;
}
html {
    font-family: "PT Sans", Helvetica, Arial, sans-serif;
    font-size: 20px;
}
.el-container {
  background-color: #ffffff;
  height: 100%;
}
.aside {
    margin-top: 70px;
    // max-width: 38rem;
    // padding-left: 1rem;
    // padding-right: 1rem;
    margin-left: auto;
    margin-right: auto;
}
.el-aside {
    padding: 2rem 1rem;
    background-color: #265a87;
    text-align: left;
    color: rgba(255,255,255,.5);
}
div {
    display: block;
}

.logo-img {
    max-width: 150px;
    border-radius: 100px;
}
.logo {
    display: inline-block;
    margin-bottom: 3px;
    margin-left: 15px;
}

.myName {
    margin-top: 15px;
    margin-bottom: 15px;
    margin-left: 15px;
}
.myName h1 {
    font-size: 1.55rem;
    font-weight: 300px;
    font-family: "PT Sans", "Abril Fatface", serif;
    color: #fff;
    margin-top: 0;
}
h1 {
    margin-bottom: .5rem;
    font-weight: bold;
    line-height: 1.25;
    text-rendering: optimizeLegibility;
    display: block;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}
.description {
    display: block;
    font-size: 0.95rem;
    font-weight: 100px;
    font-family: "PT Sans", Helvetica, Arial, sans-serif;
    line-height: 1.5;
}
p {
    margin-top: 0;
    margin-bottom: 1rem;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}
.side-nav {
    padding-left: 0px;
}
.side-nav {
    margin-bottom: 1rem;
}
ul {
    margin-top: 0;
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
}
.side-nav-item {
    display: block;
    line-height: 1.75;
}
.side-nav-item.active {
    font-weight: bold;
}
li {
    text-align: -webkit-match-parent;
}
.side-nav a {
    color: #fff;
    margin-top: 15px;
    margin-left: 15px;
}
a {
    text-decoration: none;
    cursor: pointer;
}
</style>
