<template>
  <div class="page-rank-info">
    <div class="banner-wrap" :style="{backgroundImage:'url('+ imgurl + ')'}">
      <div class="rank-status container">
        <p>上次更新时间：{{getToday()}}</p>
      </div>
    </div>
    <div class="rank-info-list">
      <span class="mv-detail">
        <h3>mv介绍</h3>
      </span>
      <span>{{this.desc}}</span>
      <video width="100%" height="100%" :src="`${this.mvUrl}`" controls="controls" />
    </div>
    <div class="mv-comment">
        <h3>mv评论</h3>
    </div>
    <div v-for="(item, index) in MvList" :key="index">
      <mt-cell :title="item.content">
        <img slot="icon" :src="item.user.avatarUrl.replace('{size}', '400')" width="90" height="90" />
      </mt-cell>
    </div>
  </div>
</template>
<script>
import { Indicator } from "mint-ui";
export default {
  data() {
    return {
      desc: "",
      imgurl: "",
      titie: "",
      mvUrl: "",
      MvList: []
    };
  },
  methods: {
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
      // const index = this.$route.params.id;
      this.$axios
        .get(`/api/mv/detail?mvid=${this.$route.params.id}`)
        .then(({ data }) => {
          Indicator.close();
          this.desc = data.data.desc;
          this.imgurl = data.data.cover;
          this.titie = data.data.name;
          this.$store.commit("showHeadTitle", this.titie);
        });
      this.$axios.get(`/api/mv/url?id=${this.$route.params.id}`).then(res => {
        this.mvUrl = res.data.data.url;
      });
      this.$axios
        .get(`/api/comment/mv?id=${this.$route.params.id}`)
        .then(res => {
          this.MvList = res.data.comments;
        });
    },
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.commit("showHead", true);
      vm.getList();
    });
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("showHead", false);
    next();
  },
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
    span {
      padding: 20xp;
      display: block;
      text-indent: 2rem;
      line-height: 20px;
      h3 {
        background-color: #ccc;
      }
    }
    .mv-detail {
      padding: 5px 20px;
      background-color: #ccc;
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
.mint-cell-title {
  padding: 10px 5px;
}
.mint-cell-wrapper {
  padding: 10px 5px;
}
.mv-comment{
    width: 100%;
    height: auto;
    padding: 10px 20px;
    background-color: #ccc;
}
</style>