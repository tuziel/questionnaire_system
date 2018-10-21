const TYPE_SINGLE_CHOICE = 1
const TYPE_MULTIPLE_CHOICE = 2
const QUESTIONS_COUNT = 18

// 生成问题数据
const options = (function () {
  const arr = []
  const tempMap = [1, 1, 1, 1, 0, 0]

  for (let i = 1; i <= QUESTIONS_COUNT; i++) {
    const tempNum = (i - 1) % 6
    const tempId = (i - 1) / 2 >> 0
    const type = tempNum < 2
      ? TYPE_SINGLE_CHOICE
      : TYPE_MULTIPLE_CHOICE

    arr.push({
      id: i,
      questionId: tempId + tempMap[tempNum],
      text: type === TYPE_SINGLE_CHOICE
        ? '选项' + (tempNum + 1)
        : '选项' + (tempNum - 1),
      // 用于统计
      count: Math.random() * 1000 >> 0
    })
  }

  return arr
})()

const state = {
  options: options,
  nextId: QUESTIONS_COUNT + 1
}

const getters = {
  // 根据问题id获取选项列表
  getOptionsByQuestionId: (state) =>
    (id) => state.options.filter(
      option => option.questionId === id
    )
}

const actions = {
  addOption ({ commit }, option) {
    commit('addOption', option)
    return state.nextId - 1
  },
  updateOption ({ commit }, option) {
    commit('updateOption', option)
  },
  checkoutOption ({ commit }, id) {
    commit('checkoutOption', id)
  }
}

const mutations = {
  // 新增选项
  addOption (state, option) {
    state.options.push({
      id: state.nextId++,
      questionId: option.questionId,
      text: option.text,
      count: 0
    })
  },
  // 更新选项内容
  updateOption (state, option) {
    const oldOption = state.options.find(oldOption => oldOption.id === option.id)
    oldOption.text = option.text
  },
  // 完成问卷时统计总量
  checkoutOption (state, id) {
    const option = state.options.find(option => option.id === id)
    option.count++
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
