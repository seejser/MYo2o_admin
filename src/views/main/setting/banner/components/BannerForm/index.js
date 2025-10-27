//轮播图编辑
import { mapState, mapActions } from 'vuex';
import ImageUpload from '@/components/plugs/ImageUpload.vue';
import {
  BANNER_BELONG_LIST
} from "@/const/banner.js";
import {
  OPEN_TYPE_LIST,
  OPEN_TYPE_KEY,
} from "@/const/common.js";
var vuePage = {
  name: 'BannerForm',
  components: { 
    ImageUpload
  },
  data() {
    return {
      title: '',
      visible:false,
      formType: 1, // 1:新增 2:编辑
      form: {
        name:'',
        pic:'',
        belong: undefined,
        openType:undefined,
        sort: 1,
        openUrl:'',
        appid:"",
      },
      rules:{
        pic: [
          { required: true, message: '请上传图片', trigger: 'blur' },
        ]
      },
      submitStatus:false,
      bannerBelongList: BANNER_BELONG_LIST,
      openTypeList: OPEN_TYPE_LIST,
      openTypeKey: OPEN_TYPE_KEY,
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
        this.title="编辑轮播图";
        this.formType = 2;
        this.detail(id);
      }else{
        this.title="新增轮播图";
        this.formType = 1;
        this.visible = true;
      }
      
    },
    resetForm(){
      this.form = {
        name:'',
        pic:'',
        belong: undefined,
        openType:undefined,
        sort: 1,
        openUrl:'',
        appid:"",
      };
    },
    detail(id){
      let params = {
        id,
      };
      this.$axios
      .get(`banner/detail`,{
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
      if(!form.belong || form.belong == undefined){
        this.$message.error("请选择所属");
        return false;
      }
      if(form.openType == null || form.openType == undefined){
        this.$message.error("请选择打开类型");
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
      let postData = {
        name: form.name.trim(),
        openUrl: form.openUrl.trim(),
        belong: form.belong,
        openType: form.openType,
        sort: form.sort,
        pic: form.pic,
        appid: form.appid,
      };

      let url = "banner/create";
      if(this.formType == 2){
        postData['id'] = form.id;
        url = "banner/update";
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
