const TYPE_SINGLE_CHOICE = 1
const TYPE_MULTIPLE_CHOICE = 2
const TYPE_TEXT = 3
const QUESTIONS_COUNT = 9

// 生成问题数据
const questions = (function () {
  const arr = []

  for (let i = 1; i <= QUESTIONS_COUNT; i++) {
    const type = [
      TYPE_SINGLE_CHOICE,
      TYPE_MULTIPLE_CHOICE,
      TYPE_TEXT
    ][(i - 1) % 3]

    arr.push({
      id: i,
      paperId: (i - 1) / 3 + 1 >> 0,
      type: type,
      title: [
        '单选测试',
        '多选测试',
        '文本测试'
      ][(i - 1) % 3]
    })
  }

  return arr
})()

const state = {
  questions: questions,
  nextId: QUESTIONS_COUNT + 1
}

const getters = {
  getQuestionsByPaperId: (state) => (id) => state.questions.filter(quest => quest.paperId === id)
}

const actions = {

}

const mutations = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
