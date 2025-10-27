<!--用户-->
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
