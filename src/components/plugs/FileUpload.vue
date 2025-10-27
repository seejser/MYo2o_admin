<template>
	<div class="fileUploadBox">
        <a-upload-dragger
            name="file" 
            accept="application/pdf"
            :customRequest="upload"
            @change="fileChange"
            :disabled="loading"
            v-model:file-list="fileList">
            <p class="uploadIcon">
              <IconPark type="InboxOut" theme="outline" />
            </p>
            <p class="uploadText">将文件拖到此处，或<span>点击上传</span></p>
        </a-upload-dragger>
        <div class="fileOperationBox" v-if="value && value != undefined">
            <a-button type="primary" class="operationBtn" @click="filePreview">
                <template #icon>
                <IconPark type="previewOpen" theme="outline" />
                </template>
                点击预览
            </a-button>
        </div>
        <FilePreviewModal ref="filePreviewModal"></FilePreviewModal>
	</div>
</template>

<script> 
import {IconPark} from '@icon-park/vue-next/es/all';
import * as UploadUtils from "@/libs/UploadUtil.js";
import FilePreviewModal from "@/components/modal/FilePreviewModal.vue";
// const pdfjsLib = require("pdfjs-dist");
export default {
  	name: 'FileUpload',
  	props: {
  		value:{
  			default: "",
  			type: String,
  		},
        name: {
            default: '',
            type: String
        }
  	},
  	data() {
    	return {
    		loading: false,
            pdfType: 'application/pdf',
            fileList:[],
    	}
  	},
    watch: {
        name(newV,oldV){
            if(newV == ''){
                this.fileList = [];
            }
        } 
    },
  	components:{
  		IconPark,
        FilePreviewModal,
  	},
  	methods: {
        fileChange(e){
            console.log("fileChange e:",e);
            this.loading = true;
            let {file,fileList} = e;
            if(file.status == "uploading"){
                //为正在上传状态
                let fileName = file.name.substring(0,file.name.lastIndexOf('.'));
                console.log("fileName:",fileName);
                
                UploadUtils.fileUpload(file.originFileObj,(fileUrl) => {
                    console.log("fileUrl:",fileUrl);
                    if(fileUrl && fileUrl != undefined){
                        this.$emit("update:name",fileName);
                        this.$emit('update:value', fileUrl); 
                        file.status = "success";
                    }else{
                        this.$message.error("上传异常");
                        file.status = "error";
                        this.fileList = [];
                    }
                    this.loading = false;
                })
            }
            
        },
        upload(e){
            //console.log("upload e:",e);
        },
        filePreview(){
            this.$nextTick(() => {
                this.$refs.filePreviewModal.show(this.value);
            });
        },
        // getObjectURL(file) {
        //     let url = "";
        //     try{
        //         if (window.createObjectURL != undefined) {
        //             url = window.createObjectURL(file);
        //         } else if (window.URL.createObjectURL(file)) {
        //             url = window.URL.createObjectURL(file);
        //         } else if (window.webkitURL != undefined) {
        //             url = window.webkitURL.createObjectURL(file);
        //         }
        //         console.log(url);
        //     }catch(e){

        //     }
        //     return url;
        // },
        // async pdfRead(file){
        //     return new Promise((resolve,rejust) => {
        //         let fileUrl = this.getObjectURL(file);
        //         if(!fileUrl){
        //             resolve("");
        //             return;
        //         }
        //         try{
        //             var loadingTask = pdfjsLib.getDocument(fileUrl);
        //             loadingTask.promise
        //             .then(function (pdfDocument) {
        //                 let content = "";
        //                 let readLength = 0;
        //                 for (let i = 0; i < pdfDocument._pdfInfo.numPages; i++) {
        //                     pdfDocument.getPage(i + 1).then(function (page) {
        //                         page.getTextContent().then(function (textContent) {
        //                             console.log("i:",i);
        //                             let str = "";
        //                             textContent.items.map((v) => {
        //                                 str += v.str;
        //                             })
        //                             content += str;
        //                             //读取到最后一页的时候返回
        //                             readLength += 1;
        //                             if(readLength == pdfDocument._pdfInfo.numPages){
        //                                 resolve(content);
        //                             }
        //                         });
        //                     })
        //                 }
        //             })
        //             .catch(function (reason) {
        //                 console.error("Error: " + reason);
        //                 resolve("");
        //             });
        //         }catch(e){
        //             console.log("e:",e);
        //             resolve("");
        //         }
                

        //     }); 
        // }
  	},
    created(){
        
    }
}
</script>

<style lang="scss" scoped>
    .fileUploadBox{
        .uploadIcon{
            color: #40a9ff;
            font-size: 48px;
        }
        .uploadText{
            margin: 0 0 4px;
            color: #000000d9;
            font-size: 13px;
            span{
                color: #40a9ff;
            }
        }
        .uploadHint{
            color: #00000073;
            font-size: 14px;
        }
    }
    .fileOperationBox{
        margin:10px 0px;
        .operationBtn{
            margin-right: 10px;
        }
    }
</style>