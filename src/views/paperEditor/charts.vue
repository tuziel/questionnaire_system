<template>
  <el-card>
    <h3 class="quest-title">{{questTitle}}</h3>

    <div class="quest-list">

      <Charts v-for="quest in questions" :key="quest.id" class="quest-box" :quest="quest" />

    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import Charts from '@/components/question/Charts'
const STATE_PENDING = 0
const TYPE_TEXT = 3

export default {
  components: {
    Charts
  },
  data () {
    return {
      ...this.$route.query,
      title: '',
      questTitle: '',
      questions: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.title = '编辑问卷'
      this.$nextTick(() => {
        const id = +this.id
        const paper = this.getPaperById(id)
        if (!paper) { return this.back() }
        if (paper.state === STATE_PENDING) { return this.toEdit(id) }

        this.questTitle = paper.title
        this.questions = this.getQuestionsByPaperId(id)
        this.questions.forEach(quest => {
          if (quest.type !== TYPE_TEXT) {
            quest.options = this.getOptionsByQuestionId(quest.id)
          }
        })
      })
    },
    toEdit (id) {
      this.$router.push({
        name: 'editpaper',
        query: {
          id: id
        }
      })
    },
    back () {
      this.$router.push({
        name: 'home'
      })
    }
  },
  computed: {
    ...mapGetters('papers', {
      getPaperById: 'getPaperById'
    }),
    ...mapGetters('questions', {
      getQuestionsByPaperId: 'getQuestionsByPaperId'
    }),
    ...mapGetters('options', {
      getOptionsByQuestionId: 'getOptionsByQuestionId'
    })
  }
}
</script>

<style scoped>
.quest-title {
  border: none;
  text-align: center;
  font-size: 1.4em;
  font-weight: bold;
}
.quest-list {
  padding: 20px;
}
.quest-box {
  width: 100%;
  margin-top: 20px;
  border-radius: 0;
}
.quest-box:first-child {
  margin-top: 0;
}
.quest-box-new {
  padding: 20px;
  border: 1px solid #dcdfe6;
  text-align: center;
}
</style>
