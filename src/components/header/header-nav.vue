<template>
  <div class="header-nav">
    <mt-navbar class="container" v-model="routeName">
      <mt-tab-item id="newSong">推荐</mt-tab-item>
      <mt-tab-item id="rank">排行</mt-tab-item>
      <mt-tab-item id="sheet">歌单</mt-tab-item>
      <mt-tab-item id="video">mv</mt-tab-item>
    </mt-navbar>
  </div>
</template>
<script>
export default {
  name: "head-nav",
  data() {
    let routeName = this.$route.name;
    routeName = ["newSong", "rank", "sheet", "video"].includes(routeName)
      ? routeName
      : "newSong";
    return {
      routeName
    };
  },
  watch: {
    routeName (newName, oldName) {
      if (oldName !== newName) {
        this.$router.push({ path: newName })
      }
    }
  }
};
</script>

<style lang="scss" >
.header-nav {
  position: fixed;
  top: 51px;
  left: 0;
  width: 100%;
  z-index: 1000;
  border-bottom: 1px solid #e4e4e4;

  .mint-tab-item {
    padding: 12px 0 !important;
  }

  .mint-tab-item-label {
    font-size: 16px !important;
  }

  .mint-navbar .mint-tab-item.is-selected {
    margin-bottom: 0;
    border-bottom: 3px solid #e20940;
    color: #e20940;
  }
}
</style>