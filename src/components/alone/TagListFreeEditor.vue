<template>
    <div class="TagListFreeEditorBox">
       <div class="tagListBox">
            <div
                v-for="(item,index) in value"
                :key="index" 
                class="tagBox">
                <a-tag 
                    closable 
                    color="blue"
                    @close="removeTag(index)">
                    {{item}}
                </a-tag>
            </div>
            <div class="tagBox">
                <a-input
                    v-if="inputVisible"
                    ref="inputRef"
                    type="text"
                    size="small"
                    v-model:value="inputValue"
                    @blur="handleInputConfirm"
                    @keyup.enter="handleInputConfirm"
                />
                <a-tag 
                    v-else 
                    @click="showInput"
                     style="border-style: dashed">
                    <IconPark type="plus" theme="outline" />
                    添加
                </a-tag>
            </div>
       </div>
    </div>
</template>

<script> 
import {IconPark} from '@icon-park/vue-next/es/all';
export default {
    name: 'TagListFreeEditor',
    props: {
        value:{
        type: Array,
        default:() =>{
            return [];
        }
        }
    },
    meits: ['update:value'],
    components: { 
        IconPark,
    },
    data() {
        return {
            inputValue:"",
            inputVisible:false,
        }
    },
    methods: {
        removeTag(index){
            let list = JSON.parse(JSON.stringify(this.value));
            if(index >= 0 && index < list.length){
                list.splice(index,1);
                this.$emit("update:value",list);
            }
        },
        showInput(){
            this.inputVisible = true;
            this.$nextTick(() =>{
                this.$refs.inputRef.focus();
            })
        },
        handleInputConfirm(){
            let inputValue = this.inputValue.trim(); 
            let list = JSON.parse(JSON.stringify(this.value));
            if(inputValue == ""){
                //this.$message.error("不能为空");
                return;
            }
            if(list.indexOf(inputValue) != -1){
                this.$message.error("已添加，无需重复");
                return;
            }

            list = [...list,inputValue];
            this.$emit("update:value",list);  
            this.inputVisible = false;
            this.inputValue = "";  
        },
    },
    created() {

    },
    mounted() {
        
    },
}
</script>

<style lang="scss" scoped>
    .TagListFreeEditorBox{
        position: relative;
        .tagListBox{
            width: 100%;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .tagBox{
                margin-right: 10px;
                margin-bottom: 10px;
            }
        }
    }
</style>
