//首页
import { mapState, mapActions } from 'vuex'
import { saveData, getData } from '@/libs/utils.js'

var vuePage = {
  name: 'Main',
  components: {
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
    }),
  },
  methods: {
    //初始化init
    init() {  
      
    }

  },
  created() {
    this.init()
  },
  mounted() {},
}
module.exports = vuePage
