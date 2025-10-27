<!--登录-->
<template>
  	<div class="mainBox">
  		<div class="bgBox"></div>
  		<div class="loginBox">
			<div class="titleBox">
				<div class="titleText">{{$projectTitle}}</div>
			</div>
        	<a-form
        		class="loginForm"
            ref="ruleForm" 
            layout="vertical"
            :model="form" 
            :rules="rules"
            :hideRequiredMark="true" >
          	<a-form-item label="用户名" name="account">
            		<a-input class="formInput" v-model:value="form.account" placeholder="请输入用户名">
            		  <template #prefix>
				            <IconPark type="user" theme="outline" />
				          </template>
            		</a-input>
          	</a-form-item>
          	<a-form-item label="密码" name="password">
            		<a-input 
                  class="formInput" 
                  :type="passType" 
                  :autocomplete="false"
                  v-model:value="form.password" 
                  placeholder="请输入密码">
            			<template #prefix>
				            <IconPark type="lock" theme="outline" />
				          </template>
            			<template #suffix>
            				<IconPark type="preview-close-one" theme="outline" @click="passTypeChange" v-if="passType == 'password'"/>
                    <IconPark type="preview-open" theme="outline" @click="passTypeChange" v-else/>
				          </template>
            		</a-input>
          	</a-form-item>
          	<a-form-item label="验证码" name="code">
            		<a-row type="flex" align="middle">
              		<a-col :span="11">
                			<a-input class="formInput" v-model:value="form.code" placeholder="请输入验证码">
                				<template #prefix>
				        		      <IconPark type="people-safe" theme="outline"/>
				    		        </template>
                			</a-input>
              		</a-col>
              		<a-col :span="11" :offset="2" class="flexBox">
						<div class="codeImg" v-html="code_img" @click="getCaptcha"></div>
						<span class="codeImgTip" @click="getCaptcha">看不清</span>
              		</a-col>
            		</a-row>
          	</a-form-item>
          	<a-form-item >
              	<a-button
              		size="large"  
              		type="primary" 
              		html-type="submit" 
              		@click="handleSubmit" 
              		block
              		>登录</a-button>
          	</a-form-item>
        	</a-form>
        </div>
  	</div>
</template>
<script>
import index from './index.js'
export default index
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
