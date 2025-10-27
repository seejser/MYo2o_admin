
const Landing = () => import('@/views/Landing.vue')
const Login = () => import('@/views/login/index.vue')
const main = () => import('@/views/main/index.vue')

const home = () => import("@/views/main/home/index.vue");

const transaction = () => import("@/views/main/transaction/index.vue");

const post = () => import("@/views/main/community/post/index.vue");

const requirement = () => import("@/views/main/requirement/index.vue");


const user = () => import("@/views/main/user/index.vue");

const banner = () => import("@/views/main/setting/banner/index.vue");
const info  = () => import("@/views/main/setting/info/index.vue");

const systemUser = () => import ('@/views/main/system/user/index.vue');
const systemMenu = () => import ('@/views/main/system/menu/index.vue');
const systemRole = () => import ('@/views/main/system/role/index.vue');


const routers = [
    {
        //着陆页
        path: '/',
        name: 'Landing',
        component: Landing
    },
    {
        //着陆页
        path: '',
        name: 'Landing',
        component: Landing
    },
    {
        //首页
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/main',
        component: main,
        children: [
            {
                //首页
                path: '/home',
                name: "Home",
                meta:{
                    title: '首页'
                },
                component: home,
            },
            
            {
                //业务列表
                path: '/transaction',
                name: "TransactionManager",
                meta:{
                    title: '业务列表'
                },
                component: transaction,
            },
            {
                //帖子管理
                path: '/community/post',
                name: "PostManager",
                meta:{
                    title: '帖子管理'
                },
                component: post,
            },
            {
                //需求管理
                path: '/requirement',
                name: "requirementManager",
                meta:{
                    title: '需求管理'
                },
                component: requirement,
            },
            
            {
                //用户管理
                path: '/user',
                name: "UserManager",
                meta:{
                    title: '用户管理'
                },
                component: user,
            },
            {
                //轮播图管理
                path: '/setting/banner',
                name: "BannerManager",
                meta:{
                    title: '轮播图管理'
                },
                component: banner,
            },
            {
                //信息设置
                path: '/setting/info',
                name: "InfoSetting",
                meta:{
                    title: '信息设置'
                },
                component: info,
            },
            {   //用户管理
                path: '/system/user',
                name: "SystemUser",
                meta:{
                    title: '用户管理',
                },
                component: systemUser,
            },
            

            {   //菜单管理
                path: '/system/menu',
                name: "SystemMenu",
                meta:{
                    title: '菜单管理',
                },
                component: systemMenu,
            },
            {   //角色管理
                path: '/system/role',
                name: "SystemRole",
                meta:{
                    title: '角色管理',
                },
                component: systemRole,
            },
        ]
    }

]

export default routers
