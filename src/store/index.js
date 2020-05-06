import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
// Vue.prototype.$axios=axios
export default new Vuex.Store({
  state: {
    audio: {
      songUrl: '',
      imgUrl: 'http://9.pic.pc6.com/thumb/n131c2ad1893a/16f5d3e9143191b1_160_160.png',
      title: '',
      singer: '',
      currentLength: 0,
      songLength: 0,
      currentFlag: false
    },
    head: {
      toggle: false,
      title: '',
      style: { 'background': 'rgba(43,162,251,0)' }
    },
    audioLoading: false,
    detailPlayerFlag: false,
    showPlayer: false,
    listenCount: 0,
    isPlay: false,
    listInfo: {
      songList: [],
      songIndex: 0
    }
  },
  getters: {
    audio: state => state.audio,
    head: state => state.head,
    audioLoading: state => state.audioLoading,
    detailPlayerFlag: state => state.detailPlayerFlag,
    showPlayer: state => state.showPlayer,
    isPlay: state => state.isPlay
  },
  mutations: {
    setAudio(state, audio) {
      if (!state.listenCount) {
        state.showPlayer = true // 首次进入应用时不可打开播放详情
      }
      state.listenCount++
      state.audio = { ...(state.audio), ...audio }
    },
    setAudioTime(state, time) {
      state.audio.currentLength = time
    },
    setCurrent(state, flag) {
      state.audio.currentFlag = flag
    },
    showHead(state, flag) {
      state.head.toggle = flag
    },
    showHeadTitle(state, title) {
      state.head.title = title
    },
    setHeadStyle(state, style) {
      state.head.style = style
    },
    resetHeadStyle: state => {
      state.head.style = { 'background': 'rgba(43,162,251,0)' }
    },
    toggleAudioLoading: (state, flag) => {
      state.audioLoading = flag
    },
    showDetailPlayer: (state, flag) => {
      state.detailPlayerFlag = flag
    },
    showPlayer: (state, flag) => {
      state.showPlayer = flag
    },
    isPlay: (state, flag) => {
      state.isPlay = flag
    },
    setLrc: (state, lrc) => {
      state.audio = { ...state.audio, lrc }
    },
    setListInfo: (state, { list, index }) => {
      state.listInfo.songList = list
      state.listInfo.songIndex = index
    }
  },
  actions: {
    getSong({ commit }, id) {
      if (id) {
        commit('toggleAudioLoading', true)
        axios.get(`/api/song/url?id=${id}`).then((res) => {
          const data = res.data.data[0]
          const songUrl = data.url
          const currentLength = 0
          const audio = { songUrl, currentLength }//imgUrl, title, singer, songLength,
          commit('setAudio', audio)
          commit('toggleAudioLoading', false)
          commit('isPlay', true)
        })
        axios.get(`/api/song/detail?ids=${id}`).then(res => {
          const data = res.data.songs[0]
          const imgUrl = data.al.picUrl.replace('{size}', 400)
          const title = data.name
          // const songLength = data.timeLength
          const singer = data.ar[0].name
          const audio = { imgUrl, title, singer }//imgUrl, title, singer, songLength,
          commit('setAudio', audio)
          commit('toggleAudioLoading', false)
        })
      }
    },
    getLrc({ commit }, id) {
      if (id) {
        axios.get(`/api/lyric?id=${id}`).then(res => {
          console.log(res.data.lrc.lyric)
          const data=res.data.lrc.lyric
          commit('setLrc', data)
        })
      }
    },
    prev({ dispatch, state }) {
      const list = state.listInfo.songList
      if (state.listInfo.songIndex === 0) {
        state.listInfo.songIndex = list.length
      } else {
        state.listInfo.songIndex--
      }
      const hash = list[state.listInfo.songIndex]
      dispatch('getSong', hash.id)
    },
    next({ dispatch, state }) {
      if (state.listInfo.songList.length != 0) {
        const list = state.listInfo.songList
        if (state.listInfo.songIndex === list.length - 1) {
          state.listInfo.songIndex = 0
        } else {
          ++state.listInfo.songIndex
        }
        const hash = list[state.listInfo.songIndex]// && list[state.listInfo.songIndex].hash
        dispatch('getSong', hash.id)
      }
    }
  },
  modules: {
  }
})
