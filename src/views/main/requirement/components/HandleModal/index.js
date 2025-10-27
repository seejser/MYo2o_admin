//处理需求
import ImageList from "@/components/plugs/ImageList.vue";
var vuePage = {
  name: 'PostForm',
  components: { 
    ImageList
  },
  data() {
    return {
      visible:false,
      form: {
        conclusion: "",
      },
      rules:{
        conclusion: [
          { required: true, message: '请填写结论', trigger: 'blur' },
        ]
      },
      submitStatus:false,
    }
  },
  methods: {
    //初始化init
    init(id) {
      this.resetForm();
      if(id && id != undefined){
        this.detail(id);
      }
      
    },
    resetForm(){
      this.form = {
        conclusion: "",
      };
    },
    detail(id){
      let params = {
        id,
      };
      this.$axios
      .get(`requirement/detail`,{
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
          this.$nextTick(() => {
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
          })
         
        },
        onCancel:() =>{
        },
      });
    },
    submit(){
      if(this.submitStatus) return;
      let form = JSON.parse(JSON.stringify(this.form));
      let postData = {
        conclusion: form.conclusion.trim(),
      };

      postData['id'] = form.id;
      let url = "requirement/handle";
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
