<template>
  <div class="wrapper">
    <el-table :data="papers" border style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" width="55"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">{{getStateText(scope.row.state)}}</template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit"></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Nav from '@/views/Nav'

export default {
  components: {
    Nav
  },
  mounted () {
    console.log(this.papers)
    console.log(this.getPaperById(3))
  },
  methods: {
    getStateText (state) {
      return ['未发布', '已发布', '已结束'][state]
    }
  },
  computed: {
    ...mapGetters('papers', {
      papers: 'papers',
      getPaperById: 'getPaperById'
    })
  }
}
</script>

<style>
</style>
