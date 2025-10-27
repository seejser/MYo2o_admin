<!--用户管理-->
<template>
  	<div class="mainBox">
  		<div class="searchMainBox">
          <div class="searchItemBox">
            <a-input placeholder="请输入关键字" v-model:value="searchKey" allowClear>
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
          <a-button type="primary" ghost @click="gotoUserForm()">
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
  			<template #status="{text,record}">
  				<a-switch
  					@click="statusChange(record._id)" 
  					checked-children="启用" 
  					un-checked-children="禁用"
  					:checkedValue="1"
  					:unCheckedValue="0" 
  					:loading="operationStatus"
  					:checked="text" />
            </template>
  			<template #time="{text}">
  				<span v-if="text && text != undefined">{{$filters.dateTimeFilter(text)}}</span> 
        </template>
		    <template #operation="{text,record,index}">
		    	<a-button 
              		@click="gotoUserForm(record._id)">编辑</a-button>
              	<a-button
              		@click="delConfirm(record._id)" 
              		danger 
              		style="margin-left: 10px;">删除</a-button>
            </template>
		</a-table>
		<UserForm ref="userForm" @reloadList="reloadList"></UserForm>
  	</div>
</template>
<script>
import index from './index.js'
export default index
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
