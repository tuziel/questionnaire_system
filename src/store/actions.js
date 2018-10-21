// const TYPE_SINGLE_CHOICE = 1
// const TYPE_MULTIPLE_CHOICE = 2
const TYPE_TEXT = 3

export default {
  addPaper ({ dispatch }, paper) {
    // 新增问卷
    dispatch('papers/addPaper', paper)

      // 新增问题
      .then((paperId) => {
        paper.questions.forEach(quest => {
          quest.paperId = paperId
          dispatch('questions/addQuestion', quest)

            // 新增选项
            .then((questId) => {
              if (quest.type !== TYPE_TEXT) {
                quest.options.forEach(option => {
                  option.questionId = questId
                  dispatch('options/addOption', option)
                })
              }
            })
        })
      })
  },

  updatePaper () {

  }
}
