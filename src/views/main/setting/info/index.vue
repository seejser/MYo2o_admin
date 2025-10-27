<!--信息管理-->
<template>
  	<div class="mainBox">
  		
      <div class="btnGroupBox">
        <a-button type="primary" ghost @click="gotoInfoForm()">
        	<template #icon>
            <IconPark type="plus" theme="outline" />
  		    </template>
      		添加
  			</a-button>
      </div>
      <br/>
      <br/>
      <br/>
  		<a-table
  			:pagination="pagination" 
  			:columns="columns"
  			:row-key="(record,index) => index" 
  			:data-source="list" 
  			:scroll="{x:1000}"
        :loading="getStatus"
        @change="handleTableChange">
  			<template #time="{text}">
  				<span v-if="text && text != undefined">{{$filters.dateTimeFilter(text)}}</span> 
        </template>
        <template #style="{text}">
          <span v-if="text && text != undefined">{{infoStyleMap[text] && infoStyleMap[text] != undefined ? infoStyleMap[text]: ""}}</span> 
        </template>
		    <template #operation="{text,record,index}">
		    	<a-button 
        		@click="gotoInfoForm(record._id)">编辑</a-button>
        	<a-button
        		@click="delConfirm(record._id)" 
        		danger 
        		style="margin-left: 10px;">删除</a-button>
        </template>
		</a-table>
		<InfoForm ref="infoForm" @reloadList="reloadList"></InfoForm>
  </div>
</template>
<script>
import index from './index.js'
export default index
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
