<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <Transition name="fade">
        <component :is="Component" />
      </Transition>
    </router-view>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'App',
  components: {},
  computed: {
    ...mapState({
    })
  },
  data () {
    return {
      
    };
  },
  methods: {
  },
  mounted () {
  },
  updated () {
    window.scroll(0, 0);
  }
}
</script>
<style lang="scss">
@import "../assets/scss/reset.scss";
#app{
  touch-action:none;
  touch-action: pan-y;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.heanderBox{
  background: red;
}
@custom-media --small-viewport (width < 1000px);

</style>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
.mainBox{
    width: 100%;
    height: auto;
    position: relative;
    .searchMainBox{
      margin:0 -8px;
      display: flex;
      flex-wrap: wrap;
      .searchItemBox{
        width: 20%;
        margin: 8px 0;
        padding: 0px 8px;
        &.dateTimeRangeBox{
          width:36%;
        }
        &.selectBox{
          width:auto;
        }
      }
      .btnBox{
        margin: 8px 0 !important;
        padding: 0px 8px !important;
      }
      .searchBtnGroup{
        display: flex;
        align-items: center;
      }
  }
  .btnGroupBox{
      position: absolute;
      right: 25px;
      top: 5px;
      &.block{
        position: static;
        margin-top: 10px;
      }
  }
  
}
@media screen and (max-width:768px){
  .mainBox{
    .searchMainBox{
        .searchItemBox{
          width: 100%;
          &.dateTimeRangeBox{
            width:100%;
          }
          &.selectBox{
            width:100%;
          }
        }
      }
      .btnGroupBox{
        position: static;
        text-align:right;
      }
  }
}

</style>
