//轮播图管理
import { mapState, mapActions } from 'vuex'
import BannerForm from './components/BannerForm/index.vue';
import {IconPark} from '@icon-park/vue-next/es/all';
import PicPreviewModal from '@/components/modal/PicPreviewModal.vue';
import {
  BANNER_BELONG_LIST,
  BANNER_BELONG_MAP,
} from "@/const/banner.js";
import {
  OPEN_TYPE_MAP
} from "@/const/common.js";
var vuePage = {
  name: 'Banner',
  components: { 
    IconPark,
    BannerForm,
    PicPreviewModal
  },
  data() {
    return {
      pagination: {
        current:1,
        pageSize: 10,
        total: 0,
        showTotal: (total) =>{
          return `共${total}条`;
        },
      },
      getStatus:false,
      list:[],
      columns:[
        {
          title: '名称',
          dataIndex: 'name',
          align: "center",
          key: 'name',
          width:150,
        },
        {
          title: '图片',
          dataIndex: 'pic',
          align: "center",
          key: 'pic',
          width:150,
          slots: { customRender: 'pic' },
        },
        {
          title: '所属',
          dataIndex: 'belong',
          align: "center",
          key: 'belong',
          slots: { customRender: 'belong' },
        },
        {
          title: '状态',
          dataIndex: 'disable',
          key: 'disable',
          width:100,
          align: "center",
          slots: { customRender: 'disable' },
        },
        {
          title: '排序',
          dataIndex: 'sort',
          key: 'sort',
          align: "center",
          width:120,
        },
        {
          title: '创建时间',
          dataIndex: 'create_at',
          key: 'create_at',
          width:180,
          align: "center",
          slots: { customRender: 'time' },
        },
        {
          title: '操作',
          dataIndex: 'operation',
          align: 'center',
          fixed:"right",
          width:200,
          slots: { customRender: 'operation' },
        },
      ],
      changeStatus:false,
      operationStatus:false,
      searchObj:{
        belong: undefined,
      },
      bannerBelongList: BANNER_BELONG_LIST,
      bannerBelongMap: BANNER_BELONG_MAP,
      openTypeMap: OPEN_TYPE_MAP,
    }
  },
  computed: {
    ...mapState({
    }),
  },
  methods: {
    //初始化init
    init() {
      console.log("bannerBelongMap:",this.bannerBelongMap);
      this.getList();
    },
    getList(){
      if(this.getStatus) return false;
      let params = {
        page: this.pagination.current,
        limit: this.pagination.pageSize,
      };
      if(this.searchObj.belong && this.searchObj.belong != undefined){
        params['belong'] = this.searchObj.belong;
      }
      this.$axios
      .get(`banner/getList`,{
        params
      })
      .then((response) => {
        this.getStatus = false;
        let { code, msg, data } = response
        if (code == 0) {
          let {list,total} = data;
          this.list = list;
          this.pagination.total = total;
        }
      })
      .catch((error) => {
        console.log(error);
        this.getStatus = false;
      })
    },
    handleTableChange(pagination){
      this.pagination.current = pagination.current;
      this.getList();
    },
    reloadList(){
      this.pagination.current = 1;
      this.getList();
    },
    changeDisable(id){
      if(this.operationStatus) return false;
      this.operationStatus = true;
      let postData = {
        id
      };
      this.$axios
      .post(`banner/toggleDisable`,postData)
      .then((response) => {
        this.operationStatus = false;
        let { code, msg, data } = response
        if (code == 0) {
          this.$message.success(msg);
          this.getList();
        }else{
          this.$message.error(msg);
        }
      })
      .catch((error) => {
        console.log(error);
        this.operationStatus = false;
      })
    },
    gotoBannerForm(id){
      this.$nextTick(() => {
        this.$refs.bannerForm.init(id);
      })
    },
    delConfirm(id){
      this.$confirm({
        title: '提示',
        content: '是否确定删除?',
        okText: '确定',
        cancelText: '取消',
        onOk:() =>{
          this.del(id);
        },
        onCancel:() =>{
        },
      });
    },
    del(id){
      if(this.operationStatus) return;
      let postData = {
        id
      }
      this.operationStatus = true;
      this.$axios
      .post("banner/delete",postData)
      .then((response) => {
        this.operationStatus = false;
        let { code, msg, data } = response
        if (code == 0) {
          this.$message.success(msg);
          this.reloadList();
        }else{
          this.$message.error(msg);
        }

      })
      .catch((error) => {
        console.log(error);
        this.operationStatus = false;
      })
    },
    showPreImage(src){
      this.$nextTick(() => {
        this.$refs.picPreviewModal.show([src]);
      })
    }

  },
  created() {
    this.init()
  },
  mounted() {},
}
module.exports = vuePage
