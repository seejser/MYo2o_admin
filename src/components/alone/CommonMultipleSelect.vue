<template>
    <div class="CommonMultipleSelectBox">
        <a-select
            :value="value"
            style="width: 100%"
            mode="multiple"
            :placeholder="placeholder"
            @change="valueChange">
            <a-select-option
                v-for="(item,index) in list"
                :value="item._id"
                :key="item._id">
                {{item.name}}
            </a-select-option>
        </a-select>
    </div>
</template>

<script> 
import { mapState, mapActions } from 'vuex'
export default {
  name: 'CommonMultipleSelect',
  props: {
    list:{
      type: Array,
      default:() =>{
        return [];
      }
    },
    value:{
      type: Array,
      default: [],
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
    valueChange(value){
      //console.log("value:",value);
      this.$emit("update:value",value);
    }
  },
  created() {

  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
  .CommonSelectBox{

  }
</style>
