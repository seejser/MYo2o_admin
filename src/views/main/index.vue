<!--主页面-->
<template>
  <div class="mainBox">
    <a-layout :style="{ minHeight: '100vh'}">
      <HeaderNav @toggleMenu="toggleMenu"></HeaderNav>
      <a-layout>
        <a-layout-sider v-bind:class="{'siderLayoutBox':true,'hidden':!siderLayoutShow}" style="background: #FAFCFD">
        	<AsideNav ref="asideNav" @toggleMenu="toggleMenu"></AsideNav>
        </a-layout-sider>
        <a-layout>
        	 <a-layout-content style="background: #F5F7F9;">
            <a-tabs 
              v-model:activeKey="tabActiveKey" 
              hide-add 
              type="editable-card" 
              :tabBarGutter="4"
              @edit="onEdit" 
              size="small"
              style="background: #FFF;"
              @change="change">
              <a-tab-pane 
                v-for="tab in tabList" 
                :key="tab.name" 
                :tab="tab.title" 
                :closable="tabList.length > 1">
              </a-tab-pane>
            </a-tabs>
            <div class="mainContentBox">
              <router-view @gotoMenu="gotoMenu"></router-view>
            </div>
        	 </a-layout-content>
        	 <p class="copy-right"></p>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import index from './index.js'
export default index
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
