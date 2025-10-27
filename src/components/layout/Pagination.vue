<template>
    <a-row style="margin-top: 80px; text-align: center;" >
        <a-pagination 
            v-if="pageConfig.total > 0"
            v-model="pageConfig.page" 
            :defaultPageSize="pageConfig.limit" 
            :total="pageConfig.total"
            @change="pageChange" 
        show-less-items />
        <a-empty v-else/>
    </a-row>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
    name: 'Pagination',
    props: {
        pageConfig:{
            type: Object,
            default: {}
        }
    },
    components: {},
    data() {
        return {};
    },
    methods: {
        pageChange(page,pageSize){
            this.$emit('pageChange',page);
        }
    },
    created() {

    },
    mounted() {

    },
}
</script>

<style lang="scss" scoped>

</style>
