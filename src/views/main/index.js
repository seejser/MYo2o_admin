//主页面
import { mapState, mapActions } from 'vuex'
import { saveData, getData } from '@/libs/utils.js'
import AsideNav from '@/components/layout/AsideNav.vue';
import HeaderNav from '@/components/layout/HeaderNav.vue';

var vuePage = {
  name: 'Main',
  components: { AsideNav, HeaderNav},
  data() {
    return {
      siderLayoutShow: false,
      tabs:{},
      tabActiveKey:'',
      tabList:[],
    }
  },
  computed: {
    ...mapState({}),
  },
  methods: {
    //初始化init
    init() {
      let currentRoute = this.$router.currentRoute._value;
      this.tabs[currentRoute.name] = this.dataToTabs(currentRoute);
      this.tabList = [this.tabs[currentRoute.name]];
      this.tabActiveKey = currentRoute.name;
      this.$router.beforeEach((to, from) => {
        this.handleTabs(to);
        return true;
      })
    },
    gotoMenu(name){
      this.$refs.asideNav.changeMenu(name);
    },
    toggleMenu(){
      this.siderLayoutShow = !this.siderLayoutShow;
    },
    dataToTabs(route){
      return {
        name: route.name,
        title: route.meta.title,
        path: route.path,
        query: route.query,
        params: route.params
      }
    },
    handleTabs(to){
      let tabs = this.tabs;
      let tabItem = this.dataToTabs(to);
      tabs[to.name] = tabItem;
      this.tabs = tabs;
      this.tabActiveKey = to.name;
      let tabList = [];
      for(let key in tabs){
        tabList.push(tabs[key]);
      }
      this.tabList = [];
      this.tabList = tabList;
      this.selectMenu(to.name);
    },
    change(tabActiveKey){
      this.gotoRoute(this.tabs[tabActiveKey]);
    },
    onEdit(targetKey, action){
      if(action != "add"){
        if(this.tabList.length <= 1){
          return false;
        }
        let tabs = this.tabs;
        delete tabs[targetKey];
        this.tabs = tabs;
        let tabList = [];
        for(let key in tabs){
          tabList.push(tabs[key]);
        }
        this.tabList = [];
        this.tabList = tabList;
        if(targetKey == this.tabActiveKey){
          this.tabActiveKey = this.tabList[this.tabList.length -1].name;
          this.gotoRoute(this.tabs[this.tabActiveKey]);
        }
      }
    },
    gotoRoute(route){
      this.$router.push({'path':route.path,'query':route.query,'params':route.params});
      this.selectMenu(route.name);
    },
    selectMenu(name){
      this.$nextTick(() => {
        this.$refs.asideNav.selectItemMenu({key: name});
      })
    }
  },
  created() {
    this.init()
  },
  mounted() {},
}
module.exports = vuePage
