<!--客户管理-->
<template>
  	<div class="mainBox">
  		<div class="searchMainBox">
			<div class="searchItemBox">
				<a-input placeholder="请输入名称" v-model:value="search.key" allowClear>
					<template #prefix>
						<IconPark type="search" theme="outline" />
					</template>
				</a-input>
			</div>
			<div class="searchItemBox">
				<a-select
				v-model:value="search.mute"
				style="width: 100%"
				placeholder="请选择是否禁言"
				allowClear >
				<a-select-option
					v-for="item in userMuteList"
					:key="item.value" 
					:value="item.value">{{item.name}}</a-select-option>
				</a-select>
			</div>
			<!-- <div class="searchItemBox">
				<a-select
				v-model:value="search.expert"
				style="width: 100%"
				placeholder="请选择是否专家"
				allowClear >
				<a-select-option
					v-for="item in userExpertList"
					:key="item.value" 
					:value="item.value">{{item.name}}</a-select-option>
				</a-select>
			</div> -->
			<div class="searchItemBox">
				<a-button type="primary" @click="reloadList">搜索</a-button>
			</div>
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
  					unCheckedChildren="禁用" 
  					checkedChildren="启用"
  					:checkedValue="1"
  					:unCheckedValue="2" 
  					:loading="operationStatus"
  					:checked="text" />
        	</template>
			<template #mute="{text,record}">
  				<a-switch
  					@click="changeMute(record._id)" 
  					unCheckedChildren="关闭" 
  					checkedChildren="开启"
  					:checkedValue="2"
  					:unCheckedValue="1" 
  					:loading="operationStatus"
  					:checked="text" />
        	</template>
			<!-- <template #expert="{text,record}">
  				<a-switch
  					@click="changeExpert(record._id)" 
  					unCheckedChildren="否" 
  					checkedChildren="是"
  					:checkedValue="2"
  					:unCheckedValue="1" 
  					:loading="operationStatus"
  					:checked="text" />
        	</template> -->
			<template #pic="{text}">
				<a-image 
					:src="text"
					v-if="text && text != undefined" 
					class="avatarBox" />
			</template>
			<template #time="{text}">
				<span v-if="text && text != undefined">{{$filters.dateTimeFilter(text)}}</span> 
			</template>
			<!-- <template #operation="{text,record,index}">
				<a-button 
				@click="gotoCaseForm(record._id)">编辑</a-button>
			<a-button
				@click="delConfirm(record._id)" 
				danger 
				style="margin-left: 10px;">删除</a-button>
			</template> -->
		</a-table>
  	</div>
</template>
<script>
import index from './index.js'
export default index
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
