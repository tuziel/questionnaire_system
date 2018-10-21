<template>
  <el-card>
    <h3 class="quest-title">{{questTitle}}</h3>

    <div class="quest-list">

      <Question v-for="quest in questions" :key="quest.id" class="quest-box" :quest="quest" />

      <!-- <el-button class="quest-box p-20" icon="el-icon-upload2">提交</el-button> -->

    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import Question from '@/components/question/Question'
const TYPE_TEXT = 3

export default {
  components: {
    Question
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

        this.questTitle = paper.title
        this.questions = this.getQuestionsByPaperId(id)
        this.questions.forEach(quest => {
          if (quest.type !== TYPE_TEXT) {
            quest.options = this.getOptionsByQuestionId(quest.id)
          }
        })
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
