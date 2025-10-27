<!--信息-->
<template>
  	<a-modal
      width="60%"
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
        :labelCol="{span:4}"
        :wrapperCol="{span: 20}"
        labelAlign="left" 
        :hideRequiredMark="true" >
          <a-form-item label="类型" name="style"> 
            <a-select
              v-model:value="form.style"
              style="width: 100%"
              placeholder="请选择类型">
              <a-select-option
                v-for="(item,index) in infoStyleList"
                :key="item.value" 
                :value="item.value">{{item.name}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="内容" name="content" v-if="form.style == infoStyleKey.custom_considerations"> 
            <a-textarea v-model:value="form.content" placeholder="请输入" :rows="4"/>
          </a-form-item>
          <a-form-item label="内容" name="content" v-if="form.style == infoStyleKey.privacy_agreement || form.style == infoStyleKey.user_agreement "> 
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
