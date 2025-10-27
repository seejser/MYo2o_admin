<template>
    <a-layout-header>
        <IconPark type="menu-unfold-one" theme="outline" @click="toggleMenu()" class="menuToggleIcon"/>
        <div class="logo">{{$projectTitle}}</div>
        <div class=header-nav>
            <a-dropdown class="dropDownBox" :trigger="['click']">
                <a class="ant-dropdown-link" @click.prevent>
                   <span class="companyNameBox">{{userInfo.username}}</span><IconPark type="down" theme="outline"/>
                </a>
                <template #overlay>
                    <a-menu>
                        <a-menu-item style="text-align: center;" class="companyMenuItemBox">
                            {{userInfo.china_name}}
                        </a-menu-item>
                        <a-menu-item style="text-align: center;" @click="modifyPass()">
                            修改密码&nbsp;&nbsp;&nbsp;&nbsp;<IconPark type="unlock" theme="outline"/>
                        </a-menu-item>
                        <a-menu-item style="text-align: center;" @click="exit()">                          
                            退出登录&nbsp;&nbsp;&nbsp;&nbsp;<IconPark type="logout" theme="outline"/>
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>
        <PassModifyModal ref="passModifyModal" @exit="exit"></PassModifyModal>
    </a-layout-header>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {removeLocalData,clearData} from '@/libs/utils.js';
import PassModifyModal from '@/components/modal/PassModifyModal.vue';
import {IconPark} from '@icon-park/vue-next/es/all';
export default {
    name: 'HeaderNav',
    components: {
        PassModifyModal,
        IconPark,
    },
    data() {
        return {
            noticeList:[
            ],
            noticeTimer: null,
            noticePage:1,
            noticeLimit: 10,
            getStatus: false,
            noMoreStatus: false,
            newNotceCount: 0,
        };
    },
    computed:{
        ...mapState({
            userInfo: state => state.admin_user.userInfo
        }) 
    },
    methods: {
        ...mapActions('admin_user', [
            'clearUser'
        ]),
        exit() {
            this.$message.success("退出登录");
            removeLocalData("services_admin_token");
            clearData("activeMenuList");
            clearData("menuOpenKeys");
            clearData('SERVICES_LAST_URL');
            clearData('SERVICES_USER_MENU');
            this.clearUser();
            this.$router.push('/login');
        },
        handleClickChange(visible){
            if(visible){
                this.newNotceCount = 0;
                this.noticePage = 1;
                this.noticeList = [];
                this.noMoreStatus = false;
                this.getStatus = false;
                this.getNoticeList();
            }
        },
        modifyPass(){
            this.$refs.passModifyModal.show();
        },
        toggleMenu(){
            this.$emit("toggleMenu");
        }
    },
    created() {
    },
    mounted() {

    },
    destroyed(){
        this.clearNoticeTimer();
    }
}
</script>

<style lang="scss" scoped>
.ant-layout-header {
}
.logo {
    display: inline-block;
    font-size:1.7vw;
    color: #FFF;
}
.header-nav {
    position: absolute;
    right: 20px;
    top: 0;
    display: flex;
    align-items: center;
    .levelBox{
        margin-right: 20px;
    }
    .bellBox{
        margin-right: 20px;
    }
    .dropDownBox{
        color: #FFF;
    }
}
.noticeListBox{
    width: 250px;
    max-height: 150px;
    overflow-y: scroll;
    .noticeBox{
        width: 100%;
        border-bottom: 1px solid #efefef;
        .noticeTitleBox{
            font-size: 14px;
            color: #333;
            margin-top: 5px;
            margin-bottom: 5px;
            font-weight: bold;
        }
        .noticeContentBox{
            font-size: 12px;
            color: #333;
            margin-bottom: 10px;
        }
        &:last-child{
            border-bottom: none;
        }
        .noticeTimeBox{
            text-align: right;
            font-size: 12px;
            color: #777;
            margin-bottom:3px;
        }
    }
}
.companyNameBox{
    display: inline-block;
}
.companyMenuItemBox{
    display: none;
}
.menuToggleIcon{
    display: none;
}
@media screen and (max-width:768px){
    .logo{
        font-size:4vw;
    }
    .ant-layout-header{
        padding:0 50px;
        position: fixed;
        z-index: 2;
        width: 100vw;
    }
    .menuToggleIcon{
        position: absolute;
        left: 10px;
        display: inline-block;
        font-size: 20px;
        top: 20px;
    }
    .header-nav {
        .levelBox{
            margin-right: 5px;
        }
    }
    .companyNameBox{
        display: none;
    }
    .companyMenuItemBox{
        display: block;
    }
}
</style>
