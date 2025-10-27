<template>
  <a-modal
    title="文件预览"
    v-model:visible="visible"
    centered
    :footer="null"
    :closable="true"
    width="65%"
  >
    <div 
      class="filePreviewBox" 
      ref="filePreviewBox"></div>
    <div 
      class="pdfPreviewBox"
      ref="pdfPreviewBox"></div>
    <div class="pdfPaginationBox" v-if="pdfPageNum > 0">
      <a-button class="btnBox" size="small" @click="pdfLast">上一页</a-button>
      <a-button class="btnBox" size="small" @click="pdfNext">下一页</a-button>
    </div>
    <div class="pdfPageBox" v-if="pdfPageNum > 0">
      {{currentPageNum}}&nbsp;/&nbsp;{{pdfPageNum}}
    </div>
    <div class="xlsxPreviewBox" v-if="excelData && excelData.length > 0">
      <a-table 
        :data-source="excelData"
        :scroll="{x:800}"
        :row-key="(record,index) => index" >
        <a-table-column 
          v-for="(value, key, index2) in excelData[0]"
          :key="index2"
          align="center"
          :dataIndex="key"
          :title="key">
          <template #default="{ text}">
            <span>
              {{text}}
            </span>
          </template>
        </a-table-column>
      </a-table>
    </div>
  </a-modal>
</template>

