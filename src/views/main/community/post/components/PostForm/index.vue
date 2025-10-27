<!--帖子编辑-->
<template>
  	<a-modal
      title="帖子编辑"
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
          <a-form-item label="图片集" name="pics">
            <ImageList v-model:list="form.pics"></ImageList>
          </a-form-item>
          <a-form-item label="内容" name="content">
            <a-textarea
              v-model:value="form.content"
              placeholder="请输入内容"
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
