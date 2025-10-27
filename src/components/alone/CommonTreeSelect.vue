<template>
    <div class="CommonTreeSelectBox">
        <a-tree-select
            :value="value"
            style="width: 100%"
            :placeholder="placeholder"
            allow-clear
            :tree-data="list"
            @change="valueChange"
            :replaceFields="{ label: 'name', value: '_id', children: 'children' }">
        </a-tree-select>
    </div>
</template>

<script> 
import { mapState, mapActions } from 'vuex'
import { saveData, getData } from '@/libs/utils.js';
export default {
  name: 'CommonTreeSelect',
  props: {
    list:{
      type: Array,
      default:() =>{
        return [];
      }
    },
    value:{
      type: String,
      default: null,
    },
    placeholder:{
        type: String,
        default: '请选择'
    }
  },
  meits: ['update:value'],
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
    valueChange(value, label, extra){
      this.$emit("update:value",value);
    }
  },
  created() {

  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
  .CommonTreeSelectBox{

  }
</style>
