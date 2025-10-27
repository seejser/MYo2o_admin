<template>
  <div class="ImageListBox">
    <a-button type="primary" ghost class="uploadBtn">
      <template #icon>
        <IconPark type="addFour" theme="outline" />
      </template>
      <span >上传图片</span>
      <input 
        type="file" 
        class="uploadFileBtn_input" 
        @change="imageChange" 
        ref="photoInput" 
        accept="image/jpeg,image/jpg,image/png"/>
    </a-button>
    <a-carousel arrows>
      <template #nextArrow>
        <div class="custom-slick-arrow" style="right: 10px">
          <IconPark type="RightC" theme="outline" />
        </div>
      </template>
      <div
        v-for="(item,index) in list"
        :key="index" 
        class="imageMainBox">
        <a-image :src="item" height="200px"/>
        <IconPark type="CloseOne" theme="filled" class="deleteBtn" @click="removeImage(index)"></IconPark>
      </div>
    </a-carousel>
    <a-alert message="图片请先自行压缩 https://tinypng.com/" type="info" show-icon/>
  </div>
</template>

<script> 
import { mapState, mapActions } from 'vuex'
import { saveData, getData } from '@/libs/utils.js';
import {IconPark} from '@icon-park/vue-next/es/all';
import {imageUpload} from "@/libs/UploadUtil.js";
export default {
  name: 'ImageList',
  props: {
    list:{
      default:[],
      type:Array
    },
  },
  components: { 
    IconPark
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    ...mapState({}),
  },
  methods: {
    imageChange(e){
      if(this.loading) return false;
      if(this.$refs.photoInput.files.length <= 0 || this.$refs.photoInput.files[0] == null || this.$refs.photoInput.files[0] == undefined){
          return;
      }
      let file = this.$refs.photoInput.files[0];
      this.loading = true;
      imageUpload(file,(imgUrl) => {
        this.loading = false;
        if(imgUrl && imgUrl != undefined){
          this.$refs.photoInput.value = "";
          let list = JSON.parse(JSON.stringify(this.list));
          list.push(imgUrl);
          this.$emit('update:list', list); 
        }
      })
    },
    removeImage(index){
      this.$confirm({
        title: '提示',
        content: '是否确定删除?',
        okText: '确定',
        cancelText: '取消',
        onOk:() =>{
          if(index >= 0 && index < this.list.length){
            let list = JSON.parse(JSON.stringify(this.list));
            list.splice(index,1);
            this.$emit('update:list', list); 
          }
        },
        onCancel:() =>{
        },
      });
    }
  },
  created() {
  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
  .ImageListBox{
    position: relative;
    width:100%;
    .uploadBtn{
      margin-bottom: 20px;
      position: relative;
      width:100px;
      input{
        position: absolute;
        width: 100%;
        height: 100%;
        opacity:0;
        z-index: 2;
        top: 0;
        left: 0;
      }
    }
    .imageMainBox{
      position: relative;
      width:100%;
      height: 200px;
      text-align: center;
      overflow: hidden;
      z-index: 2;
      img{
        height: 200px;
        
      }
      .deleteBtn{
        position: absolute;
        z-index: 2;
        font-size: 20px;
        color: red;
        right: 0;
        top: 0;
      }
    }
    .ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
      width: 25px;
      height: 25px;
      font-size: 25px;
      color: #000;
      background-color: rgba(31, 45, 61, 0.11);
      opacity: 0.3;
    }
    .ant-carousel :deep(.custom-slick-arrow:before) {
      display: none;
    }
    .ant-carousel :deep(.custom-slick-arrow:hover) {
      opacity: 0.5;
    }

    .ant-carousel :deep(.slick-slide h3) {
      color: #fff;
    }
  }
</style>
