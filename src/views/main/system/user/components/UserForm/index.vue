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
          <a-form-item label="账户" name="account">
            <a-input v-model:value="form.account" placeholder="请输入账号" type="text"/>
          </a-form-item>
          <a-form-item label="昵称" name="username">
            <a-input v-model:value="form.username" placeholder="请输入昵称" type="text"/>
          </a-form-item>
          <a-form-item label="角色" name="role"> 
            <a-select
              v-model:value="form.role"
              style="width: 100%"
              placeholder="请选择角色"
              :options="roleList"
              @change="handleRoleChange"
            >
            </a-select>
          </a-form-item>
          <a-form-item label="新密码" name="password">
            <a-input v-model:value="form.password" placeholder="请输入新密码" type="password"/>
          </a-form-item>
          <a-form-item label="再次确认密码" name="confirmPassword">
            <a-input v-model:value="form.confirmPassword" placeholder="请输入第二次密码确认" type="password"/>
          </a-form-item>
          <a-form-item label="备注" name="remark">
            <a-textarea 
              v-model:value="form.remark" 
              placeholder="请输入" 
              type="text" 
              :auto-size="{ minRows: 2, maxRows: 5 }" 
              showCount 
              :maxlength="200"
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
