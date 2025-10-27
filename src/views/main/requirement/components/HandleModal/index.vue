<!--处理需求-->
<template>
  	<a-modal
      title="处理需求"
      v-model:visible="visible"
      width="60%"
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
        :wrapperCol="{span: 18}"
        labelAlign="left" 
        :hideRequiredMark="true" >
          <a-form-item label="结论" name="conclusion">
            <a-textarea
              v-model:value="form.conclusion"
              placeholder="请输入结论"
              :auto-size="{ minRows: 5}"
            />
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
