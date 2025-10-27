//权限设置
import { mapState, mapActions } from 'vuex'
import { saveData, getData,strTrim } from '@/libs/utils.js';
var vuePage = {
  name: 'SystemRoleAuthSetting',
  components: { 
  },
  data() {
    return {
      visible:false,
      roleId:-1,
      submitStatus:false,
      list:[],
      selectedKeys:[],
      checkedKeys:[],
      expandedKeys:[],
      replaceFields:{
        children:'children', 
        title:'title', 
        key:'key'
      },
      selectIdList:[],
      authInitList:[],
    }
  },
  computed: {
    ...mapState({}),
  },
  methods: {
    //初始化init
    init(id) {
      this.roleId = id;
      this.selectedKeys =[];
      this.checkedKeys =[];
      this.expandedKeys =[];
      this.getMenuListByRole();
    
    },
    getMenuListByRole(){
      let params = {
        roleId: this.roleId,
      };
      this.$axios
      .get(`role/getMenuListByRole`,{
        params
      })
      .then((response) => {
        this.getStatus = false;
        let { code, msg, data } = response
        if (code == 0) {
          this.visible = true;
          this.list = this.handleMenu(data);
          this.initCheckedKeys();
        }
      })
      .catch((error) => {
        console.log(error);
        this.getStatus = false;
      })
    },
    initCheckedKeys(){
      let authInitList = JSON.parse(JSON.stringify(this.authInitList));
      authInitList.sort(function(a,b){
        return a.length > b.length;
      })
      let checkedKeys = [];
      authInitList.map((v) => {
        let pass = true;
        for(var i = 0,l = checkedKeys.length; i < l; i++){
          if(checkedKeys[i].indexOf(v) != -1){
            pass = false;
            i = l;
          }
        }
        if(pass){
          checkedKeys.push(v);
        }
      })
      this.checkedKeys = checkedKeys;
    },
    handleMenu(list){
      this.authInitList = [];
      list = this.menu_merge(list,null,"-");
      return list;
    },
    menu_merge(node,parent,str){
      var arr = [];
      node.forEach((v, index) => {
        this.count += 1;
        if(v['parent'] == parent){
            let nodes = JSON.parse(JSON.stringify(node));
            nodes.splice(index,1);
            v.id = v._id;
            v.key = str + v._id + "-";
            v['children'] = this.menu_merge(nodes,v['_id'],v.key);
            arr.push(v);
            if(v.selected == 1){
              this.authInitList.push(v.key);
            }
            
          }
      });
      if(arr.length <= 0) return null;
      else return arr;
    },
    getSelectIdList(){
      let selectIdList = [];
      let checkedKeys = JSON.parse(JSON.stringify(this.checkedKeys));
      checkedKeys.map((v) => {
        let keys = v.split("-");
        for(var i = 1; i < keys.length - 1; i++){
          let key = keys[i];
          if(selectIdList.indexOf(key) == -1){
            selectIdList.push(key);
          }
        }
      })
      return selectIdList;
    },
    submitConfirm(){
      this.$confirm({
        title: '提示',
        content: '是否确定提交?',
        okText: '确定',
        cancelText: '取消',
        onOk:() =>{
          this.submit();
        },
        onCancel:() =>{
        },
      });
    },
    submit(){
      if(this.submitStatus) return;
      let selectIdList = this.getSelectIdList();
      let postData = {
        roleId: this.roleId,
        authList: JSON.stringify(selectIdList)
      };
      this.submitStatus = true;
      this.$axios
      .post("role/setRoleAuth",postData)
      .then((response) => {
        this.submitStatus = false;
        let { code, msg, data } = response
        if (code == 0) {
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
    }


    

  },
  created() {
  },
  mounted() {},
}
module.exports = vuePage
