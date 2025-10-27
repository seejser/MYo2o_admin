<template>
  <a-modal
    title="修改密码"
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
        <a-form-item label="新密码" name="pass">
          <a-input v-model:value="form.pass" placeholder="请输入新密码" type="password"/>
        </a-form-item>
        <a-form-item label="再次确认密码" name="confirmPass">
          <a-input v-model:value="form.confirmPass" placeholder="请输入第二次密码确认" type="password"/>
        </a-form-item>
    </a-form>
  </a-modal>
</template>

<script> 
export default {
  name: 'PassModifyModal',
  props: {
  },
  data() {
    return {
      visible:false,
      form: {
        pass: '',
        confirmPass:'',
      },
      rules:{
        pass: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          {
            min: 6,
            message: '密码长度不能小于6',
            trigger: 'blur',
          },
        ],
        confirmPass: [
          { required: true, message: '请输入第二次密码确认', trigger: 'blur' },
          {
            min: 6,
            message: '密码长度不能小于6',
            trigger: 'blur',
          },
        ],
      },
      submitStatus:false,
    }
  },
  methods: {
    show(){
      this.form = {
        pass: '',
        confirmPass:'',
      };
      this.visible = true;
    },
    submitConfirm(){
      this.$confirm({
        title: '提示',
        content: '是否确定修改成此密码?',
        okText: '确定',
        cancelText: '取消',
        onOk:() =>{
          this.$refs.ruleForm
          .validate()
          .then(() => {
            this.submit();
          })
          .catch(error => {
            if(!error.errorFields || error.errorFields.length <= 0){
              this.submit();
            }
          });
        },
        onCancel:() =>{
        },
      });
    },
    submit(){
      if(this.submitStatus) return;
      let form =  JSON.parse(JSON.stringify(this.form));
      form.pass = form.pass.trim();
      form.confirmPass = form.confirmPass.trim();
      if(form.pass != form.confirmPass){
        this.$message.error("两次密码不一致");
        return false;
      }
      let postData = {
        password: form.pass
      };
      this.submitStatus = true;
      this.$axios
      .post(`admin_user/modifyPass`,postData)
      .then((response) => {
        this.submitStatus = false;
        let { code, msg, data } = response
        if (code == 0) {
          this.$message.success(msg);
          this.$emit("exit");
        }else{  
          this.$message.error(msg);
        }
      })
      .catch((error) => {
        this.submitStatus = false;
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

  
  .ql-container{
    color: #333;
    margin-top: 20px;
    .ql-editor{
      padding: 0px;
    }
  }
  ::-webkit-scrollbar-thumb{
    background: #FFF;
  }
  
</style>
