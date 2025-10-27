<template>
  <viewer 
    :options="options" 
    :images="images"
    @inited="inited"
    class="viewer" 
    ref="viewer"
    >
      <template #default="scope">
        <img v-for="(src,index) in scope.images" :src="src" :key="index">
      </template>
    </viewer>
</template>

<script>
import 'viewerjs/dist/viewer.css'
import { component as Viewer } from "v-viewer"
export default {
  name: 'PicPreviewModal',
  components: {Viewer},
  data() {
    return {
      options: {navbar: false,title:false,movable: false,fullscreen:false},
      images:[],
    }
  },
  methods: {
    inited (viewer) {
      this.$viewer = viewer
    },
    show (images) {
      this.$viewer.show();
      this.images = images;
    }
  }
}
</script>

<style lang="scss" scoped>
  .viewer{
    display: none;
  }
 
  
</style>
