<template>
  <div class="AreaCascaderBox">
    <a-cascader
      allowClear 
      :value="list" 
      :options="areaList" 
      expand-trigger="hover"
      placeholder="请选择" 
      @change="cascaderChange"
      :fieldNames="{ label: 'name', value: 'id', children: 'children' }"/>
  </div>
</template>

<script> 
import { mapState, mapActions } from 'vuex'
import { saveData, getData } from '@/libs/utils.js';
export default {
  name: 'AreaCascader',
  model: {
    prop: 'list',
  },
  props: {
    areaList:{
      type: Array,
      default:() =>{
        return [];
      }
    },
    list:{
      type: Array,
      default: ()=>{
        return [];
      }
    }
  },
  meits: ['update:list'],
  components: { 
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState({}),
  },
  methods: {
    cascaderChange(value,selectedOptions){
      this.$emit("update:list",value);
    }
  },
  created() {

  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
  .AreaCascaderBox{

  }
</style>
