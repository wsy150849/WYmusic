<template>
  <div class="header">
    <HeaderLogo/>
    <HeaderRank v-if='bool.toggle' :title="bool.title" :cStyle="bool.style"/>
    <HeaderNav v-if='!bool.toggle'/>
    <!-- <HeaderRank v-show="!head.taggle" :title="head.title" :cStyle="head.style"/> -->
  </div>
</template>
<script>
import HeaderLogo from './header-loge'
import HeaderNav from './header-nav'
import HeaderRank from './headerRank'
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      // bool:true
    }
  },
    components:{
        HeaderLogo,
        HeaderNav,
        HeaderRank
    },
    computed: {
        ...mapGetters(['head']),
        bool(){
         return this.$store.getters.head
        }
    },
}
</script>