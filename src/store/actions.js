// const TYPE_SINGLE_CHOICE = 1
// const TYPE_MULTIPLE_CHOICE = 2
const TYPE_TEXT = 3

export default {
  // 更新问卷
  updatePaper ({ dispatch }, paper) {
    // 没有id转为新增
    if (!paper.id) {
      return dispatch('addPaper', paper)
    }
    dispatch('papers/updatePaper', paper)

    // 更新问题
    paper.questions.forEach(quest => {
      if (!quest.id) {
        quest.paperId = paper.id
        dispatch('questions/addQuestion', quest)
      } else {
        dispatch('questions/updateQuestion', quest)

        // 更新选项
        if (quest.type !== TYPE_TEXT) {
          quest.options.forEach(option => {
            if (!option.id) {
              option.questionId = quest.id
              dispatch('options/addOption', option)
            } else {
              dispatch('options/updateOption', option)
            }
          })
        }
      }
    })
    return paper.id
  },

  // 新增问卷
  addPaper ({ dispatch }, paper) {
    return new Promise((resolve, reject) => {
      dispatch('papers/addPaper', paper)
        .then((paperId) => {
          // 新增问题
          paper.questions.forEach(quest => {
            quest.paperId = paperId
            dispatch('addQuestion', quest)
          })
          resolve(paperId)
        })
    })
  },

  // 新增问题
  addQuestion ({ dispatch }, quest) {
    dispatch('questions/addQuestion', quest)
      .then((questId) => {
        // 新增选项
        if (quest.type !== TYPE_TEXT) {
          quest.options.forEach(option => {
            option.questionId = questId
            dispatch('options/addOption', option)
          })
        }
      })
  },

  publishPaper ({ dispatch }, id) {
    dispatch('papers/publishPaper', id)
  }
}
