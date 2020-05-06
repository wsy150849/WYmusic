<template>
  <div class="page-video">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">
        <p @click="getNewMv('全部')">全部</p>
      </mt-tab-item>
      <mt-tab-item id="2">
        <p @click="getNewMv('内地')">内地</p>
      </mt-tab-item>
      <mt-tab-item id="3">
        <p @click="getNewMv('港台')">港台</p>
      </mt-tab-item>
      <mt-tab-item id="4">
        <p @click="getNewMv('欧美')">欧美</p>
      </mt-tab-item>
      <mt-tab-item id="5">
        <p @click="getNewMv('日本')">日本</p>
      </mt-tab-item>
      <mt-tab-item id="6">
        <p @click="getNewMv('韩国')">韩国</p>
      </mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <mt-cell :to="`/video/detail/${item.id}`" v-for="(item, index) in MvList" :title="item.name" :key="index">
          <img slot="icon" :src="item.cover.replace('{size}', '400')" width="90" height="90" />
        </mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <mt-cell :to="`/video/detail/${item.id}`"  v-for="(item, index) in MvList" :title="item.name" :key="index">
          <img slot="icon" :src="item.cover.replace('{size}', '400')" width="90" height="90" />
        </mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <mt-cell :to="`/video/detail/${item.id}`"  v-for="(item, index) in MvList" :title="item.name" :key="index">
          <img slot="icon" :src="item.cover.replace('{size}', '400')" width="90" height="90" />
        </mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <mt-cell :to="`/video/detail/${item.id}`"  v-for="(item, index) in MvList" :title="item.name" :key="index">
          <img slot="icon" :src="item.cover.replace('{size}', '400')" width="90" height="90" />
        </mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="5">
        <mt-cell :to="`/video/detail/${item.id}`"  v-for="(item, index) in MvList" :title="item.name" :key="index">
          <img slot="icon" :src="item.cover.replace('{size}', '400')" width="90" height="90" />
        </mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="6">
        <mt-cell :to="`/video/detail/${item.id}`"  v-for="(item, index) in MvList" :title="item.name" :key="index">
          <img slot="icon" :src="item.cover.replace('{size}', '400')" width="90" height="90" />
        </mt-cell>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import { Indicator } from "mint-ui";
export default {
  data() {
    return {
      selected: "1",
      MvList: []
    };
  },
  methods: {
    getMv() {
      Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      this.$axios.get("/api/mv/all").then(res => {
        Indicator.close();
        this.MvList = res.data.data;
      });
    },
    getNewMv(index){
        Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      this.$axios.get(`/api/mv/all?area=${index}`).then(res => {
        Indicator.close();
        this.MvList = res.data.data;
      });
    }
  },
  mounted() {
    this.getMv();
  }
};
</script>
<style lang="scss">
.page-video {
  .mint-cell-text {
    position: absolute;
    left: 120px;
    top: 23px;
    padding-right: 40px;
    height: 16px;
    overflow: hidden;
    line-height: 16px;
  }
//   .mint-cell-label {
//     position: absolute;
//     left: 80px;
//     top: 38px;
//   }
  .mint-cell-wrapper {
    padding: 10px 5px;
  }
}
</style>