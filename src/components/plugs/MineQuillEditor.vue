<template>
  <div class="quillEditorBox">
    <a-alert
      show-icon
      type="error"
      message="图片引入需点击下方按钮" />

    <input
      class="quillPhotoInput"
      type="file"
      @change="photoChange"
      ref="quillPhotoInput"
      accept="image/jpeg,image/jpg,image/png" />

    <QuillEditor
      ref="myQuillEditor"
      class="mineQuillEditor"
      theme="snow"
      :content="content"
      content-type="html"
      :options="editorOption"
      @ready="quillReady"
      @textChange="onEditorChange" />
  </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { imageUpload } from '@/libs/UploadUtil.js'

export default {
  name: 'MineQuillEditor',
  components: { QuillEditor },
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  emits: ['update:content'],
  data() {
    return {
      quillObject: null,
      imageLoading: false,
      editorOption: {
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ header: 1 }, { header: 2 }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['clean'],
              ['link', 'image']
            ],
            handlers: {
              image: () => this.photoUpload()
            }
          }
        },
        theme: 'snow',
        placeholder: '请输入您的内容...'
      }
    }
  },
  methods: {
    // 富文本加载完毕时执行
    quillReady(quill) {
      this.quillObject = quill
      if (this.content) {
        quill.root.innerHTML = this.content // 初始化设置 HTML
      }
    },

    // 文本内容变化时同步父组件
    onEditorChange() {
      if (this.quillObject) {
        const html = this.quillObject.root.innerHTML
        this.$emit('update:content', html)
      }
    },

    // 打开文件选择
    photoUpload() {
      this.$refs.quillPhotoInput.click()
    },

    // 选择图片后上传并插入
    photoChange() {
      if (this.imageLoading) return
      const file = this.$refs.quillPhotoInput.files[0]
      if (!file) return

      this.imageLoading = true
      imageUpload(file, (imgUrl) => {
        this.imageLoading = false
        this.$refs.quillPhotoInput.value = ''
        if (imgUrl && this.quillObject) {
          const quill = this.quillObject
          const range = quill.getSelection(true)
          const index = range ? range.index : quill.getLength()
          quill.insertEmbed(index, 'image', imgUrl)
          quill.setSelection(index + 1)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.quillEditorBox {
  height: 400px;

  .quillPhotoInput {
    opacity: 0;
    position: absolute;
    z-index: -1;
  }

  :deep(.mineQuillEditor) {
    height: 300px;
    img {
      width: 100% !important;
    }
  }
}
</style>
