import { createApp } from 'vue'
import {createRouter,createWebHashHistory } from 'vue-router'
//import FastClick from 'fastclick'

import routes from './routers'
import store from './store'
import filters from './filters'


import App from './views/App.vue';
import axiosHandel from 'axios'
import 'ant-design-vue/dist/antd.css';
import "./assets/scss/reset.scss";

import {
	Button,
	Grid,
	Input,
	Form,
	Row,
	Col,
	Icon,
	Layout,
	Tag,
	Menu,
	Popover,
	Empty,
	Dropdown,
	Modal,
	Table,
	Switch,
	Select,
	Badge,
	message,
	Tree,
	Tabs,
	TabPane,
	Upload,
	Alert,
	Descriptions,
	DescriptionsItem,
	RadioGroup,
	RadioButton,
	Slider,
	RangePicker,
	Card,
	Cascader,
	InputNumber,
	InputGroup,
	DatePicker,
	Image,
	Carousel,
	UploadDragger,
	TreeSelect,
	Transfer,
	Steps,
} from "ant-design-vue";

import '@icon-park/vue-next/styles/index.css';



const router = createRouter({
	history: createWebHashHistory(),
  	routes,
})


//FastClick.attach(document.body)

const APP = createApp(App);
APP.use(router);
APP.use(router);
APP.use(store);
/*引入组件*/
APP.use(Button);
APP.use(Grid);
APP.use(Input);
APP.use(Form);
APP.use(Row);
APP.use(Col);
APP.use(Icon);
APP.use(Layout);
APP.use(Tag);
APP.use(Menu);
APP.use(Popover);
APP.use(Empty);
APP.use(Dropdown);
APP.use(Modal);
APP.use(Badge);
APP.use(Table);
APP.use(Switch);
APP.use(Select);
APP.use(Tree);
APP.use(Tabs);
APP.use(TabPane);
APP.use(Upload);
APP.use(Alert);
APP.use(Descriptions);
APP.use(DescriptionsItem);
APP.use(RadioGroup);
APP.use(RadioButton);
APP.use(Slider);
APP.use(RangePicker);
APP.use(Card);
APP.use(Cascader);
APP.use(InputNumber);
APP.use(InputGroup);
APP.use(DatePicker);
APP.use(Image);
APP.use(Carousel);
APP.use(UploadDragger);
APP.use(TreeSelect);
APP.use(Transfer);
APP.use(Steps);

/*引入Icon组件*/

APP.mount("#app");

APP.config.globalProperties.$axios = axiosHandel(router, APP)
APP.config.globalProperties.$filters = filters;
/*引入ant的事件*/
APP.config.globalProperties.$message = message;
APP.config.globalProperties.$confirm = Modal.confirm;
//项目标题
APP.config.globalProperties.$projectTitle = "信息咨询管理后台"


