<template>
  <el-card>
    <div class="header-form">
      <h2 class="header-title">{{title}}</h2>

      <div>
        <el-button type="primary" icon="el-icon-message" @click="savePaper">保存问卷</el-button>
        <el-button type="primary" icon="el-icon-upload2" @click="publishPaper">发布问卷</el-button>
      </div>
    </div>

    <h3 class="quest-title">
      <el-input class="input_title" v-model="paperTitle" placeholder="请输入标题"></el-input>
    </h3>

    <div class="quest-list">

      <QuestionEditor v-for="(quest, index) in questions" :key="quest.id" class="quest-box" v-model="questions[index]" />

      <div class="quest-box quest-box-new" v-if="isShowAddBox">
        <el-button @click="addSingleQuest">单选题</el-button>
        <el-button @click="addMultipleQuest">多选题</el-button>
        <el-button @click="addTextQuest">文本题</el-button>
      </div>

      <el-button class="quest-box p-20" icon="el-icon-plus" @click="showQuestBox">添加问题</el-button>

    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import QuestionEditor from '@/components/question/QuestionEditor'
const TYPE_SINGLE_CHOICE = 1
const TYPE_MULTIPLE_CHOICE = 2
const TYPE_TEXT = 3

export default {
  components: {
    QuestionEditor
  },
  data () {
    return {
      ...this.$route.query,
      title: '',
      paperTitle: '',
      questions: [],
      isShowAddBox: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      switch (this.$route.name) {
        case 'addpaper': {
          this.initAdd()
          break
        }
        case 'editpaper': {
          this.initEdit()
          break
        }
      }
    },
    initAdd () {
      this.title = '新增问卷'
    },
    initEdit () {
      this.title = '编辑问卷'
      this.$nextTick(() => {
        const id = +this.id
        const paper = this.getPaperById(id)
        if (!paper) { return this.back() }

        // 深拷贝所有数据
        this.paperTitle = paper.title
        const questtions = this.getQuestionsByPaperId(id)
        questtions.forEach(quest => {
          const data = {
            id: quest.id,
            title: quest.title,
            type: quest.type
          }

          if (quest.type !== TYPE_TEXT) {
            const options = this.getOptionsByQuestionId(quest.id)
            data.options = options.map(option => ({
              id: option.id,
              questionId: option.questionId,
              text: option.text
            }))
          }

          this.questions.push(data)
        })
      })
    },
    back () {
      this.$router.push({
        name: 'home'
      })
    },

    savePaper () {
      this.$store.dispatch('updatePaper', {
        id: +this.id || 0,
        title: this.paperTitle || '无标题',
        questions: this.questions
      }).then(() => {
        this.$message.success('保存成功')
        this.back()
      })
    },
    publishPaper () {
      this.$confirm('确认发布问卷?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.dispatch('updatePaper', {
            id: +this.id || 0,
            title: this.paperTitle || '无标题',
            questions: this.questions
          }).then((id) => {
            this.$store.dispatch('publishPaper', id)
              .then(() => {
                this.$message.success('发布成功')
                this.back()
              })
          })
        })
    },

    showQuestBox () {
      this.isShowAddBox = true
    },
    addQuest (type) {
      const data = {
        title: '',
        type: type
      }

      if (type !== TYPE_TEXT) {
        data.options = [{ text: '' }, { text: '' }]
      }

      this.questions.push(data)
    },
    addSingleQuest () {
      this.addQuest(TYPE_SINGLE_CHOICE)
      this.isShowAddBox = false
    },
    addMultipleQuest () {
      this.addQuest(TYPE_MULTIPLE_CHOICE)
      this.isShowAddBox = false
    },
    addTextQuest () {
      this.addQuest(TYPE_TEXT)
      this.isShowAddBox = false
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
.quest-list {
  padding: 20px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
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
