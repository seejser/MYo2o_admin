//证件管理
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import {IconPark} from '@icon-park/vue-next/es/all';
import PicPreviewModal from '@/components/modal/PicPreviewModal.vue';
import {
  CERTIFICATE_STYLE_LIST,
  CERTIFICATE_STYLE_MAP,
  CERTIFICATE_STYLE_KEY,
}  from "@/const/certificate";
var vuePage = {
  name: 'CertificateModal',
  components: { 
    IconPark,
    PicPreviewModal
  },
  data() {
    return {
      visible:false,
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
          title: '类型',
          dataIndex: 'style',
          align: "center",
          key: 'style',
          width:150,
          slots: { customRender: 'style' },
        },
        {
          title: '图片列表',
          dataIndex: 'pics',
          align: "center",
          key: 'pics',
          width:130,
          slots: { customRender: 'pics' },
        },
        {
          title: '创建时间',
          dataIndex: 'create_at',
          key: 'create_at',
          width:120,
          align: "center",
          slots: { customRender: 'time' },
        },
      ],
      operationStatus:false,
      search:{
        userId: null,
      },
      CERTIFICATE_STYLE_MAP,
    }
  },
  methods: {
    //初始化init
    init(id) {
      this.search.userId = id;
      if(this.search.userId && this.search.userId != undefined) {
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
        userId: this.search.userId,
      };
      this.$axios
      .get(`certificate/getList`,{
        params
      })
      .then((response) => {
        this.getStatus = false;
        let { code, msg, data } = response
        if (code == 0) {
          let {list,total} = data;
          this.list = [];
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
    showPreImage(pics){
      this.$nextTick(() => {
        this.$refs.picPreviewModal.show(pics);
      })
    },
  },
  created() {
  },
  mounted() {},
}
module.exports = vuePage
