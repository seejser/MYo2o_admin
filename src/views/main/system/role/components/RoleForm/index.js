//用户
import { mapState, mapActions } from 'vuex'
import { saveData, getData,strTrim } from '@/libs/utils.js';

var vuePage = {
  name: 'SystemRoleForm',
  components: { 
  },
  data() {
    return {
      title: '',
      visible:false,
      formType: 1, // 1:新增 2:编辑
      form: {
        name:'',
      },
      rules:{
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ]
      },
      submitStatus:false,
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
        this.title="编辑角色";
        this.formType = 2;
        this.detail(id);
      }else{
        this.title="新增角色";
        this.formType = 1;
        this.visible = true;
      }
      
    },
    resetForm(){
      this.form = {
        name:'',
      }
    },
    detail(id){
      let params = {
        id,
      };
      this.$axios
      .get(`role/detail`,{
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

      let postData = {
        name: form.name.trim()
      };

      let url = "role/create";
      if(this.formType == 2){
        postData['id'] = form.id;
        url = "role/update";
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
    }


    

  },
  created() {
  },
  mounted() {},
}
module.exports = vuePage
