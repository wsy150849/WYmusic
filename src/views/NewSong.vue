<template>
  <div>
    <mt-swipe :auto="5000">
      <mt-swipe-item v-for="(banner, index) in banners" :key="index">
        <a>
          <img :src="banner.picUrl"/>
        </a>
      </mt-swipe-item>
    </mt-swipe>

    <mt-cell
      v-for="(song, index) in songList"
      :title="song.name"
      @click.native="playAudio(index)"
      :key="index"
    >
      <img src="../assets/images/download_icon.png" width="20" height="20" />
    </mt-cell>
  </div>
</template>
<script>
import { Indicator } from "mint-ui";
import {PLAY_AUDIO} from '../plays/index'
export default {
  plays:[PLAY_AUDIO],
  data() {
    return {
      banners: [],
      songList: []
    };
  },
  methods: {
    playAudio (index) {
          const songInfo = this.songList[index]
          this.$store.commit('setListInfo', {
            list: this.songList,
            index: index
          })
          this.$store.dispatch('getSong', songInfo.id)
          this.$store.dispatch('getLrc', songInfo.id)
        },
    getSongs() {
      Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      this.$axios
        .get("/api/personalized/newsong")
        .then(({ data }) => {
          this.banners = data.result
          this.songList = data.result;
        })
        .then(() => {
          Indicator.close();
        });
    }
  },
  mounted() {
      this.getSongs()
  },
};
</script>

<style lang='scss' scoped>
.mint-swipe {
  height: 39vw !important;
  img{
      width: 100%;
      height: 100%;
  }
}
.mint-swipe-items-wrap{
    top: 92px;
}
.mint-swipe-indicator {
  width: 12px !important;
  height: 12px !important;
}

.mint-swipe-indicators {
  bottom: 5px !important;
}
</style>