<!--菜单管理-->
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
          <a-button type="primary" ghost @click="gotoMenuForm(null,null,0)">
          	<template #icon>
		      	  <IconPark type="plus" theme="outline" />
		        </template>
    		    添加
			    </a-button>
        </div>
        <br/>
  		<a-table 
  			:columns="columns"
  			:row-key="(record,index) => index" 
  			:data-source="list" 
  			:scroll="{x:1000}"
  			:pagination="false"
          	:loading="getStatus"
			>
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
  			<template #type="{text}">
  				<a-tag color="blue" v-if="text == 1">菜单</a-tag>
          		<a-tag color="cyan" v-if="text == 2">方法</a-tag>
            </template>
		    <template #operation="{text,record,index}">
		    	<a-button
		    		type="primary"
		    		ghost
		    		style="margin-right: 10px;margin-bottom: 10px;" 
		    		@click="gotoMenuForm(null,record._id,record.level)">新增子菜单</a-button>
              	<a-button 
              		@click="gotoMenuForm(record._id,record.parentId,record.level)">编辑</a-button>
              	<a-button
              		@click="delConfirm(record._id)" 
              		danger 
              		style="margin-left: 10px;">删除</a-button>
            </template>
		</a-table>
		<MenuForm ref="menuForm" @reloadList="reloadList"></MenuForm>
	</div>
</template>
<script>
import index from './index.js'
export default index
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
