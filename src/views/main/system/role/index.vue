<!--角色管理-->
<template>
	<div class="mainBox">
		<div class="searchMainBox">
          <div class="searchItemBox">
            <a-input placeholder="请输入关键字" v-model:value="search.key" allowClear>
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
          <a-button type="primary" ghost @click="gotoRoleForm()">
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
  			<template #time="{text}">
  				<span v-if="text && text != undefined">{{$filters.dateTimeFilter(text)}}</span> 
            </template>
		    <template #operation="{text,record,index}">
		    	<a-button
		    		type="primary"
		    		ghost
		    		style="margin-right: 10px;margin-bottom: 10px;" 
		    		@click="gotoAuthSetting(record._id)">权限配置</a-button>
              	<a-button 
              		@click="gotoRoleForm(record._id)">编辑</a-button>
              	<a-button
              		@click="delConfirm(record._id)" 
              		danger 
              		style="margin-left: 10px;">删除</a-button>
            </template>
		</a-table>
		<RoleForm ref="roleForm" @reloadList="reloadList"></RoleForm>
		<AuthSetting ref="authSetting"></AuthSetting>
  	</div>
</template>
<script>
import index from './index.js'
export default index
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
