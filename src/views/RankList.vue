<template>
  <div class="page-rank-info">
    <div class="banner-wrap" :style="{backgroundImage:'url('+ imgurl + ')'}">
      <div class="rank-status container">
        <p>上次更新时间：{{getToday()}}</p>
      </div>
    </div>
    <div class="rank-info-list">
      <mt-cell v-for="(item, index) in songList" @click.native="playAudio(index)" :title="item.name" :key="index">
        <span :class="getRankItemClass(index)">{{index + 1}}</span>
        <img src="../assets/images/download_icon.png" width="20" height="20" />
      </mt-cell>
    </div>
  </div>
</template>
<script>
import { Indicator } from "mint-ui";
export default {
  data() {
    return {
      songList: [],
      rankList: [
        3,
        0,
        2,
        1,
        23,
        24,
        25,
        26,
        27,
        22,
        28,
        18,
        29,
        30,
        5,
        6,
        21,
        7,
        8,
        10,
        9,
        20,
        31,
        32,
        19,
        15
      ],
      imgurl: "",
      titie:''
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
    getRankItemClass(index) {
      return {
        "rank-index": true,
        "rank-list-good": index < 3,
        "rank-list-first": index === 0,
        "rank-list-second": index === 1,
        "rank-list-third": index === 2
      };
    },
    getToday() {
      const time = new Date();
      const year = time.getFullYear();
      let month = time.getMonth() + 1;
      let date = time.getDate();
      if (month < 10) month = "0" + month;
      if (date < 10) date = "0" + date;
      return `${year}-${month}-${date}`;
    },
    getList() {
      Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      const index = this.$route.params.id;
      this.$axios
        .get(`/api//top/list?idx=${this.rankList[index]}`)
        .then(({ data }) => {
          Indicator.close();
          // console.log(data);
          // console.log(data.playlist.tracks);
          this.songList = data.playlist.tracks;
          this.imgurl = data.playlist.coverImgUrl;
          this.titie=data.playlist.name
          this.$store.commit('showHeadTitle', this.titie)
        });
    },
    getSong() {}
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.commit("showHead", true);
      vm.getList();
      // console.log(vm.$store.state.head.toggle)
    });
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('showHead', false)
    next()
    // console.log(this.$store.state.head.toggle)
  },
  mounted() {}
};
</script>
<style lang="scss">
.page-rank-info {
  .banner-wrap {
    width: 100%;
    height: 200px;
    margin-top: -43px;
    position: relative;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
  }

  .rank-status {
    height: 43px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background: -webkit-linear-gradient(
      bottom,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0)
    );
    line-height: 43px;
    font-size: 15px;
    color: #fff;
  }

  .rank-info-list {
    .rank-index {
      position: absolute;
      left: 20px;
      font-size: 12px;
      margin-top: 4px;
    }

    .mint-cell-title {
      padding-left: 35px;
    }
    .rank-list-first {
      background-color: #e80000;
    }

    .rank-list-second {
      background-color: #ff7200;
    }

    .rank-list-third {
      background-color: #f8b300;
    }
  }
}

.rank-list-good {
  display: inline-block;
  padding: 2px 8px;
  left: 12px !important;
  border-radius: 8px;
  color: #fff;
  margin-top: 3px !important;
}
</style>