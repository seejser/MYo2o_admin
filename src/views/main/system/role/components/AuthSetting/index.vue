<!--权限设置-->
<template>
  	<a-modal
      title="权限设置"
      v-model:visible="visible"
      cancelText="取消"
      okText="确定"
      @ok="submitConfirm"
    >
      <a-tree
        checkable
        :tree-data="list"
        :checkStrictly="false"
        :replaceFields="replaceFields"
        v-model:selectedKeys="selectedKeys"
        v-model:checkedKeys="checkedKeys"
        v-model:expandedKeys="expandedKeys"
      >
        <template #title="{title,type,id}">
          <a-tag color="blue" v-if="type == 1">菜单</a-tag>
          <a-tag color="cyan" v-if="type == 2">方法</a-tag>
          {{title}}
        </template>
      </a-tree>
    </a-modal>
</template>
<script>
import index from './index.js'
export default index
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
