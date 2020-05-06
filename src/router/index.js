import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '../views/Search.vue'
import NewSong from '../views/NewSong.vue'
import Rank from '../views/Rank.vue'
import RankList from '../views/RankList.vue'
import SongSheet from '../views/SongSheet.vue'
import Mv from '../views/MvVideo.vue'
import SheetList from '../views/SheetList.vue'
import VideoDetails from '../views/VideoDetails.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/search',
    component: Search
  },
  {
    path: '/newSong',
    name: 'newSong',
    component: NewSong,
    alias: '/'
  },
  {
    path: '/rank',
    name: 'rank',
    component: Rank
  },
  {
    path: '/rank/list/:id',
    component: RankList
  },
  {
    path:'/sheet',
    name:'sheet',
    component:SongSheet
  },
  {
    path: '/sheet/list/:id',
    component: SheetList
  },
  {
    path:'/video',
    name:'video',
    component:Mv
  },
  {
    path: '/video/detail/:id',
    component: VideoDetails
  }
]

const router = new VueRouter({
  routes
})

export default router
