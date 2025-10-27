<!--业务编辑-->
<template>
  	<a-modal
      :title="title"
      v-model:visible="visible"
      width="80%"
      cancelText="取消"
      okText="确定"
      @ok="submitConfirm"
    >
      <a-form 
        ref="ruleForm" 
        layout="horizontal"
        :model="form" 
        :rules="rules"
        :labelCol="{span:3}"
        :wrapperCol="{span: 19}"
        labelAlign="left" 
        :hideRequiredMark="true" >
          <a-form-item label="标题" name="title">
            <a-input v-model:value="form.title" placeholder="请输入名称" type="text"/>
          </a-form-item>
          <a-form-item label="简介" name="brief">
            <a-input v-model:value="form.brief" placeholder="请输入简介" type="text"/>
          </a-form-item>
          <a-form-item label="类型" name="tag"> 
            <a-select
              v-model:value="form.tag"
              style="width: 100%"
              placeholder="请选择类型">
              <a-select-option
                v-for="(item,index) in transactionTagList"
                :key="item.value" 
                :value="item.value">{{item.name}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="费用" name="amount">
            <a-input v-model:value="form.amount" placeholder="请填写费用" type="number"/>
          </a-form-item>
          <a-form-item label="业务范围" name="scopeList"> 
            <TagListFreeEditor 
              v-model:value="form.scopeList"></TagListFreeEditor>
          </a-form-item>
          <a-form-item label="图片" name="pic">
            <ImageUpload v-model:value="form.pic" tipText="图片大小为 750 * 408"></ImageUpload>
          </a-form-item>  
          <a-form-item label="排序" name="sort">
            <a-input v-model:value="form.sort" placeholder="请输入排序(由大到小)" type="number"/>
          </a-form-item>
          <a-form-item label="内容" name="content">
            <MineQuillEditor v-model:content="form.content"></MineQuillEditor>
          </a-form-item>
      </a-form>
    </a-modal>
</template>
<script>
import index from './index.js'
export default index
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
