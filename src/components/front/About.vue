<template>
    <div class="article" v-html="about.content" v-highlight></div>
</template>

<script>
export default {
  data () {
    return {
      about: {},
      loading: false
    }
  },
  mounted: function () {
    // 根据id获取数据
    this.$http.get('/demo/about/1').then(result => {
      if (result.data.code !== 200) {
        return this.$message.error('获取异常')
      } else {
        this.about = result.data.data
        this.loading = true
      }
    })
  }
}
</script>

<style lang="less" scoped>
.article {
  margin-top: 6%;
  margin-left: 6%;
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
