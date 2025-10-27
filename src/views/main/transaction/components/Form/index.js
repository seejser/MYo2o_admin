//业务编辑
import { mapState, mapActions } from 'vuex';
import ImageUpload from '@/components/plugs/ImageUpload.vue';
import MineQuillEditor from "@/components/plugs/MineQuillEditor.vue";
import TagListFreeEditor from "@/components/alone/TagListFreeEditor.vue";
import {
  TRANSACTION_TAG_LIST
} from "@/const/transaction.js";
var vuePage = {
  name: 'TransactionForm',
  components: { 
    ImageUpload,
    MineQuillEditor,
    TagListFreeEditor,
  },
  data() {
    return {
      title: '',
      visible:false,
      formType: 1, // 1:新增 2:编辑
      form: {
        title:'',
        brief:"",
        pic:'',
        tag: undefined,
        amount:"",
        scopeList:[],
        content:"",
        sort: 1,
      },
      rules:{
        pic: [
          { required: true, message: '请上传图片', trigger: 'blur' },
        ]
      },
      submitStatus:false,
      transactionTagList: TRANSACTION_TAG_LIST,
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
        this.title="编辑业务";
        this.formType = 2;
        this.detail(id);
      }else{
        this.title="新增业务";
        this.formType = 1;
        this.visible = true;
      }
      
    },
    resetForm(){
      this.form = {
        title:'',
        brief:"",
        pic:'',
        tag: undefined,
        amount:"",
        scopeList:[],
        content:"",
        sort: 1,
      };
    },
    detail(id){
      let params = {
        id,
      };
      this.$axios
      .get(`transaction/detail`,{
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
      if(!form.tag || form.tag == undefined){
        this.$message.error("请选择类型");
        return false;
      }

      if(form.sort == null || form.sort == undefined){
        this.$message.error("请填写排序");
        return false;
      }

      form.sort = Number(form.sort);
      if(form.sort == NaN || form.sort < 0){
        this.$message.error("排序异常");
        return false;
      }
      if(form.scopeList.length <= 0){
        this.$message.error("业务范围不能为空");
        return false;
      }

      form.scopeList = JSON.stringify(form.scopeList);


      let postData = {
        title: form.title.trim(),
        brief: form.brief.trim(),
        tag: form.tag,
        sort: form.sort,
        pic: form.pic,
        amount: form.amount,
        content: form.content,
        scopeList: form.scopeList,
      };

      let url = "transaction/create";
      if(this.formType == 2){
        postData['id'] = form.id;
        url = "transaction/update";
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
