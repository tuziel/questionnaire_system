const TYPE_SINGLE_CHOICE = 1
const TYPE_MULTIPLE_CHOICE = 2
const TYPE_TEXT = 3
const QUESTIONS_COUNT = 9

// 生成问题数据
const questions = (function () {
  const arr = []

  for (let i = 1; i <= QUESTIONS_COUNT; i++) {
    const tempNum = (i - 1) % 3
    const type = [
      TYPE_SINGLE_CHOICE,
      TYPE_MULTIPLE_CHOICE,
      TYPE_TEXT
    ][tempNum]

    arr.push({
      id: i,
      index: tempNum,
      paperId: (i - 1) / 3 + 1 >> 0,
      type: type,
      title: ['单选测试', '多选测试', '文本测试'][tempNum]
    })
  }

  return arr
})()

const state = {
  questions: questions,
  nextId: QUESTIONS_COUNT + 1
}

const getters = {
  // 根据问卷id获取题目列表
  getQuestionsByPaperId: (state) => (id) =>
    state.questions
      .filter(quest => quest.paperId === id)
      .sort((a, b) => a.index - b.index)
}

const actions = {
  addQuestion ({ commit }, quest) {
    commit('addQuestion', quest)
    return state.nextId - 1
  },
  updateQuestion ({ commit }, quest) {
    commit('updateQuestion', quest)
  },
  // 根据id列表删除对应的问卷
  deleteQuestionByIdList ({ commit }, idList) {
    idList.forEach((id) => {
      commit('deleteQuestionById', id)
    })
    return state.nextId - 1
  },
  deleteQuestionById ({ commit }, id) {
    commit('deleteQuestionById', id)
  }
}

const mutations = {
  // 新增问题
  addQuestion (state, quest) {
    state.questions.push({
      id: state.nextId++,
      index: quest.index,
      paperId: quest.paperId,
      type: quest.type,
      title: quest.title
    })
  },
  // 更新问题
  updateQuestion (state, quest) {
    const oldQuest = state.questions.find(oldQuest => oldQuest.id === quest.id)
    oldQuest.index = quest.index
    oldQuest.title = quest.title
  },
  // 删除id对应的问卷
  deleteQuestionById (state, id) {
    const questions = state.questions
    const index = questions.findIndex(quest => quest.id === id)
    questions.splice(index, 1)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
