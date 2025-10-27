//帖子管理
import {IconPark} from '@icon-park/vue-next/es/all';
import PicPreviewModal from '@/components/modal/PicPreviewModal.vue';
import PostForm from "./components/PostForm/index.vue";
import CommentListModal from "./components/CommenListModal/index.vue";
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
var vuePage = {
  name: 'Post',
  components: { 
    IconPark,
    PicPreviewModal,
    PostForm,
    CommentListModal,
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
          title: '图片(点击可看更多)',
          dataIndex: 'pics',
          align: "center",
          key: 'pics',
          width:160,
          slots: { customRender: 'pics' },
        },
        {
          title: '内容',
          dataIndex: 'content',
          align: "center",
          key: 'content',
          width:200,
        },
        {
          title: '点赞次数',
          dataIndex: 'likeNum',
          align: "center",
          key: 'likeNum',
          width:120,
        },
        {
          title: '评论次数',
          dataIndex: 'commentNum',
          align: "center",
          key: 'commentNum',
          width:120,
        },
        {
          title: '推荐',
          dataIndex: 'recommendStatus',
          align: "center",
          key: 'recommendStatus',
          width:100,
          slots: { customRender: 'recommendStatus' },
        },
        {
          title: '排序',
          dataIndex: 'sort',
          key: 'sort',
          align: "center",
          width:120,
        },
        {
          title: '发布时间',
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
          width:180,
          slots: { customRender: 'operation' },
        },
      ],
      changeStatus:false,
      operationStatus:false,
      search:{
        key: "",
        recommendStatus: null,
        sortType:null,
        dateRange:[],
      },
      RecommendStatusList:[
        {
          name: '非推荐',
          value: 1,
        },
        {
          name: '推荐',
          value: 2,
        }
      ],
      sortTypeList:[
        {
          name: '按发布时间倒序',
          value: 1,
        },
        {
          name: '按发布时间正序',
          value: 2,
        },
        {
          name: '按点赞次数倒序',
          value: 3,
        },
        {
          name: '按点赞次数正序',
          value: 4,
        },
        {
          name: '按评论次数倒序',
          value: 5,
        },
        {
          name: '按评论次数正序',
          value: 6,
        },
      ],
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
      if(this.search.recommendStatus && this.search.recommendStatus != undefined){
        params['recommendStatus'] = this.search.recommendStatus;
      }
      if(this.search.sortType && this.search.sortType != undefined){
        params['sortType'] = this.search.sortType;
      }
      if(this.search.dateRange.length == 2){
        params['startTime'] = this.search.dateRange[0].valueOf();
        params['endTime'] = this.search.dateRange[1].valueOf();
      }
      this.$axios
      .get(`post/getList`,{
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
    gotoPostForm(id){
      this.$nextTick(() => {
        this.$refs.postForm.init(id);
      })
    },
    showCommentModal(id){
      this.$nextTick(() => {
        this.$refs.commentListModal.init(id);
      })
      
    },
    toggleRecmmend(id){
      if(this.operationStatus) return false;
      this.operationStatus = true;
      let postData = {
        id
      };
      this.$axios
      .post(`post/toggleRecmmend`,postData)
      .then((response) => {
        this.operationStatus = false;
        let { code, msg } = response
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
      .post("post/delete",postData)
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
    showPreImage(pics){
      this.$nextTick(() => {
        this.$refs.picPreviewModal.show(pics);
      })
    },
    async exportLog(){
      if(this.exportStatus) return false;
      this.exportStatus = true;
      let list = [];
      let noMore = false;
      let page = 1;
      do{
        let exportList = await this.getExportList(page,10);
        if(exportList && exportList.length > 0){
          page += 1;
          list = list.concat(exportList);
        }else{
          noMore = true;
        }
      }while(!noMore)
      console.log(list);
      if(list.length <= 0){
        this.$message.error("排序异常");
        return false;
      }
      import("@/libs/Export2Excel").then((excel) => {
        const tHeader = [
          "问题标题",
          "问题内容",
          "话题标签",
          "提问时间",
          "答复人",
          "答复时间",

        ];
        const filterVal = [
          "title",
          "content",
          "tags",
          "create_at",
          "commentUser",
          "commentTime",
        ];
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "历史提问",
        });
      });
      this.exportStatus = false;
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          if (j == "tags") {
            if(v[j] && v[j].length > 0){
              return v[j].join(" ");
            }
            return "";
          }if (j == "create_at" 
                || j == "commentTime") {
            if(v[j]){
              return this.$filters.dateTimeFilter(v[j]);
            }
            return "";
          }else {
            return v[j];
          }
        })
      );
    },
    async getExportList(page,limit){
      return new Promise((resolve,reject) => {
        let params = {
          page: page,
          limit: limit,
          searchKey: this.search.key
        };
        if(this.search.coffeeStatus && this.search.coffeeStatus != undefined){
          params['coffeeStatus'] = this.search.coffeeStatus;
        }
        if(this.search.recommendStatus && this.search.recommendStatus != undefined){
          params['recommendStatus'] = this.search.recommendStatus;
        }
        if(this.search.dateRange.length == 2){
          params['startTime'] = this.search.dateRange[0].valueOf();
          params['endTime'] = this.search.dateRange[1].valueOf();
        }
        this.$axios
        .get(`post/getExportList`,{
          params
        })
        .then((response) => {
          let { code, msg, data } = response
          if (code == 0) {
            let {list} = data;
            resolve(list);
          }else{
            resolve(null);
          }
        })
        .catch((error) => {
          console.log(error);
          resolve(null);
        })
      })
    }

  },
  created() {
    this.init()
  },
  mounted() {},
}
module.exports = vuePage
