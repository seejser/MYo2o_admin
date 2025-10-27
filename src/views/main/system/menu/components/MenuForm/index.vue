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
          <a-form-item label="标题" name="title">
            <a-input v-model:value="form.title" placeholder="请输入标题" type="text"/>
          </a-form-item>
          <a-form-item label="名称" name="name">
            <a-input v-model:value="form.name" placeholder="请输入名称" type="text"/>
          </a-form-item>
          <a-form-item label="图标" name="icon">
            <a-input v-model:value="form.icon" placeholder="请输入图标" type="text"/>
          </a-form-item>
          <a-form-item label="路径" name="path">
            <a-input v-model:value="form.path" placeholder="请输入路径" type="text"/>
          </a-form-item>
          <a-form-item label="类型" name="type">
            <a-select 
              placeholder="请选择类型"
              :options="typeOptions"
              v-model:value="form.type">
            </a-select>
          </a-form-item>
          <a-form-item label="排序" name="sort">
            <a-input v-model:value="form.sort" placeholder="请输入排序" type="number"/>
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
