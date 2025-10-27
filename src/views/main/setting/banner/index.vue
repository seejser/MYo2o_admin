<!--轮播图管理-->
<template>
  	<div class="mainBox">
  		<div class="searchMainBox">
          <div class="searchItemBox">
            <a-select
              v-model:value="searchObj.belong"
              style="width: 100%"
              placeholder="请选择所属"
              allowClear >
              <a-select-option
                v-for="item in bannerBelongList"
                :key="item.value" 
                :value="item.value">{{item.name}}</a-select-option>
            </a-select>
          </div>
          <div class="searchItemBox">
            <a-button type="primary" @click="reloadList">搜索</a-button>
          </div>
        </div>
        <div class="btnGroupBox">
          <a-button type="primary" ghost @click="gotoBannerForm()">
          	<template #icon>
              <IconPark type="plus" theme="outline" />
    		    </template>
        		添加
    			</a-button>
        </div>
        <br/>
  		<a-table
  			:pagination="pagination" 
  			:columns="columns"
  			:row-key="(record,index) => index" 
  			:data-source="list" 
  			:scroll="{x:1000}"
      	:loading="getStatus"

      	@change="handleTableChange">
  			<template #disable="{text,record}">
  				<a-switch
  					@click="changeDisable(record._id)" 
  					unCheckedChildren="隐藏" 
  					checkedChildren="启用"
  					:checkedValue="1"
  					:unCheckedValue="2" 
  					:loading="operationStatus"
  					:checked="text" />
        </template>
        <template #pic="{text}">
          <img 
            :src="text"
            @click="showPreImage(text)"  
            v-if="text && text != undefined" 
            style="width: 100px;" />
        </template>
  			<template #time="{text}">
  				<span v-if="text && text != undefined">{{$filters.dateTimeFilter(text)}}</span> 
        </template>
        <template #belong="{text}">
          <span v-if="text && text != undefined">
            {{bannerBelongMap[text] && bannerBelongMap[text] != undefined ? bannerBelongMap[text]: ""}}
          </span> 
        </template>
		    <template #operation="{text,record,index}">
		    	<a-button 
        		@click="gotoBannerForm(record._id)">编辑</a-button>
        	<a-button
        		@click="delConfirm(record._id)" 
        		danger 
        		style="margin-left: 10px;">删除</a-button>
        </template>
		  </a-table>
		<BannerForm ref="bannerForm" @reloadList="reloadList"></BannerForm>
    <PicPreviewModal ref="picPreviewModal"></PicPreviewModal>
  </div>
</template>
<script>
import index from './index.js'
export default index
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
