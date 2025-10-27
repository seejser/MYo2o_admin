//用户
import { mapState, mapActions } from 'vuex'
import { 
  saveData, 
  getData,
  strTrim,
  checkEmail,
  checkPhone, 
} from '@/libs/utils.js';

var vuePage = {
  name: 'SystemUserForm',
  components: { 
  },
  data() {
    return {
      title: '',
      visible:false,
      formType: 1, // 1:新增 2:编辑
      form: {
        account:'',
        username:'',
        password: '',
        confirmPassword:'',
        remark:'',
        role:null,
      },
      rules:{
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        username: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
        ],
      },
      submitStatus:false,
      roleList:[],
      userRoleList:[],
    }
  },
  computed: {
    ...mapState({}),
  },
  methods: {
    //初始化init
    init(id) {
      this.resetForm();
      if(id && id != undefined){
        this.title="编辑用户";
        this.formType = 2;
        this.getAdminUserInfo(id);
      }else{
        this.title="新增用户";
        this.formType = 1;
        this.visible = true;
      }
      this.getAllRoleList();
      
    },
    resetForm(){
      this.form = {
        account:'',
        username:'',
        password: '',
        confirmPassword:'',
        remark:'',
        role:null,
      };
      this.userRoleList = [];
    },
    getAdminUserInfo(id){
      let params = {
        id,
      };
      this.$axios
      .get(`admin_user/getAdminUserInfo`,{
        params
      })
      .then((response) => {
        this.getStatus = false;
        let { code, msg, data } = response
        if (code == 0) {
          this.visible = true;
          this.form = Object.assign(this.form, data, {
            id: data._id
          })
          //console.log("form:",this.form);
        }
      })
      .catch((error) => {
        console.log(error);
        this.getStatus = false;
      })
    },
    getAllRoleList(){
      this.$axios
      .get(`role/getAllList`)
      .then((response) => {
        this.getStatus = false;
        let { code, msg, data } = response
        if (code == 0) {
          let roleList = [];
          data.map((v) => {
            roleList.push({
              label: v.name,
              value: v._id
            })
          })
          this.roleList = roleList;
          console.log("data:",data);
        }
      })
      .catch((error) => {
        console.log(error);
      })
    },
    submitConfirm(){
      this.$confirm({
        title: '提示',
        content: '是否确定提交?',
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

      let form = JSON.parse(JSON.stringify(this.form));
      form.password = form.password.trim();
      form.confirmPassword = form.confirmPassword.trim();

      let postData = {
        account: form.account.trim(),
        username: form.username.trim(),
        remark: form.remark.trim()
      };
      if(this.formType == 1 || form.password != ""){
        if(form.password == "" || form.confirmPassword == ""){
          this.$message.error("密码不能为空")
          return false;
        }
        if(form.password.length < 6 || form.confirmPassword.length < 6){
          this.$message.error("密码长度不能小于6");
          return false;
        }
        if(form.password != form.confirmPassword){
          this.$message.error("两次密码不一致");
          return false;
        }
        postData['password'] = form.password;
      }

      if(form.role){
        postData['role'] = form.role;
      }


      let url = "admin_user/addAdmin";

      if(this.formType == 2){
        postData['id'] = form.id;
        url = "admin_user/updateAdmin";
      }
      this.submitStatus = true;
      this.$axios
      .post(url,postData)
      .then((response) => {
        this.submitStatus = false;
        let { code, msg, data } = response
        if (code == 0) {
          this.$emit("reloadList");
          this.$message.success(msg);
          this.visible = false;
        }else{
          this.$message.error(msg);
        }

      })
      .catch((error) => {
        console.log(error);
        this.submitStatus = false;
      })
    },
    handleRoleChange(e){
      console.log("e:",e);
    }


    

  },
  created() {
  },
  mounted() {},
}
module.exports = vuePage
