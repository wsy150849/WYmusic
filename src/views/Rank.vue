<template>
  <div class="page-rank">
    <mt-cell
      v-for="(item, index) in songList"
      :title="item.name"
      :to="`/rank/list/${index}`"
      is-link
      :key="index"
    >
      <img slot="icon" :src="item.coverImgUrl.replace('{size}', '400')" width="90" height="90"/>
    </mt-cell>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";
export default {
  data() {
    return {
      songList: [],
      
    };
  },
  methods: {
    getList() {
      Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      this.$axios.get("/api/toplist").then(({ data }) => {
        Indicator.close();
        this.songList = data.list
      });
    },
  },
  mounted() {
    this.getList();
  }
};
</script>
<style lang="scss">
.page-rank {
  .mint-cell-title img {
    margin-right: 10px;
  }

  .mint-cell-wrapper {
    font-size: 16px;
    padding: 10px 5px;
  }
}
</style>