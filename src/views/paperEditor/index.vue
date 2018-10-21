<template>
  <el-card>
    <div class="header-form">
      <h2 class="header-title">{{title}}</h2>

      <div>
        <el-button type="primary" icon="el-icon-message">保存问卷</el-button>
        <el-button type="primary" icon="el-icon-upload2">发布问卷</el-button>
      </div>
    </div>

    <h3 class="quest-title">
      <el-input class="input_title" placeholder="请输入标题"></el-input>
    </h3>

    <div class="quest-list">

      <div class="quest-box quest-box-new" v-if="isShowAddBox">
        <el-button @click="addSingleQuest">单选题</el-button>
        <el-button @click="addMultipleQuest">多选题</el-button>
        <el-button @click="addTextQuest">文本题</el-button>
      </div>

      <el-button class="quest-box" icon="el-icon-plus" @click="addQuest">添加问题</el-button>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      ...this.$route.params,
      title: '',
      originPaper: [],
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
    },
    back () {
      this.$router.push({
        name: 'home'
      })
    },

    addQuest () {
      this.isShowAddBox = true
    },
    addSingleQuest () {
      this.isShowAddBox = false
    },
    addMultipleQuest () {
      this.isShowAddBox = false
    },
    addTextQuest () {
      this.isShowAddBox = false
    }
  },
  computed: {
    ...mapGetters('papers', {
      getPaperById: 'getPaperById'
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
  height: 80px;
  margin-top: 20px;
  border-radius: 0;
}
.quest-box:first-child {
  margin-top: 0;
}
.quest-box-new {
  padding: 18px;
  border: 1px solid #dcdfe6;
  text-align: center;
}
</style>
