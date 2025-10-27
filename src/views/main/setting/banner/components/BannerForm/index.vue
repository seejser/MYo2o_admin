<!--轮播图编辑-->
<template>
  	<a-modal
      :title="title"
      v-model:visible="visible"
      cancelText="取消"
      okText="确定"
      @ok="submitConfirm"
    >
      <a-form 
        ref="ruleForm" 
        layout="horizontal"
        :model="form" 
        :rules="rules"
        :labelCol="{span:6}"
        :wrapperCol="{span: 15}"
        labelAlign="left" 
        :hideRequiredMark="true" >
          <a-form-item label="名称" name="name">
            <a-input v-model:value="form.name" placeholder="请输入名称" type="text"/>
          </a-form-item>
          <a-form-item label="图片" name="pic">
            <ImageUpload v-model:value="form.pic" tipText="图片大小为 690 * 280"></ImageUpload>
          </a-form-item>
          <a-form-item label="所属" name="belong"> 
            <a-select
              v-model:value="form.belong"
              style="width: 100%"
              placeholder="请选择所属">
              <a-select-option
                v-for="(item,index) in bannerBelongList"
                :key="item.value" 
                :value="item.value">{{item.name}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="打开类型" name="openType"> 
            <a-select
              v-model:value="form.openType"
              style="width: 100%"
              placeholder="请选择打开类型"
            >
              <a-select-option
                v-for="item in openTypeList"
                :key="item.value" 
                :value="item.value">{{item.name}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            v-if="form.openType == openTypeKey.jumpOtherMini" 
            label="APPID" 
            name="appid">
            <a-input v-model:value="form.appid" placeholder="请输入APPID" type="text"/>
          </a-form-item>
          <a-form-item
            v-if="form.openType == openTypeKey.jumpMini
                  || form.openType == openTypeKey.jumpLink
                  || form.openType == openTypeKey.jumpOtherMini" 
            label="链接" 
            name="openUrl">
            <a-input v-model:value="form.openUrl" placeholder="请输入链接" type="text"/>
          </a-form-item>
          
          
          <a-form-item label="排序" name="sort">
            <a-input v-model:value="form.sort" placeholder="请输入排序(由小到大)" type="number"/>
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
