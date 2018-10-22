<template>
  <el-card class="box-card" v-if="!isTextQuest">
    <div slot="header" class="clearfix">
      <span>{{title}}</span>
    </div>

    <div class="flex">
      <div class="options">
        <div class="option" v-for="option in options" :key="option.id">{{option.text}}</div>
      </div>

      <div ref="chart" class="chart"></div>
    </div>

  </el-card>
</template>

<script>
import echarts from 'echarts'
const TYPE_SINGLE_CHOICE = 1
const TYPE_MULTIPLE_CHOICE = 2
const TYPE_TEXT = 3

export default {
  name: 'question',
  props: ['quest'],
  data () {
    return {
      ...this.quest,
      radio: '',
      checkList: [],
      textarea: ''
    }
  },
  mounted () {
    if (this.isSingleQuest) {
      this.initSingleChart()
    } else if (this.isMultipleQuest) {
      this.initMultipleChart()
    }
  },
  methods: {
    updateResult (result) {
      this.$emit('change', result)
    },
    initChart (option) {
      const $el = this.$refs.chart
      const chart = echarts.init($el)
      chart.setOption(option)
    },
    initSingleChart () {
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' }
        },
        grid: { containLabel: true },
        xAxis: { type: 'value' },
        yAxis: {
          type: 'category',
          data: this.options
            .map(option => (option.index + 1))
            .sort((a, b) => b - a)
            .map(index => '选项' + index)
        },
        series: [{
          type: 'bar',
          data: this.options.map(option => option.count)
        }]
      }
      this.initChart(option)
    },
    initMultipleChart () {
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br>{c} ({d}%)'
        },
        series: [
          {
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.options.map(option => ({
              name: option.text,
              value: option.count
            })),
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      this.initChart(option)
    }
  },
  computed: {
    isSingleQuest: function () {
      return this.type === TYPE_SINGLE_CHOICE
    },
    isMultipleQuest: function () {
      return this.type === TYPE_MULTIPLE_CHOICE
    },
    isTextQuest: function () {
      return this.type === TYPE_TEXT
    }
  }
}
</script>

<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.flex {
  display: flex;
  flex-wrap: wrap;
}

.options {
  display: flex;
  flex: auto;
  flex-direction: column;
  line-height: 2;
}

.chart {
  display: flex;
  width: 320px;
  height: 320px;
}
</style>
