<template>
    <a-menu
        v-model:openKeys="openKeys" 
        v-model:selectedKeys="activeMenuList" 
        theme="dark" 
        width="auto" 
        mode="inline"
        class="menu-nav" 
        @select="selectItemMenu">
        <div v-for="(item,index) in menuList">
            <ChildMenu :menuItem="item"></ChildMenu>
        </div>
    </a-menu>
</template>

<script>
import {saveData, getData} from '@/libs/utils';
import {IconPark} from '@icon-park/vue-next/es/all';
import ChildMenu from './ChildMenu.vue';
export default {
    name: 'AsideNav',
    components: {
        ChildMenu,
    },
    data() {
        return {
            activeMenuList:[],
            openKeys:[],
            menuList:[],
        };
    },
    methods: {
        initMenu(){
            this.menuList = [];
            if(getData('SERVICES_USER_MENU') && getData('SERVICES_USER_MENU') != undefined){
                this.menuList = getData('SERVICES_USER_MENU');
            }else{
                this.getMenuList();
            }
        },
        getMenuList(){
            this.$axios
            .get(`admin_user/getCurrentUserMenuList`)
            .then((response) => {
                console.log("response:",response);
                let { code, msg, data } = response
                if (code == 0) {
                    console.log("data:",data);
                    let list = this.handleMenu(data);
                    console.log("list:",list);
                    this.menuList = list;
                    saveData('SERVICES_USER_MENU',list);
                }
            })
            .catch((error) => {
                console.log(error);
            })
        },
        handleMenu(list){
            console.log("list:",list);


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
        //初始化激活菜单
        initActiveMenuList(){
            this.activeMenuList = getData('activeMenuList')?getData('activeMenuList'):["Community"];
            this.openKeys = getData('menuOpenKeys')?getData('menuOpenKeys'):[];
        },
        //选择子菜单
        selectItemMenu(item){
            let name = item.key;
            this.activeMenuList = [name];
            saveData('activeMenuList',this.activeMenuList);
            saveData('menuOpenKeys',this.openKeys);
        },
    },
    created() {
        this.initMenu();
        this.initActiveMenuList();  //初始化激活菜单
    },
    mounted() {},
}
</script>

<style lang="scss" scoped>
.menu-nav {
    padding: 0;
    min-height: 100%;
    z-index: 1;
}
.ant-menu{
     .ant-menu-item{
        margin: 12px 20px;
        color: #5E6471;
        &.ant-menu-item-selected{
            background:#6BB1DC;
            color: #FFF;
            border-radius: 6px;

        }
     }
}
</style>
