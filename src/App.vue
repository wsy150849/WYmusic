<template>
  <div id="app">
    <HeaderMain ></HeaderMain>
    <div class="main">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <PlayMusic/>
    <PlayLyric/>
  </div>
</template>
<script>
import HeaderMain from './components/header/header-main'
import PlayMusic from './components/play-music'
import PlayLyric from './components/play-lyric'
// import {mapGetters} from 'vuex'
export default {
  components:{
    HeaderMain,
    PlayMusic,
    PlayLyric
  },
  // computed: {
  //       ...mapGetters(['head'])
        
  //   },
}
</script>
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  padding-top: 92px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
