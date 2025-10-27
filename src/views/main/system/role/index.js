//角色管理
import { mapState, mapActions } from 'vuex'
import RoleForm from './components/RoleForm/index.vue';
import AuthSetting from './components/AuthSetting/index.vue';

import {IconPark} from '@icon-park/vue-next/es/all';
var vuePage = {
  name: 'SystemRole',
  components: {
    RoleForm,
    IconPark,
    AuthSetting
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
          key: 'name',
          align: "center",
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
      operationStatus:false,
      search:{
        key:'',
      }
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
        searchKey: this.search.key,
      };
      this.$axios
      .get(`role/getList`,{
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
    gotoRoleForm(id){
      this.$nextTick(() => {
        this.$refs.roleForm.init(id);
      })
    },
    gotoAuthSetting(id){
      this.$nextTick(() => {
        this.$refs.authSetting.init(id);
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
      .post("role/delete",postData)
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
