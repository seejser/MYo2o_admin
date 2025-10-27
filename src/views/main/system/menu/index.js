//菜单管理
import { mapState, mapActions } from 'vuex'
import { saveData, getData,strTrim } from '@/libs/utils.js';
import MenuForm from './components/MenuForm/index.vue';
import {IconPark} from '@icon-park/vue-next/es/all';
var vuePage = {
  name: 'SystemMenu',
  components: { 
    IconPark,
    MenuForm,
  },
  data() {
    return {
      getStatus:false,
      list:[],
      columns:[
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title',
          width:300,
        },
        {
          title: '类型',
          dataIndex: 'type',
          key: 'type',
          align: "center",
          slots: { customRender: 'type' },
        },
        {
          title: '状态',
          dataIndex: 'disable',
          key: 'disable',
          align: "center",
          slots: { customRender: 'disable' },
        },
        {
          title: '排序',
          dataIndex: 'sort',
          key: 'sort',
          align: "center",
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
      count:0,

    }
  },
  computed: {
    ...mapState({}),
  },
  methods: {
    init() {
      this.getList();
    },
    getList(){
      if(this.getStatus) return false;
      let params = {
        searchKey: this.searchKey,
      };
      this.$axios
      .get(`menu/getList`,{
        params
      })
      .then((response) => {
        this.getStatus = false;
        let { code, msg, data } = response
        if (code == 0) {
          let list = this.handleMenu(data);
          this.list = [];
          this.list = list;
        }
      })
      .catch((error) => {
        console.log(error);
        this.getStatus = false;
      })
    },
    handleMenu(list){
      list = this.menu_merge(list,null);
      return list;
      
    },
    menu_merge(node,parent){
      var arr = [];
      node.forEach((v, index) => {
        this.count += 1;
        if(v['parent'] == parent){
            let nodes = JSON.parse(JSON.stringify(node));
            nodes.splice(index,1);
            v['children'] = this.menu_merge(nodes,v['_id']);
            arr.push(v);
          }
      });
      if(arr.length <= 0) return null;
      else return arr;
    },
    reloadList(){
      this.getList();
    },
    changeDisable(id){
      if(this.operationStatus) return false;
      this.operationStatus = true;
      let postData = {
        id
      };
      this.$axios
      .post(`menu/toggleDisable`,postData)
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
    gotoMenuForm(id,parent,level){
      this.$nextTick(() => {
        this.$refs.menuForm.init(id,parent,level);
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
      .post("menu/delete",postData)
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
