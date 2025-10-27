//登陆
import { mapState, mapActions } from 'vuex';
import {IconPark} from '@icon-park/vue-next/es/all';

import {saveLocalData,getData} from '../../libs/utils.js';

var vuePage = {
  name: 'Login',
  components: {
    IconPark,
  },
  data() {
    return {
      form: {
        account: '',
        password: '',
        // account: 'norgren@service.com',
        // password: '1vhpb0X4UV389u8e',
        code:'',
      },
      rules: {
        account: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ]
      },
      captcha_token: '',
      code_img:'',
      loginStatus: false,
      passType:"password",

    }
  },
  computed: {
  },
  methods: {
    ...mapActions('admin_user', [
      'setUser'
    ]),
    //初始化init
    init() {
      this.getCaptcha();
      this.initCheckKeyDown();
    },
    initCheckKeyDown(){
      document.onkeydown =(e) => {   //按下回车提交
        let key = window.event.keyCode;  
        if (key == 13) {
            this.handleSubmit();
        }
      };
    },
    getCaptcha(){
      this.$axios
      .get(`admin_user/getCaptcha`)
      .then((response) => {
        let { code, msg, data } = response;
        if(code == 0){
          this.captcha_token = data.captcha_token;
          this.code_img = data.img;
        }else{
          this.$message.error(msg);
        }
      })
      .catch((error) => {
        console.log(error)
      })
    },
    passTypeChange(){
      this.passType = (this.passType == "password" ? "text" : "password");
    },
    async handleSubmit(){
      this.$refs.ruleForm
      .validate()
      .then(() => {
        this.login();
      })
      .catch(error => {
        if(!error.errorFields || error.errorFields.length <= 0){
          this.login();
        }
      });
    },
    login(){
      if(this.loginStatus) return;

      let form = JSON.parse(JSON.stringify(this.form));
      let postData = {
        account: form.account.trim(),
        password: form.password.trim(),
        code: form.code.trim(),
        captcha_token: this.captcha_token,
      }
      this.loginStatus = true;
      this.$axios
      .post(`admin_user/login`,postData)
      .then((response) => {
        this.loginStatus = false;
        let { code, msg, data } = response
        if (code == 0) {
          let {token,userInfo} = data;
          saveLocalData('services_admin_token',token);
          this.setUser(userInfo);
          this.$router.push('/home');  //跳转到首页
          this.$message.success(msg);
        }else{
          this.form.code = "";
          this.getCaptcha(); 
          this.$message.error(msg);
        }

      })
      .catch((error) => {
        console.log(error);
        this.loginStatus = false;
      })
    },

  },
  created() {
    this.init()
  },
  mounted() {},
}
module.exports = vuePage
