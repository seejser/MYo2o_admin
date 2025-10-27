//用户管理
import { mapState, mapActions } from 'vuex'
import { saveData, getData,strTrim } from '@/libs/utils.js';
import UserForm from './components/UserForm/index.vue';
import {IconPark} from '@icon-park/vue-next/es/all';
var vuePage = {
  name: 'SystemUser',
  components: { 
    IconPark,
    UserForm
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
          title: '账号',
          dataIndex: 'account',
          key: 'account',
          width:150,
        },
        {
          title: '用户名',
          dataIndex: 'username',
          key: 'username',
          align: "center",
          width:150,
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          width:80,
          align: "center",
          slots: { customRender: 'status' },
        },
        {
          title: '最后登录时间',
          dataIndex: 'login_time',
          key: 'login_time',
          width:200,
          align: "center",
          slots: { customRender: 'time' },
        },
        {
          title: '创建时间',
          dataIndex: 'create_at',
          key: 'create_at',
          width:200,
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
      searchKey:'',
      operationStatus:false,
    }
  },
  computed: {
    ...mapState({}),
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
        searchKey: this.searchKey,
      };
      this.$axios
      .get(`admin_user/getList`,{
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
    statusChange(id){
      if(this.operationStatus) return false;
      this.operationStatus = true;
      let postData = {
        id
      };
      this.$axios
      .post(`admin_user/changeAdminStatus`,postData)
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
    gotoUserForm(id){
      this.$nextTick(() => {
        this.$refs.userForm.init(id);
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
      .post("admin_user/deleteAdmin",postData)
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
