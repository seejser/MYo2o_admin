//用户
import { mapState, mapActions } from 'vuex'
import { saveData, getData,strTrim } from '@/libs/utils.js';
var vuePage = {
  name: 'SystemMenuForm',
  components: { 
  },
  data() {
    return {
      title: '',
      visible:false,
      formType: 1, // 1:新增 2:编辑
      form: {
        title:'',
        name:'',
        icon:'',
        path:'',
        type: null,
        sort:1,
        level:1,
        parent:null,
      },
      rules:{
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        type: [
          { type: 'number', required: true, message: '请输入类型', trigger: 'change' },
        ],
      },
      submitStatus:false,
      typeOptions: [
        {
          value: 1,
          label: '菜单',
        },
        {
          value: 2,
          label: '方法',
        },
      ]
    }
  },
  computed: {
    ...mapState({}),
  },
  methods: {
    //初始化init
    init(id,parent,level) {
      this.resetForm();
      if(id && id != undefined){
        this.title="编辑菜单";
        this.formType = 2;
        this.detail(id);
      }else{
        this.title="新增菜单";
        if(parent){
          this.form.parent = parent;
        }
        this.form.level = (level + 1);
        this.formType = 1;
        this.visible = true;
      }
      
    },
    resetForm(){
      this.form = {
        title:'',
        name:'',
        icon:'',
        path:'',
        type: null,
        sort:1,
        level:1,
        parent:null,
      }
    },
    detail(id){
      let params = {
        id,
      };
      this.$axios
      .get(`menu/detail`,{
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

      let postData = JSON.parse(JSON.stringify(this.form));

      postData.name = postData.name.trim();
      postData.path = postData.path.trim();
      

      let url = "menu/create";

      if(this.formType == 2){
        url = "menu/update";
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
