<template>
  <div class="page-sheet">
    <mt-navbar v-model="selected">
      <mt-tab-item :id="`${i}`" v-for="(item, i) in Songsheet" :key="i">
        <p @click="getSongSheet(item.name)">{{item.name}}</p>
      </mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item :id="`${i}`" v-for="(item, i) in Songsheet" :key="i">
        <mt-cell
          v-for="(item, index) in SongList"
          :title="item.name"
          is-link
          :label="String(item.playCount)"
          :key="index"
          :to="`/sheet/list/${item.id}`"
        >
          <img slot="icon" :src="item.coverImgUrl.replace('{size}', '400')" width="50" height="50" />
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
      Songsheet: [],
      SongList: [],
      selected: "0"
    };
  },
  methods: {
    getSheet() {
      Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      this.$axios.get("/api/playlist/hot").then(({ data }) => {
        Indicator.close();
        this.Songsheet = data.tags;
      });
      this.$axios
        .get(`/api/top/playlist?limit=20&order=new&cat=华语`)
        .then(({ data }) => {
          Indicator.close();
          this.SongList = data.playlists;
        });
    },
    getSongSheet(index) {
      Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      this.$axios
        .get(`/api/top/playlist?limit=20&order=new&cat=${index}`)
        .then(({ data }) => {
          Indicator.close();
          this.SongList = data.playlists;
        });
    }
  },
  mounted() {
    this.getSheet();
  }
};
</script>

<style lang="scss">
.page-sheet {
  .mint-cell-text {
    position: absolute;
    left: 80px;
    top: 23px;
    padding-right: 40px;
    height: 16px;
    overflow: hidden;
    line-height: 16px;
  }
  .mint-cell-label {
    position: absolute;
    left: 80px;
    top: 38px;
  }
  .mint-cell-label:before {
    content: "";
    display: inline-block;
    margin-right: 6px;
    width: 12px;
    height: 12px;
    background: url("../assets/images/icon_music.png") no-repeat center;
    background-size: 100%;
  }
  .mint-cell-wrapper {
    padding: 10px 5px;
  }
}
</style>