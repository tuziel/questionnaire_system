const STATE_PENDING = 0
const STATE_PUBLISHING = 1
const STATE_TERMINATE = 2
const PAPRES_COUNT = 3

// 生成问卷数据
const papers = (function () {
  const arr = []

  for (let i = 1; i <= PAPRES_COUNT; i++) {
    arr.push({
      id: i,
      title: '问卷' + i,
      state: [
        STATE_PENDING,
        STATE_PUBLISHING,
        STATE_TERMINATE
      ][i - 1]
    })
  }

  return arr
})()

const state = {
  papers: papers,
  nextId: PAPRES_COUNT + 1
}

const getters = {

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
