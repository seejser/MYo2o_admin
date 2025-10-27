<template>
    <div class="menuItemBox">
        <a-sub-menu 
            :key="menuItem.name" v-if="menuItem.children && menuItem.children != undefined && menuItem.children.length > 0">
            <template #icon>
                <IconPark :type="menuItem.icon" theme="outline" />
            </template>
            <template #title>{{menuItem.title}}</template>
            <div v-for="(children_item,children_index) in menuItem.children">
                <ChildMenu :menuItem="children_item"  ></ChildMenu> 
            </div>
        </a-sub-menu> 
        <a-menu-item
            :key="menuItem.name" 
            @click="gotoUrl(menuItem.path)" 
            v-else>
            <template #icon>
                <icon-park :type="menuItem.icon" theme="outline"/>
            </template>
            {{menuItem.title}}
        </a-menu-item>
    </div>
</template>

<script>
import {saveData, getData} from '@/libs/utils';
import {IconPark} from '@icon-park/vue-next/es/all';
//import ChildMenu from './ChildMenu.vue';

export default {
    name: 'ChildMenu',
    components: {
        IconPark,
        //ChildMenu
    },
    props:{
        menuItem: {
            type: Object,
            default: (() => {
                return {}
            })
        }
    },
    data() {
        return {
            
        };
    },
    methods: {
        
        gotoUrl(url){
            if(url && url != undefined){
                this.$emit("toggleMenu");
                this.$router.push({'path':url});
                saveData('SERVICES_LAST_URL',url);
            }
            
        },
        gotoWebsite(url){
            window.open(url);
        },
        changeMenu(name){
            this.activeMenuList = [name];
            saveData('activeMenuList',this.activeMenuList);
            this.gotoUrl(`/${name}`);
        }
    },
    created() {
        
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
    background: #FAFCFD !important;
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
