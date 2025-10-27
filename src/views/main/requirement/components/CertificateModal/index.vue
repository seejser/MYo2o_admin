<!--评论管理-->
<template>
  	<a-modal
      title="证件管理"
      v-model:visible="visible"
      :footer="null"
      width="80%">
      <div class="mainBox">
        <a-table
          :pagination="pagination" 
          :columns="columns"
          :row-key="(record,index) => index" 
          :data-source="list" 
          :scroll="{x:1000}"
          :loading="getStatus"
          @change="handleTableChange">
          <template #style="{text}">
            <span>
              {{CERTIFICATE_STYLE_MAP[text] && CERTIFICATE_STYLE_MAP[text] != undefined ? CERTIFICATE_STYLE_MAP[text] : ""}}
            </span>
          </template>
          <template #pics="{text,record,index}">
            <img 
              v-if="record.pics.length > 0"
              :src="record.pics[0]"
              @click="showPreImage(record.pics)"  
              class="picBox"/>
          </template>
          <template #time="{text}">
            <span v-if="text && text != undefined">{{$filters.dateTimeFilter(text)}}</span> 
          </template>
        </a-table>
      </div>
      <PicPreviewModal ref="picPreviewModal"></PicPreviewModal>
    </a-modal>
</template>
<script>
import index from './index.js'
export default index
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
