<template>
	<div class="videoUploadBox">
		<div class="uploadMainBox" v-if="value">
			<img :src="value + '?x-oss-process=video/snapshot,t_0,f_jpg,w_0,h_0,m_fast'" class="imageBox" />
			<div class="previewBox">
	    		<IconPark type="PreviewOpen" class="iconBox" @click="preVideo"></IconPark>
	    		<IconPark type="Delete" class="iconBox" @click="removeVideo"></IconPark>
	    	</div>
		</div>
		<div class="uploadMainBox" v-else>
			<IconPark type="LoadingOne" v-if="loading" theme="outline" class="iconBox"></IconPark>
	    	<IconPark type="Plus" class="iconBox" v-else></IconPark>
	      	<div class="uploadText">上传视频</div>
	      	<input 
				type="file" 
				class="uploadFileBtn_input" 
				@change="videoChange" 
				ref="videoInput" 
				accept="video/mp4"/>
		</div>
		<a-alert v-if="tipText" :message="tipText" type="warning" style="margin-bottom:10px;" show-icon/>
		<a-alert message="只能上传mp4文件，且不超过2000M" type="info" show-icon/>
		<VideoModal ref="videoModal"></VideoModal>
	</div>
</template>

<script> 
import {IconPark} from '@icon-park/vue-next/es/all';
import {fileUpload} from "@/libs/UploadUtil.js";
import VideoModal from "@/components/modal/VideoModal.vue";
export default {
  	name: 'VideoUpload',
  	props: {
  		value:{
  			default: '',
  			type: String,
  		},
		tipText:{
			default: '',
			type: String
		}
  	},
  	data() {
    	return {
    		loading: false,
    		uploadDisabled: false,
    	}
  	},
  	components:{
  		IconPark,
  		VideoModal,
  	},
  	methods: {
  		videoChange(e){
  			if(this.loading) return false;
            console.log("this.$refs.videoInput",this.$refs.videoInput.files);
  			if(this.$refs.videoInput.files.length <= 0 
              || this.$refs.videoInput.files[0] == null 
              || this.$refs.videoInput.files[0] == undefined){
          		return;
        	}
        	let file = this.$refs.videoInput.files[0];
        	this.loading = true;
        	fileUpload(file,(videoUrl) => {
				this.loading = false;
				if(videoUrl && videoUrl != undefined){
					this.$refs.videoInput.value = "";
					this.$emit('update:value', videoUrl); 
				}
			})
  		},
  		removeVideo(){
  		 	this.uploadDisabled = false;
  			this.$emit('update:value', ""); 
  		},
  		preVideo(){
  			this.$refs.videoModal.showModal(this.value);
  		}
  	}
}
</script>

<style lang="scss" scoped>
    .videoUploadBox{
        .uploadMainBox{
            position: relative;
            width: 128px;
            height: 128px;
            display: table;
            margin-right: 8px;
            margin-bottom: 8px;
            text-align: center;
            vertical-align: top;
            background-color: #fafafa;
            border: 1px dashed #d9d9d9;
            border-radius: 2px;
            cursor: pointer;
            transition: border-color .3s ease;
            box-sizing: border-box;
            padding: 6px;
            color: rgba(0,0,0,.85);
            font-size: 14px;
            font-variant: tabular-nums;
            line-height: 1.5715;
            list-style: none;
            outline: 0;
            overflow: hidden;
            input{
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                opacity:0;
                z-index: 2;
            }
            &:hover{
                .previewBox{
                    display: flex;
                }
                
            }
            &:active{
                .previewBox{
                    display: flex;
                }
                
            }
            .imageBox{
                max-width: calc(100% - 12px);
                max-height: calc(100% - 12px);
                position: absolute;
                left: 50%;
                top: 50%;
                transform:translate(-50%,-50%);
            }
            .previewBox{
                position: absolute;
                width: 116px;
                height: 116px;
                z-index: 2;
                top: 0;
                left: 0;
                background: rgba(0,0,0,0.4);
                align-items: center;
                justify-content: center;
                display: none;
                margin:5px;
                .iconBox{
                    font-size: 16px;
                    color: #FFF;
                    margin:5px;
                }
            }
        }
        .iconBox{
            font-size: 40px;
            margin-top: 26px;
            color: #777;
        }
        .uploadText{
            color: #777;
            font-size: 12px;
            margin-top:4px;
        }
    }
	
</style>