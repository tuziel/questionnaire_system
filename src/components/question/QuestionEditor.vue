<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <h4 class="header-title">{{getTypeText}}</h4>
      <div class="flex">
        <el-input v-model="value.title" placeholder="请输入问题"></el-input>
        <div class="contorls">
          <el-dropdown @command="handleCommand" trigger="click">
            <el-button type="primary" icon="el-icon-menu" circle></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="addOption" v-if="isSingleQuest || isMultipleQuest">新增选项</el-dropdown-item>
              <el-dropdown-item command="up">上移问题</el-dropdown-item>
              <el-dropdown-item command="down">下移问题</el-dropdown-item>
              <el-dropdown-item command="remove">删除问题</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>

    <div v-if="isSingleQuest || isMultipleQuest">
      <div class="inputBox" v-for="(option, index) in options" :key="option.id">
        <el-input v-model="option.text" placeholder="请输入答案"></el-input>
        <div class="contorls">
          <el-button type="primary" icon="el-icon-arrow-up" circle @click="putUp(index)" :disabled="index === 0"></el-button>
          <!-- <el-button type="primary" icon="el-icon-arrow-down" circle @click="putDown(index)" :disabled="index === options.length - 1"></el-button> -->
          <el-button type="danger" icon="el-icon-minus" circle @click="removeOption(index)"></el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
const TYPE_SINGLE_CHOICE = 1
const TYPE_MULTIPLE_CHOICE = 2
const TYPE_TEXT = 3

export default {
  name: 'question',
  props: ['value'],
  data () {
    return {
      ...this.value
    }
  },
  methods: {
    // 重新设置顺序
    resetIndex () {
      const options = this.options
      options && options.forEach((option, index) => {
        option.index = index
      })
    },

    handleCommand (command) {
      switch (command) {
        case 'addOption': {
          return this.addoption()
        }
        case 'up': {
          return this.$emit('up', this.value)
        }
        case 'down': {
          return this.$emit('down', this.value)
        }
        case 'remove': {
          return this.$emit('remove', this.value)
        }
      }
    },

    addoption () {
      this.options.push({
        text: ''
      })
      this.resetIndex()
    },

    putUp (index) {
      const options = this.options
      const current = options.splice(index, 1)[0]
      options.splice(index - 1, 0, current)
      this.resetIndex()
    },

    putDown (index) {
      const options = this.options
      const current = options.splice(index, 1)[0]
      options.splice(index + 1, 0, current)
      this.resetIndex()
    },

    removeOption (index) {
      const options = this.options
      options.splice(index, 1)
      this.resetIndex()
    }
  },
  computed: {
    getTypeText: function () {
      switch (this.type) {
        case TYPE_SINGLE_CHOICE: {
          return '单选题'
        }
        case TYPE_MULTIPLE_CHOICE: {
          return '多选题'
        }
        case TYPE_TEXT: {
          return '文本题'
        }
      }

      return this.type
    },
    isSingleQuest: function () {
      return this.type === TYPE_SINGLE_CHOICE
    },
    isMultipleQuest: function () {
      return this.type === TYPE_MULTIPLE_CHOICE
    }
  }
}
</script>

<style scoped>
.header-title {
  margin-bottom: 18px;
  line-height: 1;
}

.flex {
  display: flex;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.inputBox {
  display: flex;
  margin-bottom: 20px;
}
.option {
  display: flex;
  flex: auto;
}
.contorls {
  padding-left: 15px;
  white-space: nowrap;
}
</style>
