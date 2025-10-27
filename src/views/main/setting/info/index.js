//信息管理
import { mapState, mapActions } from 'vuex'
import InfoForm from './components/InfoForm/index.vue';
import {IconPark} from '@icon-park/vue-next/es/all';
import{
  STYLE_LIST,
  STYLE_MAP,
}from "@/const/info.js";
var vuePage = {
  name: 'Info',
  components: { 
    IconPark,
    InfoForm
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
          title: '类型',
          dataIndex: 'style',
          align: "center",
          key: 'style',
          slots: { customRender: 'style' },
        },
        {
          title: '创建时间',
          dataIndex: 'create_at',
          key: 'create_at',
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
      infoStyleList: STYLE_LIST,
      infoStyleMap: STYLE_MAP,
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
      };
      this.$axios
      .get(`info/getList`,{
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
    gotoInfoForm(id){
      this.$nextTick(() => {
        this.$refs.infoForm.init(id);
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
      .post("info/delete",postData)
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
    }

  },
  created() {
    this.init()
  },
  mounted() {},
}
module.exports = vuePage
