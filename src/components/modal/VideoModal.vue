<template>
  <a-modal
    title="视频播放"
    v-model:visible="visible"
    :footer="false"
    width="60%"
  >
    <video 
      class="videoBox" 
      :src="url" 
      controls></video>
  </a-modal>
</template>

<script> 
export default {
  name: 'VideoModal',
  data() {
    return {
      visible:false,
      url:'',
    }
  },
  methods: {
    showModal(url){
      this.url = url;
      this.visible = true;
    },
  }
}
</script>

<style lang="scss" scoped>
  .videoBox{
    width: 100%;
    height: auto;
  }
  
</style>
