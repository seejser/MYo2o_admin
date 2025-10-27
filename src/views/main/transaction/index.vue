<!--业务管理-->
<template>
  	<div class="mainBox">
  		<div class="searchMainBox">
          <div class="searchItemBox">
            <a-select
              v-model:value="searchObj.tag"
              style="width: 100%"
              placeholder="请选择类型"
              allowClear >
              <a-select-option
                v-for="item in transactionTagList"
                :key="item.value" 
                :value="item.value">{{item.name}}</a-select-option>
            </a-select>
          </div>
          <div class="searchItemBox">
            <a-input placeholder="请输入关键词" v-model:value="searchObj.key" allowClear>
            	<template #prefix>
	            	<IconPark type="search" theme="outline" />
	          	</template>
            </a-input>
          </div>
          <div class="searchItemBox">
            <a-button type="primary" @click="reloadList">搜索</a-button>
          </div>
        </div>
        <div class="btnGroupBox">
          <a-button type="primary" ghost @click="gotoTransactionForm()">
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
        <template #tag="{text}">
          <span v-if="text && text != undefined">
            {{transactionTaggMap[text] && transactionTaggMap[text] != undefined ? transactionTaggMap[text]: ""}}
          </span> 
        </template>
		    <template #operation="{text,record,index}">
		    	<a-button 
        		@click="gotoTransactionForm(record._id)">编辑</a-button>
        	<a-button
        		@click="delConfirm(record._id)" 
        		danger 
        		style="margin-left: 10px;">删除</a-button>
        </template>
		  </a-table>
		<TransactionForm ref="transactionForm" @reloadList="getList"></TransactionForm>
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