<script> 
import axios from '../../../node_modules/axios';
import * as PDFJS from "pdfjs-dist/legacy/build/pdf";
export default {
  name: 'FilePreviewModal',
  props: {
  },
  data() {
    return {
      visible:false,
      fileUrl: "",
      fileType:"",
      loading:false,
      pdfWidth:0,
      pdfPageNum:0,
      currentPageNum:0,
      pdfData:null,
      pdfLoading:false,
      excelData:[],
    }
  },
  methods: {
    show(fileUrl){
      this.loading = false;
      this.visible = true;
      this.pdfPageNum = 0;
      this.currentPageNum = 0;
      this.pdfData = null;
      this.pdfLoading = false;
      this.fileUrl = fileUrl;
      this.excelData = [];
      this.fileType = this.fileUrl.substring(this.fileUrl.lastIndexOf('.') + 1).toLowerCase(); //获取文件名称（并且小写）
      this.$nextTick(() => {
        this.$refs.pdfPreviewBox.innerHTML = "";
        this.$refs.filePreviewBox.innerHTML = "";
      });
      this.previewFile();
    },
    previewFile(){
      switch(this.fileType){
        case "docx":{
          this.docxPreview();
          break;
        }
        case "pdf":{
          this.pdfPreview();
          break;
        }
        case "xlsx":{
          this.xlsxPreview();
          break;
        }
      }
    },
    docxPreview(){
      if(this.loading){
        return false;
      }
      this.loading = true;
      axios({
        method: "get",
        responseType: "blob", // 因为是流文件，所以要指定blob类型
        url: this.fileUrl, // 
      }).then((data) => {
        this.loading = false;
        //console.log(data); // 后端返回的是流文件
        let docxPreview = require('docx-preview');
        docxPreview.renderAsync(
          data, 
          this.$refs.filePreviewBox,
          null,
          {
            className: "docx", // 默认和文档样式类的类名/前缀
            inWrapper: true, // 启用围绕文档内容渲染包装器
            ignoreWidth: false, // 禁止页面渲染宽度
            ignoreHeight: false, // 禁止页面渲染高度
            ignoreFonts: false, // 禁止字体渲染
            breakPages: true, // 在分页符上启用分页
            ignoreLastRenderedPageBreak: true,//禁用lastRenderedPageBreak元素的分页
            experimental: false, //启用实验性功能（制表符停止计算）
            trimXmlDeclaration: true, //如果为真，xml声明将在解析之前从xml文档中删除
            debug: false, // 启用额外的日志记录
          }); // 渲染到页面
      }).catch((error) => {
        console.log(error);
        this.loading = false;
      })
    },
    pdfPreview(){
      // 设置pdf.worker.js文件的引入地址
      PDFJS.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/legacy/build/pdf.worker.entry.js");
      // data是一个ArrayBuffer格式，也是一个buffer流的数据
      this.pdfData = PDFJS.getDocument({
        cMapUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.943/cmaps/",
        cMapPacked: true,
        url:this.fileUrl
      });
      this.pdfData.promise.then(async (pdfDoc) =>{
        console.log("pdfDoc:",pdfDoc);
        this.pdfDoc = pdfDoc;
        this.pdfWidth  = this.$refs.pdfPreviewBox.offsetWidth;
        const numPages = pdfDoc.numPages; // pdf的总页数
        this.pdfPageNum = numPages;
        if(this.pdfPageNum > 0){
          this.currentPageNum = 1;
          await this.pdfCanvas(pdfDoc,this.currentPageNum);
        }
      })
    },
    async pdfCanvas(pdfDoc,i){
      return new Promise((resolve,reject) => {
        pdfDoc.getPage(i).then(page =>{
          // 设置canvas相关的属性
          let canvas = document.createElement('canvas');
          // console.log("canvas:",canvas);
          const ctx = canvas.getContext("2d");
          const dpr = window.devicePixelRatio || 1;
          const bsr =
            ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio ||
            1;
          const ratio = dpr / bsr;
          let viewport = page.getViewport({ scale: 1 });
          var widthRatio = this.pdfWidth / viewport.width;
          viewport = page.getViewport({ scale: widthRatio, });
          canvas.width = viewport.width * ratio;
          canvas.height = viewport.height * ratio;
          canvas.style.width = viewport.width  + "px";
          canvas.style.height = viewport.height  + "px";
          ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
          const renderContext = {
            canvasContext: ctx,
            viewport: viewport,
          };
          // 数据渲染到canvas画布上
          page.render(renderContext);
          this.$refs.pdfPreviewBox.innerHTML = "";
          this.$refs.pdfPreviewBox.appendChild(canvas);
          resolve(true);
        })
      })
    },
    async pdfLast(){
      if(this.pdfLoading)return false;
      if(this.currentPageNum > 1){
        this.pdfLoading = true;
        this.currentPageNum -= 1;
        this.pdfData.promise.then(async (pdfDoc) =>{
          await this.pdfCanvas(pdfDoc,this.currentPageNum);
        })
        
        this.pdfLoading = false;
      }
    },
    async pdfNext(){
      if(this.pdfLoading)return false;
      if(this.currentPageNum < this.pdfPageNum){
        this.pdfLoading = true;
        this.currentPageNum += 1;
        this.pdfData.promise.then(async (pdfDoc) =>{
          await this.pdfCanvas(pdfDoc,this.currentPageNum);
        })
        this.pdfLoading = false;
      }
    },
    xlsxPreview(){
      var xhr = new XMLHttpRequest();
      xhr.open("get", this.fileUrl, true);
      xhr.responseType = "arraybuffer";
      let _this = this;
      xhr.onload = function (e) {
        if (xhr.status === 200) {
          var data = new Uint8Array(xhr.response);
          const XLSX = require("xlsx");
          var workbook = XLSX.read(data, { type: "array" });
          console.log("workbook", workbook);
          var sheetNames = workbook.SheetNames; // 工作表名称集合
          var worksheet = workbook.Sheets[sheetNames[0]];
          
          let excelData = XLSX.utils.sheet_to_json(worksheet);
          _this.excelData = [];
          _this.excelData = excelData;
          console.log("excelData:",_this.excelData);
        }
      };
      xhr.send();
    },
  },
  created(){
      
  }
}
</script>

<style lang="scss" scoped>
  .filePreviewBox{
    max-height: calc(100vh - 120px);
    overflow-y: scroll;
    user-select: none;
  }
  .pdfPreviewBox{
    max-height: calc(100vh - 120px);
    overflow-y: scroll;
    user-select: none;
  }
  .pdfPaginationBox{
    position: absolute;
    right: 50px;
    top: 80px;
    display: flex;
    align-items: center;
    .btnBox{
      margin:0 5px;
    }
  }
  .pdfPageBox{
    position: absolute;
    left: 50px;
    top: 80px;
    background:rgba(0,0,0,.5);
    font-size: 14px;
    color: #FFF;
    box-sizing: border-box;
    padding: 0 5px;
    border-radius: 4px;
  }
</style>
