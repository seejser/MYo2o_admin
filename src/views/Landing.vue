<template>
    <div class="bg">
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {saveData, getData,getQueryString, getUrlRelativePath} from '@/libs/utils';
export default {
    name: 'Landing',
    methods: {
    },
    created() {
        let queryObj = getQueryString();
        console.log(queryObj);
        let realPath = getUrlRelativePath();
        let {search, pathname} = location;
        let path_url = pathname;
        if (queryObj.p) {
            path_url = queryObj.p;
            if(queryObj.p.indexOf("/") == 0 && queryObj.length > 1){
                path_url = queryObj.p.substr(1,queryObj.p.length - 1);
            }
        } else{
            path_url = "Login";
        }
        //console.log("this.$router:",this.$router);
        this.$router.push({name:path_url,params:queryObj});

    },
    mounted () {
    }
};
</script>

<style lang="scss" scoped>
    .bg{
        position: fixed;
        width: 100%;
        min-height: 100%;
    }
</style>
