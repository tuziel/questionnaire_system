<template>
  <el-card>
    <div class="header-form">
      <h2 class="header-title">问卷列表(点击标题可预览)</h2>

      <div>
        <el-button type="primary" icon="el-icon-plus" v-show="!selected.length" @click="addPaper">新增问卷</el-button>
        <el-button type="danger" icon="el-icon-delete" v-show="selected.length" @click="deletePapers()">删除问卷</el-button>
      </div>
    </div>

    <el-table ref="papers" :data="papers" border style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" width="55"></el-table-column>
      <el-table-column prop="title" label="标题">
        <template slot-scope="scope">
          <el-button type="text" @click="toPreview(scope.row.id)">{{scope.row.title}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="120">
        <template slot-scope="scope">
          <span :style="'color:'+getStateColor(scope.row.state)">{{getStateText(scope.row.state)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" v-if="scope.row.state === 0" @click="editPaper(scope.row.id)"></el-button>
          <el-button size="mini" icon="el-icon-document" v-else @click="toCharts(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import Nav from '@/views/Nav'

export default {
  components: {
    Nav
  },

  data () {
    return {
      selected: []
    }
  },

  mounted () {
  },

  methods: {
    addPaper () {
      this.$router.push({
        name: 'addpaper'
      })
    },
    editPaper (id) {
      this.$router.push({
        name: 'editpaper',
        query: {
          id: id
        }
      })
    },

    toPreview (id) {
      this.$router.push({
        name: 'preview',
        query: {
          id: id
        }
      })
    },
    toCharts (id) {
      this.$router.push({
        name: 'charts',
        query: {
          id: id
        }
      })
    },

    deletePapers () {
      const idList = this.selected.map(paper => paper.id)

      this.$confirm('此操作将永久删除该问卷, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.dispatch('papers/deletePaperByIdList', idList)
            .then(() => {
              this.$refs.papers.clearSelection()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            })
        })
    },
    getStateText (state) {
      return ['未发布', '已发布', '已结束'][state]
    },
    getStateColor (state) {
      return ['#E6A23C', '#67C23A', '#F56C6C'][state]
    },
    handleSelectionChange (val) {
      this.selected = val
    }
  },

  computed: {
    ...mapGetters('papers', {
      papers: 'papers'
    })
  }
}
</script>
