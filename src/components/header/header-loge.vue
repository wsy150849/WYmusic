<template>
    <div class="logo-container">
    <div class="head-logo">
      <a href="#">
        <img src="http://9.pic.pc6.com/thumb/n131c2ad1893a/16f5d3e9143191b1_160_160.png" />
        <span>网易云音乐</span>
      </a>
    </div>
    <div class="head-search" @click="searchRouter">
      <img src="http://m.kugou.com/v3/static/images/index/search.png" />
    </div>
  </div>
</template>
<script>
export default {
    methods: {
    searchRouter () {
      this.$router.push({ path: '/search' })
    }
  }
}
</script>

<style lang="scss" scoped>
.logo-container {
  padding: 10px;
  background-color: #333333;
  overflow: hidden;
  height: 51px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1050;

  .head-logo {
    float: left;
    height: 100%;
    img {
      height: 100%
    }
    span{
        display: inline-block;
        width: auto;
        height: 100%;
        line-height: 31px;
        font-size: 20px;
        color: white;
        margin-left: 20px;
    }
  }

  .head-search {
    float: right;
    height: 31px;
    padding: 3px 0;

    img {
      height: 100%;
    }
  }
}
</style>