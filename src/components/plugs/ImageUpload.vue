<template>
	<div class="imageUploadBox">
		<div class="uploadMainBox" v-if="value">
			<img :src="value" class="imageBox" />
			<div class="previewBox">
	    		<IconPark type="PreviewOpen" class="iconBox" @click="preImage"></IconPark>
	    		<IconPark type="Delete" class="iconBox" @click="removeImage"></IconPark>
	    	</div>
		</div>
		<div class="uploadMainBox" v-else>
			<IconPark type="LoadingOne" v-if="loading" theme="outline" class="iconBox"></IconPark>
	    	<IconPark type="Plus" class="iconBox" v-else></IconPark>
	      	<div class="uploadText">上传图片</div>
	      	<input 
				type="file" 
				class="uploadFileBtn_input" 
				@change="imageChange" 
				ref="photoInput" 
				accept="image/jpeg,image/jpg,image/png"/>
		</div>
		<a-alert v-if="tipText" :message="tipText" type="warning" style="margin-bottom:10px;" show-icon/>
		<a-alert message="图片请先自行压缩 https://tinypng.com/" type="info" show-icon/>
		<PicPreviewModal ref="picPreviewModal"></PicPreviewModal>
	</div>
</template>

<script> 
import {IconPark} from '@icon-park/vue-next/es/all';
import {imageUpload} from "@/libs/UploadUtil.js";
import PicPreviewModal from "@/components/modal/PicPreviewModal.vue";
export default {
  	name: 'ImageUpload',
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
  		PicPreviewModal,
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
					this.$emit('update:value', imgUrl); 
				}
			})
  		},
  		removeImage(){
  		 	this.uploadDisabled = false;
  			this.$emit('update:value', ""); 
  		},
  		preImage(){
  			this.$refs.picPreviewModal.show([this.value]);
  		}
  	}
}
</script>

<style lang="scss" scoped>
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
</style>