//评论管理
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import {IconPark} from '@icon-park/vue-next/es/all';
var vuePage = {
  name: 'CommentListModal',
  components: { 
    IconPark
  },
  data() {
    return {
      visible:false,
      postId:null,
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
          title: '评论人',
          dataIndex: 'nickName',
          align: "center",
          key: 'nickName',
          width:150,
          slots: { customRender: 'nickName' },
        },
        {
          title: '评论人头像',
          dataIndex: 'avatarUrl',
          align: "center",
          key: 'avatarUrl',
          width:130,
          slots: { customRender: 'avatarUrl' },
        },
        {
          title: '评论内容',
          dataIndex: 'content',
          align: "center",
          key: 'content',
        },
        {
          title: '评论时间',
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
          width:120,
          slots: { customRender: 'operation' },
        },
      ],
      changeStatus:false,
      operationStatus:false,
      search:{
        key: "",
        coffeeStatus: null,
        recommendStatus: null,
        sortType:null,
        dateRange:[],
      },
    }
  },
  methods: {
    //初始化init
    init(id) {
      this.postId = id;
      if(this.postId && this.postId != undefined) {
        this.list = [];
        this.getList();
        this.visible = true;
      }
    },
    getList(){
      if(this.getStatus) return false;
      let params = {
        page: this.pagination.current,
        limit: this.pagination.pageSize,
        searchKey: this.search.key,
        postId: this.postId
      };
      if(this.search.dateRange.length == 2){
        params['startTime'] = this.search.dateRange[0].valueOf();
        params['endTime'] = this.search.dateRange[1].valueOf();
      }
      this.$axios
      .get(`post_comment/getList`,{
        params
      })
      .then((response) => {
        this.getStatus = false;
        let { code, msg, data } = response
        if (code == 0) {
          let {list,total} = data;
          this.list = [];
          this.list = this.handleData(list);
          this.pagination.total = total;
        }
      })
      .catch((error) => {
        console.log(error);
        this.getStatus = false;
      })
    },
    handleData(data){
      let list = []
      data.map((v) => {
        if(v.childComment){
          v['children'] =  v.childComment.list;
        }
        list.push(v);
      })
      return list;
    },
    handleTableChange(pagination){
      this.pagination.current = pagination.current;
      this.getList();
    },
    reloadList(){
      this.pagination.current = 1;
      this.getList();
    },
    showCommentModal(id){
      this.$nextTick(() => {
        this.$refs.commentListModal.init(id);
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
      .post("post_comment/delete",postData)
      .then((response) => {
        this.operationStatus = false;
        let { code, msg, data } = response
        if (code == 0) {
          this.$message.success(msg);
          this.reloadList();
          this.$emit("reloadList");
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
  },
  mounted() {},
}
module.exports = vuePage
