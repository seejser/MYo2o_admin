<!--需求管理-->
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
				<a-select
				v-model:value="search.status"
				style="width: 100%"
				placeholder="状态"
				allowClear >
				<a-select-option
					v-for="item in requirementStatusList"
					:key="item.value" 
					:value="item.value">{{item.name}}</a-select-option>
				</a-select>
			</div>
			<div class="searchItemBox">
			  	<a-range-picker 
					v-model:value="search.dateRange" 
					:locale="locale" 
					allowClear/>
			</div>
        	
			
        </div>
		<div class="btnGroupBox">
			<div class="btnBox">
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
			<template #nickName="{text,record,index}">
				<span v-if="record.user && record.user != undefined">
					{{record.user.nickName}}
				</span>
			</template>
			<template #avatarUrl="{text,record,index}">
				<img 
					:src="record.user.avatarUrl"
					@click="showPreImage([record.user.avatarUrl])"  
					v-if="record.user && record.user != undefined" 
					class="avatarBox" />
			</template>
			<template #transaction="{text,record,index}">
				<span v-if="record.transaction && record.transaction != undefined">
					{{record.transaction.title}}
				</span>
			</template>
			<template #status="{text}">
				<span v-if="text && text != undefined">
					<a-tag v-if="text == requirementStatusKey.submited" color="blue">
						{{requirementStatusMap[text]}}
					</a-tag>
					<a-tag v-if="text == requirementStatusKey.handled" color="green">
						{{requirementStatusMap[text]}}
					</a-tag>
				</span> 
			</template>
			<template #time="{text}">
				<span v-if="text && text != undefined">{{$filters.dateTimeFilter(text)}}</span> 
			</template>
			<template #operation="{text,record,index}">
				<a-button
					type="primary" 
					v-if="requirementStatusKey.submited == record.status"
					@click="handle(record._id)">处理</a-button>
				<a-button 
					@click="showCertificateModal(record.user._id)" 
					style="margin-left: 10px;">查看用户</a-button>
			</template>
		</a-table>
		<PicPreviewModal ref="picPreviewModal"></PicPreviewModal>
		<HandleModal ref="handleModal" @reloadList="getList"></HandleModal>
		<CertificateModal ref="certificateModal"></CertificateModal>
  	</div>
</template>
<script>
import index from './index.js'
export default index
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
