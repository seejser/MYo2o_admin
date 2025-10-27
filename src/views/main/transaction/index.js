//业务管理
import { mapState, mapActions } from 'vuex'
import TransactionForm from './components/Form/index.vue';
import {IconPark} from '@icon-park/vue-next/es/all';
import PicPreviewModal from '@/components/modal/PicPreviewModal.vue';
import {
  TRANSACTION_TAG_LIST,
  TRANSACTION_TAG_MAP,
} from "@/const/transaction.js";
var vuePage = {
  name: 'Transaction',
  components: { 
    IconPark,
    TransactionForm,
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
          title: '标题',
          dataIndex: 'title',
          align: "center",
          key: 'title',
          width:150,
        },
        {
          title: '类型',
          dataIndex: 'tag',
          align: "center",
          key: 'tag',
          width:120,
          slots: { customRender: 'tag' },
        },
        {
          title: '费用',
          dataIndex: 'amount',
          align: "center",
          key: 'amount',
          width:100,
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
          title: '浏览数量',
          dataIndex: 'readNum',
          key: 'readNum',
          align: "center",
          width:120,
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
      searchObj:{
        tag: undefined,
        key: "",
      },
      transactionTagList: TRANSACTION_TAG_LIST,
      transactionTaggMap: TRANSACTION_TAG_MAP,
    }
  },
  computed: {
    ...mapState({
    }),
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
        searchKey: this.searchObj.key,
      };
      if(this.searchObj.tag && this.searchObj.tag != undefined){
        params['tag'] = this.searchObj.tag;
      }
      this.$axios
      .get(`transaction/getList`,{
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
      .post(`transaction/toggleDisable`,postData)
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
    gotoTransactionForm(id){
      this.$nextTick(() => {
        this.$refs.transactionForm.init(id);
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
      .post("transaction/delete",postData)
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
