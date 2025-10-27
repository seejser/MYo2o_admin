//客户管理
import { mapState, mapActions } from 'vuex'
import {IconPark} from '@icon-park/vue-next/es/all';
import CommonSelect from "@/components/alone/CommonSelect.vue";
import{
  MUTE_LIST,
  MUTE_KEY,
  EXPERT_LIST,
  EXPERT_KEY,
}from "@/const/user.js";
var vuePage = {
  name: 'User',
  components: { 
    IconPark,
    CommonSelect
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
          title: '昵称',
          dataIndex: 'nickName',
          align: "center",
          key: 'nickName',
          width:150,
        },
        {
          title: '头像',
          dataIndex: 'avatarUrl',
          align: "center",
          key: 'avatarUrl',
          width:100,
          slots: { customRender: 'pic' },
        },
        // {
        //   title: '联系方式',
        //   dataIndex: 'mobile',
        //   key: 'mobile',
        //   width:140,
        //   align: "center",
        // },
        {
          title: '禁言状态',
          dataIndex: 'mute',
          key: 'mute',
          width:100,
          align: "center",
          slots: { customRender: 'mute' },
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
          title: '注册时间',
          dataIndex: 'create_at',
          key: 'create_at',
          width:120,
          align: "center",
          slots: { customRender: 'time' },
        },
        // {
        //   title: '操作',
        //   dataIndex: 'operation',
        //   align: 'center',
        //   fixed:"right",
        //   width:180,
        //   slots: { customRender: 'operation' },
        // },
      ],
      changeStatus:false,
      operationStatus:false,
      search:{
        key: '',
        mute:null,
        expert:null,
      },
      userMuteList: MUTE_LIST,
      userMuteKey: MUTE_KEY,
      userExpertList: EXPERT_LIST,
      userExpertKey: EXPERT_KEY,
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
        searchKey: this.search.key,
      };
      let search = JSON.parse(JSON.stringify(this.search));
      if(search.mute){
        params['mute'] = search.mute;
      }

      if(search.expert){
        params['expert'] = search.expert;
      }
      
      this.$axios
      .get(`user/getList`,{
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
      let postData = {
        id
      };
      this.operationStatus = true;
      this.$axios
      .post(`user/toggleDisable`,postData)
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
    changeMute(id){
      if(this.operationStatus) return false;
      let postData = {
        id
      };
      this.operationStatus = true;
      this.$axios
      .post(`user/toggleMute`,postData)
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
    changeExpert(id){
      if(this.operationStatus) return false;
      let postData = {
        id
      };
      this.operationStatus = true;
      this.$axios
      .post(`user/toggleExpert`,postData)
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
  },
  created() {
    this.init()
  },
  mounted() {},
}
module.exports = vuePage
