//需求管理
import {IconPark} from '@icon-park/vue-next/es/all';
import PicPreviewModal from '@/components/modal/PicPreviewModal.vue';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import HandleModal from "./components/HandleModal/index.vue";
import CertificateModal from "./components/CertificateModal/index.vue";
import {
  STATUS_LIST,
  STATUS_MAP,
  STATUS_KEY,
} from "@/const/requirement.js";
var vuePage = {
  name: 'Post',
  components: { 
    IconPark,
    PicPreviewModal,
    HandleModal,
    CertificateModal,
  },
  data() {
    return {
      locale,
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
          title: '昵称',
          dataIndex: 'nickName',
          align: "center",
          key: 'nickName',
          width:150,
          slots: { customRender: 'nickName' },
        },
        {
          title: '头像',
          dataIndex: 'avatarUrl',
          align: "center",
          key: 'avatarUrl',
          width:100,
          slots: { customRender: 'avatarUrl' },
        },
        {
          title: '需求人',
          dataIndex: 'name',
          align: "center",
          key: 'name',
          width:120,
        },
        {
          title: '联系方式',
          dataIndex: 'mobile',
          align: "center",
          key: 'mobile',
          width:120,
        },
        {
          title: '需求内容',
          dataIndex: 'content',
          align: "center",
          key: 'content',
          width:200,
        },
        {
          title: '关联业务',
          dataIndex: 'transaction',
          align: "center",
          key: 'transaction',
          width:200,
          slots: { customRender: 'transaction' },
        },
        {
          title: '状态',
          dataIndex: 'status',
          align: "center",
          key: 'status',
          width:100,
          slots: { customRender: 'status' },
        },
        {
          title: '结论',
          dataIndex: 'conclusion',
          align: "center",
          key: 'conclusion',
          width:150,
        },
        {
          title: '提交时间',
          dataIndex: 'create_at',
          key: 'create_at',
          width:120,
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
      search:{
        key: "",
        status:null,
        dateRange:[],
      },
      requirementStatusMap: STATUS_MAP,
      requirementStatusList: STATUS_LIST,
      requirementStatusKey: STATUS_KEY,
      exportStatus: false,
    }
  },
  methods: {
    //初始化init
    init() {
      this.getList();
    },
    getList(){
      if(this.getStatus) return false;
      let params = {
        page: this.pagination.current,
        limit: this.pagination.pageSize,
        searchKey: this.search.key
      };
      if(this.search.status && this.search.status != undefined){
        params['status'] = this.search.status;
      }
      if(this.search.dateRange.length == 2){
        params['startTime'] = this.search.dateRange[0].valueOf();
        params['endTime'] = this.search.dateRange[1].valueOf();
      }
      this.$axios
      .get(`requirement/getList`,{
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
    handle(id){
      this.$nextTick(() => {
        this.$refs.handleModal.init(id);
      })
    },
    showCertificateModal(id){
      this.$nextTick(() => {
        this.$refs.certificateModal.init(id);
      })
      
    },
    showPreImage(pics){
      this.$nextTick(() => {
        this.$refs.picPreviewModal.show(pics);
      })
    },
  },
  created() {
    this.init()
  },
  mounted() {},
}
module.exports = vuePage
