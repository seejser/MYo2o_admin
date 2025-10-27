<!--帖子管理-->
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
				v-model:value="search.recommendStatus"
				style="width: 100%"
				placeholder="是否推荐"
				allowClear >
				<a-select-option
					v-for="item in RecommendStatusList"
					:key="item.value" 
					:value="item.value">{{item.name}}</a-select-option>
				</a-select>
			</div>
			<div class="searchItemBox">
				<a-select
				v-model:value="search.sortType"
				style="width: 100%"
				placeholder="排序方式"
				allowClear >
				<a-select-option
					v-for="item in sortTypeList"
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
			<div class="btnBox">
				<a-button type="primary" ghost :loading="exportStatus"  @click="exportLog">导出</a-button>
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
			<template #pics="{text,record,index}">
				<img 
					:src="record.pics[0]"
					@click="showPreImage(record.pics)"  
					v-if="record.pics && record.pics.length > 0" 
					class="picBox"/>
			</template>
			<template #recommendStatus="{text,record}">
  				<a-switch
  					@click="toggleRecmmend(record._id)" 
  					unCheckedChildren="否" 
  					checkedChildren="是"
  					:checkedValue="2"
  					:unCheckedValue="1" 
  					:loading="operationStatus"
  					:checked="text" />
        	</template>
			<template #time="{text}">
				<span v-if="text && text != undefined">{{$filters.dateTimeFilter(text)}}</span> 
			</template>
			<template #operation="{text,record,index}">
				<a-button
					type="primary" 
					style="margin-bottom:10px;"
					@click="showCommentModal(record._id)">查看评论</a-button>
				<br/>
				<a-button 
					@click="gotoPostForm(record._id)">编辑</a-button>
				<a-button
					@click="delConfirm(record._id)" 
					danger 
					style="margin-left: 10px;">删除</a-button>
			</template>
		</a-table>
		<PicPreviewModal ref="picPreviewModal"></PicPreviewModal>
		<PostForm ref="postForm" @reloadList="getList"></PostForm>
		<CommentListModal ref="commentListModal" @reloadList="getList"></CommentListModal>
  	</div>
</template>
<script>
import index from './index.js'
export default index
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
