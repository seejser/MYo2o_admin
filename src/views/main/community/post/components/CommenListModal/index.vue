<!--评论管理-->
<template>
  	<a-modal
      title="评论管理"
      v-model:visible="visible"
      :footer="null"
      width="80%">
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
              <a-range-picker 
              v-model:value="search.dateRange" 
              :locale="locale" 
              allowClear/>
          </div>
              
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
          <template #nickName="{text,record,index}">
            <span v-if="record.user && record.user != undefined">
              {{record.user.nickName}}
            </span>
          </template>
          <template #avatarUrl="{text,record,index}">
            <img 
              :src="record.user.avatarUrl"
              v-if="record.user && record.user != undefined" 
              class="avatarBox" />
          </template>
          <template #time="{text}">
            <span v-if="text && text != undefined">{{$filters.dateTimeFilter(text)}}</span> 
          </template>
          <template #operation="{text,record,index}">
            <a-button
              @click="delConfirm(record._id)" 
              danger 
              style="margin-left: 10px;">删除</a-button>
          </template>
        </a-table>
      </div>
    </a-modal>
</template>
<script>
import index from './index.js'
export default index
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
