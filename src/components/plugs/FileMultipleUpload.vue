<template>
	<div class="fileUploadBox">
        <!--限制未pdf xlsx xls doc docx-->
        <a-upload-dragger
            name="file" 
            accept="application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            :customRequest="upload"
            @change="fileChange"
            :disabled="loading"
            :multiple="true"
            :showUploadList="false"
            v-model:file-list="fileList">
            <p class="uploadIcon">
              <IconPark type="InboxOut" theme="outline" />
            </p>
            <p class="uploadText">将文件拖到此处，或
                <span>点击上传</span>
                <span class="red">  最多10个文件</span>
            </p>
          </a-upload-dragger>
	</div>
</template>

<script> 
import {IconPark} from '@icon-park/vue-next/es/all';
import * as UploadUtils from "@/libs/UploadUtil.js";
// const pdfjsLib = require("pdfjs-dist");
export default {
  	name: 'FileMultipleUpload',
  	props: {
  		value:{
  			default: [],
  			type: Array,
  		}
  	},
  	data() {
    	return {
    		loading: false,
            pdfType: 'application/pdf',
            fileList:[],
            uploadTimer:null,
    	}
  	},
  	components:{
  		IconPark,
  	},
  	methods: {
        fileChange(e){
            this.loading = true;
            let {file,fileList} = e;
            if(file.status == "uploading"){
                //为正在上传状态
                if(fileList.length >10){
                    return false;
                }
                if(this.uploadTimer){
                    window.clearTimeout(this.uploadTimer);
                    this.uploadTimer = null;
                }
                this.uploadTimer = window.setTimeout(async ()=>{
                    console.log("确定上传");
                    this.$message.loading("上传中");
                    let uploadFileList = [];
                    for(var i = 0, l = fileList.length; i < l; i++){
                        let fileItem = fileList[i];
                        let fileName = fileItem.name.substring(0,fileItem.name.lastIndexOf('.'));
                        console.log("fileName:",fileName);
                        let fileUrl = await UploadUtils.fileUploadSync(fileItem.originFileObj);
                        if(fileUrl && fileUrl != undefined){
                            uploadFileList.push({
                                'name':fileName,
                                'url':fileUrl
                            });
                        }
                    }
                    this.$message.destroy();
                    this.loading = false;
                    this.$emit('update:value', uploadFileList);
                    this.$emit("complete",uploadFileList);
                },500);
            }
            
        },
        upload(e){
            //console.log("upload e:",e);
        },
        
  	},
    created(){
        
    }
}
</script>

<style lang="scss" scoped>
    .fileUploadBox{

        .uploadIcon{
            color: #40a9ff;
            font-size: 60px;
            margin-top: 40px;
            margin-bottom: 20px;
        }
        .uploadText{
            margin: 0 0 4px;
            color: #000000d9;
            font-size: 15px;
            margin-bottom: 40px;
            span{
                color: #40a9ff;
            }
            .red{
                color: #ff7875;
            }
        }
        .uploadHint{
            color: #00000073;
            font-size: 14px;
        }
    }
</style>