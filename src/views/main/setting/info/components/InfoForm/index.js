//信息
import { mapState, } from 'vuex'
import MineQuillEditor from "@/components/plugs/MineQuillEditor.vue";
import{
  STYLE_LIST,
  STYLE_MAP,
  STYLE_KEY,
}from "@/const/info.js";
var vuePage = {
  name: 'InfoForm',
  components: { 
    MineQuillEditor
  },
  data() {
    return {
      title: '',
      visible:false,
      formType: 1, // 1:新增 2:编辑
      form: {
        style:null,
        content:'',
      },
      rules:{
        content: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
        ],
      },
      submitStatus:false,
      infoStyleList: STYLE_LIST,
      infoStyleMap: STYLE_MAP,
      infoStyleKey: STYLE_KEY,
    }
  },
  computed: {
    ...mapState({
    }),
  },
  methods: {
    //初始化init
    init(id) {
      this.resetForm();
      if(id && id != undefined){
        this.title="编辑信息";
        this.formType = 2;
        this.getDetail(id);
      }else{
        this.title="新增信息";
        this.formType = 1;
        this.visible = true;
      }
      
    },
    resetForm(){
      this.form = {
        style:null,
        content:'',
      };
    },
    getDetail(id){
      let params = {
        id,
      };
      this.$axios
      .get(`info/detail`,{
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

      if(!form.style || form.style == undefined){
        this.$message.error("请选择类型");
        return false;
      }

      if(form.content == ''){
        this.$message.error("内容不能为空");
        return false;
      }

      let postData = {
        style: form.style,
        content: form.content,
      };

      let url = "info/create";
      if(this.formType == 2){
        postData['id'] = form.id;
        url = "info/update";
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

  },
  created() {
  },
  mounted() {},
}
module.exports = vuePage
