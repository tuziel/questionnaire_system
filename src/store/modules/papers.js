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
  // 获取所有问卷
  papers: (state) => state.papers,
  // 通过问卷id获取问卷
  getPaperById: (state) => (id) => state.papers.find(paper => paper.id === id)
}

const actions = {
  // 根据id列表删除对应的问卷
  deletePaperByIdList ({ commit }, idList) {
    idList.forEach((id) => {
      commit('deletePaperById', id)
    })
  },
  addPaper ({ commit }, paper) {
    commit('addPaper', paper)
    return state.nextId - 1
  },
  updatePaper ({ commit }, paper) {
    commit('updatePaper', paper)
  },
  publishPaper ({ commit }, id) {
    commit('publishPaper', id)
  },
  deletePaperById ({ commit }, id) {
    commit('deletePaperById', id)
  }
}

const mutations = {
  // 新增问卷
  addPaper (state, paper) {
    state.papers.push({
      id: state.nextId++,
      title: paper.title,
      state: STATE_PENDING
    })
  },
  // 更新问卷标题
  updatePaper (state, paper) {
    const oldPaper = state.options.find(oldPaper => oldPaper.id === paper.id)
    oldPaper.title = paper.title
  },
  // 发布问卷
  publishPaper (state, id) {
    const paper = state.papers.find(paper => paper.id === id)
    paper.state = STATE_PUBLISHING
  },
  // 删除id对应的问卷
  deletePaperById (state, id) {
    const papers = state.papers
    const index = papers.findIndex(paper => paper.id === id)
    papers.splice(index, 1)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
